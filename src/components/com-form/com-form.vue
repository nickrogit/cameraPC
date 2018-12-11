<template>
  <div id="com-form" @keyup.enter="handleSubmit('submit')">
    <Form ref="comForm" :view="view" :pwd="pwd" :model="model" :rules="rules" :inline="inline" :label-width="labelWidth" :label-position="labelPosition">
      <slot> </slot>
      <template v-if="view">
        <div v-for="(item, index) in items" :key="index" class="ivu-form-item-div">
          <FormItem style="margin-bottom:10px" v-if="(item.type ==='password' && pwd) || item.type !=='password'" :prop="item.prop" :label="item.label" :label-width="item.labelWidth">
            <template v-if="!item.button">
              <div v-if="item.element !== 'file'">
                <div v-if="item.element==='cascader'">
                  {{model[item.prop]}}
                </div>
                <div v-else-if="item.element==='checkbox'">
                  <span v-for="(opt, index) in item.option" :key="index">
                    <span v-if="model[item.prop].indexOf(opt.value) > -1">
                      {{ opt.label }}
                    </span>
                  </span>
                </div>
                <div v-else-if="item.element === 'radio' || item.element === 'select'">
                  <div v-for="(opt, index) in item.option" :key="index">
                    <span v-if="model[item.prop] === opt.value">
                      {{ opt.label }}
                    </span>
                  </div>
                </div>
                <div v-else>
                  {{ model[item.prop] }}
                </div>
              </div>
              <div v-if="item.element === 'file'">
                <div v-if="model[item.prop] !==''" style="display: inline-block;">
                  <div v-if="item.filetype === 'a'">
                    <a v-if="item.prop === 'contractUrl'" v-bind:href="model[item.prop]">{{model['contractFileName']}}</a>
                    <a v-else v-bind:href="model[item.prop]">{{model[item.prop]}}</a>
                  </div>
                  <div v-else>
                    <div v-if="item.flag === 'C'" class="file-img-box wh">
                      <img class="file-imgw" :src="model[item.prop]">
                      <div class="demo-upload-list-cover">
                        <Icon size="30" color="#fff" type="ios-eye-outline" @click.native="handleView(model[item.prop])"></Icon>
                      </div>
                    </div>
                    <div v-else class="file-img-box ww">
                      <img class="file-imgw" :src="model[item.prop]">
                      <div class="demo-upload-list-cover">
                        <Icon size="30" color="#fff" type="ios-eye-outline" @click.native="handleView(model[item.prop])"></Icon>
                      </div>
                    </div>
                  </div>
                </div>
                <Modal title="图片查看" v-model="visible" :mask-closable="closable">
                  <img :src="imgUrl" v-if="visible" style="width: 100%">
                </Modal>
              </div>
            </template>
          </FormItem>
        </div>
      </template>
      <template v-else>
        <div v-for="(item, index) in items" :key="index" class="ivu-form-item-div">
          <FormItem v-if="(item.type ==='password' && pwd) || item.type !=='password'" :prop="item.prop" :label="item.label" :label-width="item.labelWidth" style="margin-bottom: 18px">
            <template v-if="!item.button">
              <!-- 输入框 -->
              <Input v-if="!item.element" :type="item.type" v-model="model[item.prop]" :size="item.size" :placeholder="item.placeholder" :disabled="item.disabled" :icon="item.icon" :number="item.number" :rows="item.rows" :autosize="item.autosize" :maxlength="item.maxlength" :style="{width: item.width + 'px'}"></Input>

              <!-- 数字输入框 -->
              <InputNumber v-if="item.element === 'number'" :max="item.max" :min="item.min" v-model="model[item.prop]" :size="item.size" :disabled="item.disabled"></InputNumber>
              <!-- 选择器 -->
              <Select v-if="item.element === 'select'" v-model="model[item.prop]" :multiple="item.multiple" :clearable="item.clearable" :disabled="item.disabled" :filterable="item.filterable" :size="item.size" :placeholder="item.placeholder" :style="{width: item.width + 'px'}">
                <Option v-for="(opt, index) in item.option" :key="index" :value="opt.value" :disabled="opt.disabled">{{ opt.label }}</Option>
              </Select>
              <!-- 日期时间选择器 -->
              <DatePicker v-if="item.element === 'datetime'" :clearable="item.clearable" :type="item.type" v-model="model[item.prop]" :format="item.format" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled"></DatePicker>
              <!-- 日期选择器 -->
              <DatePicker v-if="item.element === 'date'" :clearable="item.clearable" :type="item.type" v-model="model[item.prop]" :format="item.format" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled"></DatePicker>
              <!-- 时间选择器 -->
              <TimePicker v-if="item.element === 'time'" :type="item.type" v-model="model[item.prop]" :format="item.format" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled"></TimePicker>
              <!-- 单选框 -->
              <RadioGroup v-if="item.element === 'radio'" v-model="model[item.prop]" :type="item.type" :size="item.size" :vertical="item.vertical">
                <Radio v-for="(opt, index) in item.option" :key="index" :label="opt.value" :disabled="opt.disabled" :size="item.size">{{ opt.label }}</Radio>
              </RadioGroup>
              <!-- 多选框 -->
              <CheckboxGroup v-if="item.element === 'checkbox'" v-model="model[item.prop]" :size="item.size">
                <Checkbox v-for="(opt, index) in item.option" :key="index" :label="opt.value" :disabled="opt.disabled" :size="item.size">{{ opt.label }}</Checkbox>
              </CheckboxGroup>
              <!--级联-->
              <Cascader v-if="item.element === 'cascader'" change-on-select :data="provinces" v-model="model[item.prop]" style="width:200px"></Cascader>
              <!--文件上传-->
              <div v-if="item.element === 'file'">
                <div v-if="model[item.prop] !==''" style="display: inline-block;">
                  <!--超链接-->
                  <div v-if="item.filetype === 'a'" style="display: inline-block;">
                    <a v-if="item.prop === 'contractUrl'" v-bind:href="model[item.prop]">{{model['contractFileName']}}</a>
                    <a v-else v-bind:href="model[item.prop]">{{model[item.prop]}}</a>
                    <Button v-if="item.prop === 'contractUrl'" style="color: #2b85e4" icon="ios-cloud-download-outline"><a v-bind:href="model[item.prop]" target="_blank">下载</a></Button>
                  </div>
                  <div v-else>
                    <!--图片-->
                    <div v-if="item.flag === 'C'" class="file-img-box wh">
                      <img class="file-imgw" :src="model[item.prop]">
                      <div class="demo-upload-list-cover">
                        <Icon size="30" color="#fff" type="ios-eye-outline" @click.native="handleView(model[item.prop])"></Icon>
                      </div>
                    </div>
                    <div v-else class="file-img-box ww">
                      <img class="file-imgw" :src="model[item.prop]">
                      <div class="demo-upload-list-cover">
                        <Icon size="30" color="#fff" type="ios-eye-outline" @click.native="handleView(model[item.prop])"></Icon>
                      </div>
                    </div>
                  </div>
                </div>

                <Upload v-if="item.flag === 'A'"
                        ref="upload"
                        :show-upload-list="false"
                        :max-size="3072"
                        :on-exceeded-size="handleMaxSize"
                        :format="['jpg']"
                        :on-format-error="handleFormatError"
                        :on-success="handleSuccessA"
                        :on-error="handleError"
                        type="drag"
                        :data="param"
                        :action="uploadUrl"
                        style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Upload v-if="item.flag === 'B'"
                        ref="upload"
                        :show-upload-list="false"
                        :max-size="3072"
                        :on-exceeded-size="handleMaxSize"
                        :format="['jpg']"
                        :on-format-error="handleFormatError"
                        :on-success="handleSuccessB"
                        :on-error="handleError"
                        type="drag"
                        :data="param"
                        :action="uploadUrl"
                        style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Upload v-if="item.flag === 'C'"
                        ref="upload"
                        :show-upload-list="false"
                        :max-size="3072"
                        :on-exceeded-size="handleMaxSize"
                        :format="['jpg']"
                        :on-format-error="handleFormatError"
                        :on-success="handleSuccessC"
                        :on-error="handleError"
                        type="drag"
                        :data="param"
                        :action="uploadUrl"
                        style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Upload v-else
                        ref="upload"
                        :show-upload-list="false"
                        :max-size="item.maxsize"
                        :on-exceeded-size="handleMaxSize"
                        :format="item.format"
                        :before-upload="handleBefore"
                        :on-format-error="handleFormatError"
                        :on-progress="handleProgress"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :data="param"
                        :action="uploadUrl"
                        :headers = 'headers'
                        style="display: inline-block;width:58px;">
                  <Button  :loading="fileLoading" icon="ios-cloud-upload-outline">请上传</Button>
                </Upload>

                <Modal title="图片查看" v-model="visible" :mask-closable="closable">
                  <img :src="imgUrl" v-if="visible" style="width: 100%">
                </Modal>

              </div>
              <p class="remark" v-if="item.remark" style="line-height: 24px" v-html="item.remark"></p>
            </template>
            <template v-else>
              <Button v-for="(item, index) in item.button" :key="index" :type="item.type" :long="item.long" :disabled="item.disabled" :loading="item.name === 'submit' ? btnLoading : false" :icon="item.icon" @click="handleSubmit(item.name)" class="button">{{ item.text }}</Button>
            </template>
          </FormItem>
        </div>
      </template>
        <slot name="foot"> </slot>
    </Form>
    <Spin v-if="loading" size="large" fix></Spin>
  </div>
