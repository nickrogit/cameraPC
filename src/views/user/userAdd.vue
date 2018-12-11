<template>
  <div id='userAdd' class='sdbox'>
    <Form ref='member' :label-width='120' :model='member' :rules='memberRule' style='width: 600px'>
      <FormItem label='姓名：' prop='name'>
        <Input v-model='member.name' placeholder='' size='large' :maxlength='20'></Input>
      </FormItem>
      <FormItem label='手机号：' prop='phone'>
        <Input v-model='member.phone' placeholder='' size='large' :maxlength='11'></Input>
      </FormItem>
      <FormItem label='身份证号：' prop='idCard'>
        <Input v-model='member.idCard' placeholder='' size='large' :maxlength='18'></Input>
      </FormItem>
      <FormItem label='照片：' prop='photo'>
        <div v-if="member.photo" class="uploadPhoto" >
          <img :src="member.photo">
        </div>
        <Button type='default' long style='width: 120px;' icon="ios-camera" @click="handleCamera">拍摄照片</Button>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :max-size="upload.maxsize"
          :format="upload.format"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBefore"
          :on-format-error="handleFormatError"
          :on-success="handleSuccess"
          :on-error="handleError"
          :data="upload.param"
          :headers = 'upload.headers'
          :action="upload.uploadUrl"
          style="display: inline-block;margin-left: 10px">
          <Button type="default" :loading="upload.fileLoading" icon="ios-cloud-upload-outline" style="width: 120px">上传照片</Button>
        </Upload>
      </FormItem>
      <FormItem label='备注：' prop='remarks'>
        <Input v-model='member.remarks' type='textarea' placeholder='请输入备注' :maxlength='300'></Input>
      </FormItem>
      <br/>
      <FormItem label=''>
        <Button type='primary' :loading='loading.btn' long size='large' style='width: 200px;margin-left: 10px'>保存</Button>
      </FormItem>
    </Form>
    <Spin v-if='loading.page' size='large' fix></Spin>

    <!--拍照-->
    <Modal v-model='modal.visibleCamera' title='拍照' footer-hide width='970' :mask-closable='false'>
      <div style="display: flex;">
        <div class="cameraBox">
          <div style="text-align: center;font-size: 14px;font-weight: bold;margin-bottom: 10px;">摄像头</div>
          <video id="video" width="600" height="440"></video>
          <div class="iCenter" style="margin-top: 20px">
            <Button type='primary' long size='large' @click="takePhone" style='width: 200px;'>拍照</Button>
          </div>
        </div>
        <div>
          <div style="text-align: center;font-size: 14px;font-weight: bold;margin-bottom: 10px;">拍摄效果</div>
          <canvas id='canvas' width='330' height='440' style="display: block"></canvas>
          <div class="iCenter" style="margin-top: 20px">
            <Button type='primary' long size='large' @click="takePhoneUpfile" style='width: 200px;' v-if="preViewVisible" :loading="loading.cameraLoading">保存</Button>
          </div>
        </div>
      </div>


    </Modal>
  </div>
