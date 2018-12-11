<template>
<div id="modify-pwd" style="width: 400px;">
  <ComForm ref="modifyPwd" :items="modifyPwdItems" :model="modifyPwd" :rules="modifyPwdRule" :btn-loading="loading" :label-width="110" @on-submit="handleSubmit('modifyPwd')" @on-click="handleCancel"></ComForm>
</div>
</template>
<script>
import {
  modifyPwd
} from '@/services/app'

export default {
  name: 'modify-pwd',
  data() {
    const validPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your new password'))
      } else {
        if (this.modifyPwd.pwdAgain) {
          // 对第二个密码框单独验证
          this.$refs['modifyPwd'].validateField('pwdAgain')
        }
        callback()
      }
    }
    const validPwdCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your password again'))
      } else if (value !== this.modifyPwd.newPwd) {
        callback(new Error('The two input password do not match!'))
      } else {
        callback()
      }
    }
    return {
      // 加载状态
      loading: false,
      // 表单元素数组
      modifyPwdItems: [{
        label: 'Old password',
        prop: 'oldPwd',
        placeholder: 'Enter your old password',
        type: 'password'
      }, {
        label: 'New password',
        prop: 'newPwd',
        placeholder: 'Enter your new password',
        type: 'password'
      }, {
        label: 'Password again',
        prop: 'pwdAgain',
        placeholder: 'Enter your password again',
        type: 'password'
      }, {
        button: [{
          name: 'submit',
          type: 'primary',
          text: 'Submit'
        }, {
          type: 'default',
          text: 'Cancel'
        }]
      }],
      // 表单数据对象
      modifyPwd: {
        oldPwd: '',
        newPwd: '',
        pwdAgain: ''
      },
      // 表单验证规则
      modifyPwdRule: {
        oldPwd: [{
          required: true,
          message: 'Please enter your old password',
          trigger: 'blur'
        }],
        newPwd: [{
          required: true,
          validator: validPwd,
          trigger: 'blur'
        }],
        pwdAgain: [{
          required: true,
          validator: validPwdCheck,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      // 请求参数
      let para = Object.assign({}, this.modifyPwd)
      this.loading = true
      setTimeout(() => {
        modifyPwd(para).then(res => {
          this.$Message.success(res.msg)
          this.handleCancel()
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 500)
    },
    handleCancel() {
      this.$emit('on-click')
    }
  }
}
</script>
