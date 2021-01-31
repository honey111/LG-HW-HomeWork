<template>
  <el-container>
    <el-aside width="200px">
      <app-aside />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside
  }
})
</script>
<style scoped>
.el-aside{
  height: 100vh;
  background: #ccc;
}
.el-header{
  background: blueviolet;
}
</style>
