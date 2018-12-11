<template>
<div id="main">
  <ComError></ComError>
  <!-- ComError -->
  <div id="login">
    <div class="logo-info">
      <div><img class="logo" src="../assets/logo.png"></div>
      <div><p class="name">电脑拍照示意系统</p></div>
    </div>
    <Form ref="login" :model="login" :rules="loginRule" @keyup.enter.native="handleLogin('login')">
      <FormItem v-for="(item, index) in loginItems" :key="index" :prop="item.prop">
        <Input :type="item.type" v-model="login[item.prop]" :placeholder="item.placeholder"></Input>
      </FormItem>
      <FormItem>
        <Button long type="primary" :loading="this.$store.state.app.loading" @click="handleLogin('login')">登录</Button>
      </FormItem>
    </Form>
  </div>
</div>
</template>
<script>
import {ax} from '@/config/axios'
import {login} from '@/services/app'
import ComError from './common/partials/Error'
import menuData from '@/utils/menuData'

export default {
  name: 'login',
  components: {
    ComError
  },
  data() {
    return {
      ...menuData,
      // 表单元素数组(登录)
      loginItems: [{
        prop: 'username',
        placeholder: '请输入账号'
      }, {
        prop: 'password',
        placeholder: '请输入密码',
        type: 'password'
      }],
      // 表单数据对象(登录)
      login: {
        username: '',
        password: ''
      },
      // 表单验证规则(登录)
      loginRule: {
        username: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      // 表单数据对象(接口域名)
      remote: {
        visible: false,
        version: '',
        host: '',
        baseURL: ''
      },
      token: ''
    }
  },
  mounted() {
    this.login = {
      username: 'admin',
      password: '123456'
    }
    /* const env = process.env.NODE_ENV
      if (env === 'development') {
      this.login = {
        username: 'admin',
        password: 'a12345678'
      }
    } */
  },
  methods: {
    handleLogin(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$store.commit('LOADING', true)
          // 请求参数
          let para = Object.assign({}, this.login)
          login(para).then(res => {
            if (res) {
              ax.defaults.headers.common['Authorization'] = res.data.token
              this.token = res.data.token
              res.data.token = this.token
              localStorage.setItem('userCam', JSON.stringify(res.data))
              this.$store.commit('MENU', this.menuData)
              this.$router.push('/')
              this.$store.commit('LOADING', false)
            } else {
              this.$store.commit('LOADING', false)
            }
          }).catch(() => {
            this.$store.commit('LOADING', false)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#login {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 360px;
    height: 350px;
    margin: -175px 0 0 -180px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    .logo-info {
        height: 84px;
        margin-bottom: 22px;
        text-align: center;
        .logo {
            width: 64px;
            height: 64px;
            margin-right: 10px;
        }
        .name {
            position: relative;
            display: inline-block;
            text-align: left;
            font-size: 18px;
            line-height: 20px;
        }
        .sub {
            font-size: 12px;
        }
    }
    .version {
        text-align: center;
        color: #ccc;
    }
    .remote {
        position: fixed;
        top: 10px;
        left: 10px;
        padding: 10px;
        border: 1px dashed #ccc;
        background-color: #fff;
        .address {
            margin-bottom: 6px;
            text-align: left;
            color: #ccc;
        }
    }
}
</style>
