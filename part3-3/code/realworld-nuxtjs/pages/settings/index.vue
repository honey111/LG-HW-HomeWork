<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Your Settings</h1>

                <form>
                <fieldset>
                    <fieldset class="form-group">
                        <input class="form-control" type="text" placeholder="URL of profile picture" v-model="users.image">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="users.username">
                    </fieldset>
                    <fieldset class="form-group">
                        <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="users.bio"></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="users.email">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password">
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="onSubmit">
                        Update Settings
                    </button>
                </fieldset>
                </form>
                <hr/>
                <button class="btn btn-outline-danger" @click="logout">
                    Or click here to logout.
                </button>
            </div>

            </div>
        </div>
    </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie'): undefined
import { updataUser } from '@/api/user'
import { mapState } from 'vuex'
export default {
    // 在路由匹配组件渲染之前会先执行中间件处理
    middleware: 'authenticated',
    name: 'settingsIndex',
    data (){
        return {
            users: {
                email: '',
                image: '',
                username: '',
                bio: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState(['user'])
    },
    mounted() {
        this.users.email = this.user.email
        this.users.image = this.user.image
        this.users.username = this.user.username
        this.users.password = this.user.password
        this.users.bio = this.user.bio
    },
    methods: {
        async onSubmit(){
            console.log(this.users, 3345)
            try{
                const { data } = await updataUser(this.users)

                // 更新用户的登录状态
                this.$store.commit('setUser', data.user)
                
                // 为了防止刷新页面数据丢失，需要把数据持久化
                Cookie.set('user', data.user)

                this.$router.push(`/profile/${data.user.username}`)
            }catch(e){
                console.log(e.response.data.errors)
            }
            
        },

        // 退出登录
        logout(){
            // 删除用户的登录状态
            this.$store.commit('setUser', null)
            
            // 删除数据持久化
            Cookie.set('user', null)
            this.$router.push('/')
        }
    },
}
</script>