</template>
<script>
  import config from '@/config'

  export default {
    name: 'userAdd',
    data() {
      const validNameCnEnChar = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'))
        }
        if (!isNaN(value)) {
          callback(new Error('联系人格式为1-10中文、英文或字符'))
        }
        if (value.length > 10) {
          callback(new Error('联系人格式为1-10中文、英文或字符'))
        } else {
          callback()
        }
      }
      const validTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        }
        if (!(/^1[3-9]\d{9}$/.test(value))) {
          callback(new Error('手机号格式不正确'))
        } else {
          callback()
        }
      }
      return {
        preViewVisible: false,
        blobFile: null,
        upload: {
          maxsize: 102400,
          format: ['jpg', 'jpeg', 'png'],
          param: {},
          headers: {},
          uploadUrl: config.baseURL + '/sys/uploadFile',
          fileLoading: false
        },
        loading: {
          cameraLoading: false,
          page: false,
          list: false, // 列表
          form: false, // 表单
          btn: false, // 按钮
          btnCode: false, // 按钮
          search: false // 模糊搜索
        },
        modal: {
          title: '结算',
          visible: false,
          view: false,
          pwd: true,
          visibleCamera: false
        },
        memberInit: {},
        member: {
          id: '',
          name: '',
          phone: '',
          idCard: '',
          remarks: '',
          photo: ''
        },
        memberRule: {
          name: [{ required: true, validator: validNameCnEnChar, trigger: 'blur' }],
          phone: [{ required: true, validator: validTel, trigger: 'blur' }]
        },
        canvas: null,
        video: null,
        MediaStreamTrack: null
      }
    },
    mounted() {
      this.memberInit = Object.assign({}, this.member)
      // 摄像头
      this.canvas = document.getElementById('canvas')
      this.video = document.getElementById('video')
      this.setHeaders() // 上传token
    },
    methods: {
      setHeaders() {
        const user = JSON.parse(localStorage.getItem('userM'))
        if (user) {
          this.upload.headers = {
            Authorization: user.token
          }
        }
      },
      submitAddEdit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
          }
        })
      },
      handleCamera() {
        this.modal.visibleCamera = true // 打开摄像头弹层
        this.preViewVisible = false
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)
        let that = this
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then(function (stream) {
            that.MediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1]
            that.video.src = (window.URL).createObjectURL(stream)
            that.video.play()
          }).catch(function (err) {
            console.log(err)
          })
        } else if (navigator.getMedia) {
          navigator.getMedia({
            video: true
          }).then(function (stream) {
            that.MediaStreamTrack = stream.getTracks()[1]
            that.video.src = (window.webkitURL).createObjectURL(stream)
            that.video.play()
          }).catch(function (err) {
            console.log(err)
          })
        }
      },
      takePhone() {
        let that = this
        that.canvas.getContext('2d').drawImage(this.video, 135, 0, 330, 440, 0, 0, 330, 440) // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        let dataurl = that.canvas.toDataURL('image/jpeg')
        that.blobFile = that.dataURLtoFile(dataurl, 'camera.jpg')
        that.preViewVisible = true
      },
      takePhoneUpfile() {
        let that = this
        let formData = new FormData()
        formData.append('file', that.blobFile)
        that.xhrPost(formData) // formdata方式上传图片
      },
      xhrPost(formData) {
        console.log('开始上传')
        let that = this
        that.loading.cameraLoading = true
        let xhr = null
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        }
        if (xhr != null) {
          xhr.onreadystatechange = function () {
            that.loading.cameraLoading = true
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                let resData = JSON.parse(xhr.responseText)
                console.log(resData)
                if (resData.code === 200) {
                  that.MediaStreamTrack && that.MediaStreamTrack.stop() // 关闭摄像头
                  that.member.photo = resData.data.absolutePath
                  that.loading.cameraLoading = false
                  that.modal.visibleCamera = false
                } else {
                  that.loading.cameraLoading = false
                  that.$Notice.warning({title: '提示', desc: resData.msg})
                }
              }
            }
          }
          const user = JSON.parse(localStorage.getItem('userM'))
          xhr.open('post', config.baseURL + '/sys/uploadFile')
          xhr.setRequestHeader('Authorization', user.token)
          xhr.setRequestHeader('platform', '1')
          xhr.setRequestHeader('apiVersion', '1')
          xhr.send(formData)
        } else {
          that.$Notice.warning({title: '提示', desc: '您的浏览器不支持XMLHTTP'})
        }
      },
      dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type: mime})
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式错误',
          desc: '图片文件格式不正确，请重新上传。'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小',
          desc: '文件太大, 请重新上传。'
        })
      },
      handleError (response, file) {
        this.$Notice.warning({
          title: '上传失败',
          desc: '请重新上传'
        })
      },
      handleBefore () {
        this.upload.fileLoading = true
      },
      handleSuccess (response, file) {
        if (response.code === 200) {
          this.member.photo = response.data.absolutePath
          this.upload.fileLoading = false
          this.modal.visibleCamera = false
        } else {
          this.upload.fileLoading = false
          this.$Notice.warning({
            title: '上传失败',
            desc: response.msg
          })
        }
      }
    }
  }
</script>
<style>
  #userAdd{
    background: #fff;
    padding: 30px 40px;
  }
  .uploadPhoto{
    width: 165px;
    height: 220px;
    border:1px solid #f2f2f2;
    margin-bottom: 5px;
  }
  .uploadPhoto img{
    width: 100%;
    height: 100%;
  }
  .cameraBox {
    width:600px;
  }
</style>
