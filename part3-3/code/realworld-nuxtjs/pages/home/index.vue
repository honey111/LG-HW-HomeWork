<template>
    <div class="home-page">

        <div class="banner">
            <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">

            <div class="col-md-9">
                <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                    <li v-if="user" class="nav-item">
                        <nuxt-link 
                            class="nav-link" 
                            :class="{
                                active: tab === 'your_feed'
                            }"
                            exact
                            :to="{
                                name: 'home',
                                query: {
                                    tab: 'your_feed'
                                }
                            }"
                        >Your Feed</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link 
                            class="nav-link" 
                            :class="{
                                active: tab === 'global_feed'
                            }"
                            exact
                            :to="{
                                name: 'home',
                                query: {
                                    tab: 'global_feed'
                                }
                            }"
                        >Global Feed</nuxt-link>
                    </li>
                    <li class="nav-item" v-if="tag">
                        <nuxt-link 
                            class="nav-link" 
                            :class="{
                                active: tab === 'tag'
                            }"
                            exact
                            :to="{
                                name: 'home',
                                query: {
                                    tab: 'tag',
                                    tag: tag
                                }
                            }"
                        >#{{tag}}</nuxt-link>
                    </li>
                </ul>
                </div>

                <div class="article-preview" v-for="item in articles" :key="item.slug">
                    <div class="article-meta">
                        <nuxt-link :to="{
                            name: 'profile',
                            params: {
                                username: item.author.username
                            }
                        }">
                            <img :src="item.author.image" />
                        </nuxt-link>
                        <div class="info">
                            <nuxt-link class="author" :to="{
                                name: 'profile',
                                params: {
                                    username: item.author.username
                                }
                            }">
                                {{item.author.username}}
                            </nuxt-link>
                            <span class="date">{{item.author.createdAt}}</span>
                        </div>
                        <button 
                            class="btn btn-outline-primary btn-sm pull-xs-right" 
                            :class="{
                                active: item.favorited
                            }"
                        >
                            <i class="ion-heart"></i> {{item.author.favoritesCount}}
                        </button>
                    </div>
                    <nuxt-link 
                        class="preview-link"
                        :to="{
                            name: 'article',
                            params: {
                                slug: item.slug
                            }
                        }"
                    >
                        <h1>{{item.title}}</h1>
                        <p>{{item.description}}</p>
                        <span>Read more...</span>
                    </nuxt-link>
                </div>

                <!-- f分页列表 -->
                <nav>
                    <ul class="pagination">
                        <li 
                            class="page-item" 
                            :class="{active: child === page }" 
                            v-for="child in totalPage"
                            :key="child"
                        >
                            <nuxt-link 
                                class="page-link" 
                                :to="{
                                    name: 'home',
                                    query: {
                                        page: child,
                                        tag: $route.query.tag,
                                        tab: tab
                                    }
                                }"
                            >{{child}}</nuxt-link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="col-md-3">
                <div class="sidebar">
                <p>Popular Tags</p>

                <div class="tag-list">
                    <nuxt-link 
                        :to="{
                            name: 'home',
                            query: {
                                tag: item,
                                tab: 'tag'
                            }
                        }" 
                        class="tag-pill tag-default" 
                        v-for="item in tags" :key="item"
                    >{{item}}</nuxt-link>
                </div>
                </div>
            </div>

            </div>
        </div>

    </div>
</template>

<script>
import { getArticles, getFeedArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
    name: 'HomeIndex',
    async asyncData ({query, store}) {
        const page = Number.parseInt(query.page || 1)
        const limit = 20
        const { tag } = query
        const tab = query.tab || 'global_feed'
        const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles

        // const { data } = await getArticles({
        //     limit,
        //     offset: (page -1) * limit 
        // })
        // // 起别名
        // const { data: tagData } = await getTags()
        // return {
        //     articles: data.articles,
        //     articlesCount: data.articlesCount,
        //     tags: tagData.tags,
        //     limit,
        //     page
        // }

        // 优化异步操作，获取文章列表和获取标签列表没有上下文关系，所以同时进行,减少加载速度
        const [ articleRes, tagRes ] = await Promise.all([
            loadArticles({
                limit,
                offset: (page -1) * limit,
                tag
            }),
            getTags()
        ])
        const { articles,articlesCount } = articleRes.data
        const { tags } = tagRes.data
        return {
            articles,
            articlesCount,
            tags,
            limit,
            page,
            tag,
            tab: query.tab || 'global_feed'
        }

        
    },
    watchQuery: ['page', 'tag', 'tab'],
    computed: {
        ...mapState(['user']),
        totalPage () {
            return Math.ceil(this.articlesCount / this.limit)
        }
    }

}
</script>
<style scoped>

</style>