</template>
<script>
  import config from '@/config'
  import provincesData from '@/utils/provinces'

  export default {
    name: 'com-form',
    props: {
      pwd: Boolean, // 是否密码
      view: Boolean, // 是否查看
      inline: Boolean, // 行内表单模式
      labelWidth: Number, // 表单域标签宽度
      labelPosition: String, // 表单域标签位置
      items: Array, // 表单元素数组
      model: Object, // 表单数据对象
      rules: Object, // 表单验证对象
      // 表单加载状态
      loading: {
        type: Boolean,
        default: false
      },
      // 按钮加载状态
      btnLoading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        ...provincesData,
        closable: false,
        imgUrl: '',
        visible: false,
        param: {},
        fileLoading: false,
        uploadUrl: config.baseURL + '/sys/uploadFile',
        headers: {}
      }
    },
    mounted() {
      this.setHeaders()
    },
    methods: {
      setHeaders() {
        const user = JSON.parse(localStorage.getItem('userCam'))
        if (user) {
          this.headers = {
            Authorization: user.token
          }
        }
      },
      validate() {
        let validate = false
        // 对整个表单进行校验
        this.$refs['comForm'].validate(valid => {
          validate = valid
        })
        return validate
      },
      validateField(name) {
        // 对部分表单字段进行校验的方法
        this.$refs['comForm'].validateField(name)
      },
      resetFields() {
        // 对整个表单进行重置
        this.$refs['comForm'].resetFields()
      },
      handleSubmit(name) {
        if (name === 'submit') {
          // 对整个表单进行校验
          this.$refs['comForm'].validate(valid => {
            if (valid) {
              this.$emit('on-submit')
            }
          })
        } else if (name === 'reset') {
          this.resetFields()
          this.$emit('on-reset')
        } else {
          this.$emit('on-click')
        }
      },
      handleFormatError (file) {
        this.fileLoading = false
        this.$Notice.warning({
          title: '文件格式错误',
          desc: '图片文件格式不正确，请重新上传。'
        })
      },
      handleMaxSize (file) {
        this.fileLoading = false
        this.$Notice.warning({
          title: '超出文件大小',
          desc: '文件太大, 请重新上传。'
        })
      },
      handleError (response, file) {
        this.fileLoading = false
        this.$Notice.warning({
          title: '上传失败',
          desc: '请重新上传'
        })
      },
      handleBefore () {
        this.fileLoading = true
      },
      handleProgress (event, file, fileList) {
      },
      handleSuccess (response, file) {
        if (response.code === 200) {
          this.fileLoading = false
          let fileData = {
            url: response.data.absolutePath,
            name: file.name
          }
          this.$emit('listenToUpload', fileData)
        } else {
          this.fileLoading = false
          this.$Notice.warning({
            title: '上传失败',
            desc: response.msg
          })
        }
      },
      handleSuccessA (response, file) {
        this.fileLoading = false
        if (response.code === 200) {
          let imgData = response.data
          this.$emit('listenToPhotoA', imgData)
        } else {
          this.$Notice.warning({
            title: '上传失败',
            desc: response.msg
          })
        }
      },
      handleSuccessB (response, file) {
        this.fileLoading = false
        if (response.code === 200) {
          let imgData = response.data
          this.$emit('listenToPhotoB', imgData)
        } else {
          this.$Notice.warning({
            title: '上传失败',
            desc: response.msg
          })
        }
      },
      handleSuccessC (response, file) {
        this.fileLoading = false
        if (response.code === 200) {
          let imgData = response.data
          this.$emit('listenToPhotoC', imgData)
        } else {
          this.$Notice.warning({
            title: '上传失败',
            desc: response.msg
          })
        }
      },
      handleView (url) {
        this.imgUrl = url
        this.visible = true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .remark{
    font-size: 12px;
  }
  #com-form {
    position: relative;
    .button {
      margin-right: 8px;
      &:last-child {
        margin-right: 0;
      }
    }
    .hiddenClass{
      display: none;
    }

    .file-img-box{
      position: relative;
      display: inline-block;
      text-align: center;
      height: 100px;
      line-height: 100px;
      overflow: hidden;
    }
    .ww{
      width: 180px;
    }
    .wh{
      width: 80px;
    }
    .demo-upload-list-cover{
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
    }
    .file-img-box:hover .demo-upload-list-cover{
      display: block;
    }
    .file-imgw{
      width: 100%;
      height: 100%;
    }
    .file-img{
      height: 100px;
    }
    .demo-upload-list-cover i{
      color: #fff;
      font-size: 30px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
</style>
