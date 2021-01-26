<template>
  <div id="app">
    <h1>拉勾教育</h1>
    <!-- 根路由出口 -->
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class App extends Vue {}
</script>

// <script lang="ts">
// import Vue from 'vue'
// export default Vue.extend({})
// </script>

<style lang="scss" scoped></style>
