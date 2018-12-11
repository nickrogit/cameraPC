<template>
<div id="page">
  <Card>
    <div slot="title">
      <Icon type="bug"></Icon>
      标题
    </div>

  </Card>
</div>
</template>

<script>
  import router from '@/router'

export default {
  name: 'page',
  data() {
    return {
      loading: false,
      data: []
    }
  },
  mounted() {

  },
  methods: {
    demo() {
      setTimeout(() => {
        // 路由跳转
        this.$store.commit('MENU_SELECT', '/')
        router.push('/')
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
#page {

}
</style>
