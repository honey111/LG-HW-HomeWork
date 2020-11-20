<template>
    <div class="profile-page">

        <div class="user-info">
            <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                <img :src="profile.image" class="user-img" />
                <h4>{{profile.username}}</h4>
                <p>
                    {{profile.bio}}
                </p>
                <button class="btn btn-sm btn-outline-secondary action-btn">
                    <i class="ion-plus-round"></i>
                    &nbsp;
                    Follow Eric Simons 
                </button>
                </div>

            </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                    <li class="nav-item">
                    <nuxt-link 
                        class="nav-link"
                        exact
                        :to="{
                        name: 'profile',
                        params: {
                            profile: profile.username
                        },
                        query: {
                            tab: 'my'
                        }
                    }">
                        My Articles
                    </nuxt-link>
                    </li>
                    <li class="nav-item">
                    <nuxt-link 
                        class="nav-link"
                        exact
                        :to="{
                        name: 'profile',
                        params: {
                            profile: profile.username
                        },
                        query: {
                            tab: 'favorited'
                        }
                    }">
                        Favorited Articles
                    </nuxt-link>
                    </li>
                </ul>
                </div>

                <div class="article-preview" v-for="item in myArticles" :key="item.slug">
                    <div class="article-meta">
                        <nuxt-link
                            :to="{
                                name: 'profile',
                                params: {
                                    username: item.author.username
                                }
                            }"
                            class="author"
                        >
                            <img :src="item.author.image" />
                        </nuxt-link>
                        <div class="info">
                        <nuxt-link
                            :to="{
                                name: 'profile',
                                params: {
                                    username: item.author.username
                                }
                            }"
                            class="author"
                        >
                            {{item.author.username}}
                        </nuxt-link>
                        <span class="date">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right" 
                            :class="{active: item.favorited}"
                            @click="onFavorite(item)"
                            :disabled="item.favoriteDisabled"
                        >
                            <i class="ion-heart"></i> {{item.favoritesCount}}
                        </button>
                    </div>
                    <nuxt-link :to="{
                        name: 'article',
                        params: {
                            slug: item.slug
                        }
                    }" class="preview-link">
                        <h1>{{item.title}}</h1>
                        <p>{{item.description}}</p>
                        <span>Read more...</span>
                    </nuxt-link>
                </div>

            </div>

            </div>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUser } from '@/api/user'
import { getSelfArticles, addFavorite, deleteFavorite, deleteFollow, addFollow } from '@/api/article'
export default {
    // 在路由匹配组件渲染之前会先执行中间件处理
    middleware: 'authenticated',
    name: 'UserProfile',
    watchQuery: ['tab', 'page'],
    data() {
        return {
            profile: '', 
            myArticles: [],
            articleParams: {},
            page: 1,
            limit: 5,
            articlesCount: '',

        }
    },
    computed: {
        ...mapState(['user']),
        totalPage () {
            return Math.ceil(this.articlesCount / this.limit)
        },
    },
    async mounted() {
        const { data } = await getUser()
        this.profile = data.user
        const offset = ( this.page - 1 ) * this.limit
        this.articleParams = {
            author: this.profile.username,
            // favorited: username,
            limit: this.limit,
            offset: offset
        }
        const { data: myArticle } = await getSelfArticles(this.articleParams)
        this.myArticles = myArticle.articles;
        this.articlesCount = myArticle.articlesCount;
        this.myArticles.forEach(article => article.favoriteDisabled = false)
        
    },
    methods: {
        async onFavorite (article) {
            if (!this.user ) return this.$router.push('/login')
            article.favoriteDisabled = true // 禁用点击
            if(article.favorited) {
                // 取消点赞
                await deleteFavorite(article.slug)
                article.favorited = false
                article.favoritesCount -= 1
            } else {
                // 添加点赞
                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }
            article.favoriteDisabled = false // 允许点击
        },
        async onFollow (author) {
            if (!this.user ) return this.$router.push('/login')
            author.followDisabled = true // 禁用点击
            if(author.following) {
                // 取消点赞
                await deleteFollow(author.username)
                author.following = false
                author.favoritesCount -= 1
            } else {
                // 添加点赞
                await addFollow(author.username)
                author.following = true
                author.followesCount += 1
            }
            author.followDisabled = false // 允许点击
        }
    }
}
</script>