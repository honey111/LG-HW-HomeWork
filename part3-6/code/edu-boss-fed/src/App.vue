<template>
  <div id="app">
    <h1>拉勾教育</h1>
    <span>{{ a }}</span>
    <!-- 根路由出口 -->
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class App extends Vue {
  a = 1
  b = 2
  text () {
    console.log(this.a)
  }
}
</script>
<style lang="scss" scoped></style>
