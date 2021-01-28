<template>
  <div id="app">
    <h1 class="text">小郝出品</h1>
    <span></span>
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

interface Foo {
  a: string
  b: number
}
</script>
<style lang="scss" scoped>
.text{
  color: $success-color;
}
</style>
