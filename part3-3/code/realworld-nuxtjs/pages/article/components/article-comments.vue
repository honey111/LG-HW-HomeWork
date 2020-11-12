<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="writeComment"></textarea>
      </div>
      <div class="card-footer">
          <img :src="article.author.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary">
          Post Comment
          </button>
      </div>
    </form>
      
    <div class="card" v-for="item in comments" :key="item.id">
      <div class="card-block">
          <p class="card-text">{{item.body}}</p>
      </div>
      <div class="card-footer">
          <nuxt-link
            class="comment-author" 
            :to="{
              name: 'profile',
              params: {
                username: item.author.username
              }
            }"
          >
            <img :src="item.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link
            class="comment-author" 
            :to="{
              name: 'profile',
              params: {
                username: item.author.username
              }
            }"
          >
            {{item.author.username}}
          </nuxt-link>
          <span class="date-posted">{{item.createdAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments } from '@/api/article'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [], // 评论列表
      writeComment: '', // 添加评论
    }
  },
  async mounted() {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    async postComments () {
      let params = {
        
      }
      await addComments(this.article.slug, )
    }
  },
}
</script>

<style>

</style>