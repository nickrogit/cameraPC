<template>
<div id="dashboard" style="display: flex;align-items: center;justify-content: center">

  <div style="font-size: 18px">欢迎体验电脑PC端拍照功能</div>

  <Spin v-if="loading" size="large" fix></Spin>
</div>
</template>

<script>

export default {
  name: 'dashboard',
  data() {
    return {
      loading: false,
      dashData: {}
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#dashboard {
  height: calc(100vh - 124px);
  overflow:hidden;
  .dbox{
    background:#4CB7ED;
    color: #fff;
    text-align: center;
    margin-bottom: 16px;
    padding: 10px 0;
  }
  h1{
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    padding: 10px 0;
  }
  h2{
    font-weight: normal;
    font-style: normal;
    font-size: 28px;
    padding: 10px 0;
  }
}
</style>
