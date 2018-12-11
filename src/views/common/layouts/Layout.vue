<template>
<div id="layout">
  <ComError></ComError>
  <!-- ComError -->
  <ComHeader></ComHeader>
  <!-- ComHeader -->
  <ComSidebar></ComSidebar>
  <!-- ComSidebar -->
  <div id="content">
    <!-- <Breadcrumb class="layout-breadcrumb">
      <BreadcrumbItem v-for="(item, index) in $route.matched" :key="index" :to="item.path">
        {{ item.name }}
      </BreadcrumbItem>
    </Breadcrumb> -->
    <!-- .layout-breadcrumb -->
    <div class="layout-content">
      <router-view></router-view>
    </div>
    <!-- .layout-content -->
  </div>
  <!-- #content -->
  <!-- <ComFooter></ComFooter> -->
  <!-- ComFooter -->
</div>
</template>
<script>
// import ComFooter from '../partials/Footer'
import ComError from '../partials/Error'
import ComHeader from '../partials/Header'
import ComSidebar from '../partials/Sidebar'

export default {
  name: 'layout',
  components: {
    // ComFooter,
    ComError,
    ComHeader,
    ComSidebar
  }
}
</script>
<style lang="scss" scoped>
#content {
    overflow: auto;
    height: calc(100vh - 60px);
    margin-left: 240px;
    background-color: #f8f8f8;
    .layout-breadcrumb,
    .layout-content {
        margin: 16px;
    }
    .layout-content {
        background-color: #fff;
        padding: 16px;
    }
}
</style>
