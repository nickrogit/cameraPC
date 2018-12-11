<template>
<div id="app">
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  body{
    background-color: #efeff1;
    font-size: 14px !important;
  }
#app {
    // 过渡动画
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
}
// 自定义滚动条样式
::-webkit-scrollbar-track-piece {
    width: 8px;
    background-color: #f8f8f8;
}
::-webkit-scrollbar {
    width: 8px;
    height: 6px;
}
::-webkit-scrollbar-thumb {
    height: 50px;
    cursor: pointer;
    background-color: #e6e6e6;
}
  .ivu-input[disabled], fieldset[disabled] .ivu-input{
    background-color: #f9f9f9 !important;
    color: #919394 !important;
  }
  .ivu-select-disabled .ivu-select-selection {
    background-color: #f9f9f9 !important;
    color: #919394 !important;
  }
  .ivu-btn,.ivu-form .ivu-form-item-label,.ivu-table,.ivu-form-item-content,.ivu-input,.ivu-checkbox-wrapper,.ivu-tree ul{
    font-size: 14px !important;
  }
  .ivu-form-inline .ivu-form-item-div{
    display: inline-block;
  }
  .ivu-form-item-error-tip{
    padding-top: 3px !important;
    font-size: 13px;
  }
  .remark{
    font-size: 12px;
    line-height: 20px;
  }
  .ivu-tree ul li{
    margin: 0 !important;
  }
  .ivu-form-item{
    margin-bottom: 18px;
  }
  .vue-tree-list .item-bold{
    font-weight: normal !important;
  }
  .vue-tree-list{
    padding-left: 0;
  }
  .vue-tree-item .vue-tree-list{
    padding-left: 20px !important;
  }
  .item-checkbox{
    color: #2d8cf0;
    font-size: 16px !important;
    vertical-align: middle;
  }
</style>
