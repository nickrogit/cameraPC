<template>
<div id="com-header">
  <div class="logo-info">
    <img class="logo" src="../../../assets/logo.png">
    <p class="name">电脑PC端拍照功能<span class="sub"></span></p>
  </div>
  <!-- .logo-info -->
  <div class="login-info">
    <Dropdown trigger="click" @on-click="handleDropdown">
      <strong class="user">
        <Avatar style="background-color: #3c3" icon="ios-person" size="small"></Avatar>
        {{ userName }}
      </strong>
      <DropdownMenu slot="list">
        <DropdownItem v-for="(item, index) in dropdownItems" :key="index" :name="item.name">
          <Icon :type="item.icon"></Icon> {{ item.label }}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</div>
</template>
<script>
  import {loginOut} from '@/services/app'

export default {
  name: 'com-header',
  components: {},
  data() {
    return {
      userName: '',
      modal: {
        title: '',
        visible: false
      },
      dropdownItems: [{
        label: '安全退出',
        name: 'signout',
        icon: 'log-out'
      }]
    }
  },
  mounted() {
    // 获取用户信息
    const user = JSON.parse(localStorage.getItem('userCam'))
    this.userName = user.userName || 'Null'
  },
  methods: {
    // 下拉菜单项
    handleDropdown(name) {
      // 修改密码
      if (name === 'modifyPwd') {
        this.modal = {
          title: 'Modify Pwd',
          visible: true
        }
      }
      // 退出系统
      if (name === 'signout') {
        this.$Modal.confirm({
          title: '提示',
          content: '是否安全退出系统?',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            loginOut().then(res => {
              this.$router.push('/login')
            }).catch(() => {
            })
            this.$router.push('/login') // 路由跳转登录页
            this.$store.commit('MENU_RESET') // 重置菜单
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#com-header {
    overflow: hidden;
    color: #fff;
    background-color: #3f525a;
    .logo-info {
        float: left;
        width: 340px;
        .logo {
            float: left;
            width: 40px;
            height: 40px;
            margin: 10px 16px 10px 24px;
        }
        .name {
            float: left;
            width: 260px;
            margin: 12px 0 6px;
            font-size: 16px;
            line-height: 36px;
        }
        .sub {
            font-size: 12px;
        }
    }
    .login-info {
        float: right;
        height: 60px;
        padding-right: 20px;
        line-height: 60px;
        .user {
            display: block;
            margin-left: 8px;
            cursor: pointer;
            color: #fff;
        }
    }
}
</style>
