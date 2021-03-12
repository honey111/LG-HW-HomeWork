<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
      class="login-from"
      >
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
import qs from 'qs'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      }
    }
  },
  methods: {
    async onSubmit () {
      // 1、表单验证
      await (this.$refs.form as Form).validate()
      // 2、验证通过---提交表单
      const { data } = await request({
        method: 'POST',
        url: '/front/user/login',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(this.form) // axios 默认发送的是application/json 格式的数据
      })
      console.log(data)
      // 3、处理请求结果
      // 失败：提示
      if (data.state !== 1) {
        return this.$message.error(data.message)
      }
      // 成功：跳转首页
      this.$router.push({
        name: 'home'
      })
      this.$message.success('登录成功')
    }
  }
})
</script>
<style lang="scss" scoped>
.login{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-from{
    width: 300px;
    background: #ffffff;
    padding: 20px;
    border-radius: 5px;
    .login-btn{
      width: 100%;
    }
  }
}
</style>
