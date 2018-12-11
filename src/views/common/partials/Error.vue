<template>
<div v-if="resError" id="error">
  <Alert :type="resError.status === 200 ? 'warning' : 'error'" banner closable @on-close="handleClose">
    <h3 class="title">Status Code:
      <span :style="{color: resError.status === 200 ? '#093' : '#f33'}">
        <Icon :type="resError.status === 200 ? 'checkmark-circled' : 'close-circled'"></Icon>
        {{ resError.statusCode }}
      </span>
    </h3>
    <div slot="desc" class="desc">
      <pre>{{ resError.error }}</pre>
    </div>
  </Alert>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'error',
  computed: {
    ...mapGetters({
      resError: 'getResError'
    })
  },
  methods: {
    handleClose() {
      this.$store.commit('RES_ERROR', '') // 清空响应错误数据
    }
  }
}
</script>
<style lang="scss" scoped>
#error {
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .ivu-alert {
        min-height: 100%;
        margin-bottom: 0;
        border-style: none;
    }
    .title {
        margin-bottom: 12px;
    }
    .desc {
        padding: 0 24px;
    }
    .ivu-alert-warning {
        background-color: rgba(255, 255, 204, 0.8);
        .desc {
            color: #c90;
            color: #333;
            border: 1px dashed #c90;
        }
    }
    .ivu-alert-error {
        background-color: rgba(253, 236, 232, 0.8);
        .desc {
            color: #f33;
            border: 1px dashed #f33;
        }
    }
}
</style>
