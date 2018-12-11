<template>
  <div id="not-found">
    <div>
      <img class="img404" src="../../../assets/404.png"></img>
      <div class="content"> 系统将在
        <span class="count">{{ count }}</span>
        秒后跳转首页
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'not-found',
    data: () => ({
      count: 3
    }),
    mounted() {
      setInterval(() => {
        this.count -= 1
      }, 1000)
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    }
  }
</script>
<style lang="scss" scoped>
  #not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
    .img404{
      width: 500px;
      height: 393px;
    }
    text-align: center;
    .title {
      color: red;
    }
    .content {

    }
    .count {
      color: red;
      font-size: 18px;
    }
  }
</style>
