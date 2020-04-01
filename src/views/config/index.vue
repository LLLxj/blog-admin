<template>
  <div class="app-container">
    <div class="x-form">
      <el-form width=100% v-loading="isLoading" element-loading-spinner="el-icon-loading" :model="dataForm"
               :rules="rules" ref="dataForm" label-width="130px"
               class="demo-addForm">
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存修改</el-button>
        </el-form-item>
        <el-form-item label="网站名称" prop="webName">
          <el-input v-model="dataForm.webName" placeholder="请输入网站名称"></el-input>
        </el-form-item>
        <el-form-item label="首页SEO标题" prop="title">
          <el-input v-model="dataForm.title" placeholder="请输入首页SEO标题"></el-input>
        </el-form-item>
        <el-form-item label="首页SEO关键字" prop="keywords">
          <el-input v-model="dataForm.keywords" placeholder="请输入首页SEO关键字"></el-input>
        </el-form-item>
        <el-form-item label="首页SEO描述" prop="description">
          <el-input v-model="dataForm.description" placeholder="请输入首页SEO描述"></el-input>
        </el-form-item>
        <el-form-item label="备案代码" prop="record">
          <el-input v-model="dataForm.record" placeholder="请输入备案代码" ></el-input>
        </el-form-item>
        <el-form-item label="版权信息" prop="copyright">
          <el-input v-model="dataForm.copyright" placeholder="请输入版权信息" ></el-input>
        </el-form-item>
        <el-form-item label="统计代码" prop="statistical">
          <el-input type="textarea" v-model="dataForm.statistical" placeholder="请输入统计代码" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="客服代码" prop="kefu">
          <el-input type="textarea" v-model="dataForm.kefu" placeholder="请输入客服代码" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" prop="phone">
          <el-input v-model="dataForm.phone" placeholder="请输入客服电话"></el-input>
        </el-form-item>
        <!--logo-->
        <el-form-item label="logo" prop="logo">
          <el-upload
            class="avatar-uploader"
            :action="GLOBAL.UPLOAD_URL"
            :show-file-list="false"
            :on-success="logoUpload"
            :before-upload="beforeAvatarUpload"
          >
            <el-image v-if="dataForm.logo" :src="GLOBAL.BASE_URL_HEAD + dataForm.logo" alt="logo" style="max-width: 400px;max-height: 400px;" lazy fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!--手机站logo-->
        <el-form-item label="手机站logo" prop="mLogo">
          <el-upload
            class="avatar-uploader"
            :action="GLOBAL.UPLOAD_URL"
            :show-file-list="false"
            :on-success="mLogoUpload"
            :before-upload="beforeAvatarUpload"
          >
            <el-image v-if="dataForm.mLogo" :src="GLOBAL.BASE_URL_HEAD + dataForm.mLogo" alt="logo" style="max-width: 400px;max-height: 400px;" lazy fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!--微信二维码图片-->
        <el-form-item label="微信二维码图片" prop="weiXin">
          <el-upload
            class="avatar-uploader"
            :action="GLOBAL.UPLOAD_URL"
            :show-file-list="false"
            :on-success="weiXinUpload"
            :before-upload="beforeAvatarUpload"
          >
            <el-image v-if="dataForm.weiXin" :src="GLOBAL.BASE_URL_HEAD + dataForm.weiXin" alt="logo" style="max-width: 200px;max-height: 200px;" lazy fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!--微博二维码图片-->
        <el-form-item label="微博二维码图片" prop="weiBo">
          <el-upload
            class="avatar-uploader"
            :action="GLOBAL.UPLOAD_URL"
            :show-file-list="false"
            :on-success="weiBoUpload"
            :before-upload="beforeAvatarUpload"
          >
            <el-image v-if="dataForm.weiBo" :src="GLOBAL.BASE_URL_HEAD + dataForm.weiBo" alt="logo" style="max-width: 200px;max-height: 200px;" lazy fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
  // import System from '@/api/system'

  export default {
    name: 'system-info',
    data() {
      return {
        submitbtnStatus: false,
        dataForm: {
          cId: '',
          webName: '',
          title: '',
          keywords: '',
          description: '',
          record: '',
          statistical: '',
          kefu: '',
          logo: '',
          mLogo: '',
          //版权信息
          copyright: '',
          // 客服电话
          phone: '',
          // 微信二维码图片
          weiXin: '',
          // 微博二维码图片
          weiBo: ''
        },
        editorOption: {},
        isLoading: false,
        // 表单验证规则
        rules: {
          webName: [{ required: true, message: '必填项', trigger: 'blur' }],
          title: [{ required: true, message: '必填项', trigger: 'blur' }],
          keywords: [{ required: true, message: '必填项', trigger: 'blur' }],
          description: [{ required: true, message: '必填项', trigger: 'blur' }],
          record: [{ required: true, message: '必填项', trigger: 'blur' }],
          statistical: [{ required: true, message: '必填项', trigger: 'blur' }],
          kefu: [{ required: true, message: '必填项', trigger: 'blur' }],
          logo: [{ required: true, message: '必填项', trigger: 'blur' }],
          mLogo: [{ required: true, message: '必填项', trigger: 'blur' }],
          phone: [{ required: true, message: '请填写客服电话', trigger: 'blur' }],
          weiXin: [{ required: true, message: '请上传微信二维码图片', trigger: 'blur' }],
          weiBo: [{ required: true, message: '请上传微博二维码图片', trigger: 'blur' }]
        }
      }
    },
    components: {
    },
    created() {
      this.getInfo()
    },
    computed: {
    },
    methods: {
      // 加载数据
      getInfo() {
        const _this = this
        System.info().then(res => {
          if (res.data && res.data.code === 0) {
            this.dataForm = res.data.data[0]
          } else {
            this.$message(res.data.msg)
          }
        }).catch(err => {
          if (err.response) {
            _this.$message.error(err.response.data.msg)
          } else if (err.request) {
            console.log(err.request)
          } else {
            console.log('Error', err.msg)
          }
        })
      },
      // 上传logo
      logoUpload(res) {
        this.dataForm.logo = res.data.file
      },
      mLogoUpload(res) {
        console.log(res)
        // this.dataForm.mLogo = res.data.mLogo
        this.dataForm.mLogo = res.data.file
      },
      // 上传微信
      weiXinUpload(res) {
        this.dataForm.weiXin = res.data.file
      },
      // 上传微博
      weiBoUpload(res) {
        this.dataForm.weiBo = res.data.file
      },
      // 上传图片 格式和大小校验
      beforeAvatarUpload(file) {
        const isImage = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isImage) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isImage && isLt2M
      },
      // 提交配置信息
      submitForm() {
        this.$confirm(`确定修改吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs['dataForm'].validate((valid) => {
            if (valid) {
              System.update(this.dataForm).then(res => {
                if (res.data && res.data.code === 0) {
                  this.$message({
                    message: '更新成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      // 修改成功后 重新加载当前页数据
                      this.getInfo()
                    }
                  })
                } else {
                  this.$message({ message: res.data.msg, type: 'error', duration: 1500 })
                }
              }).catch(err => { console.log(err) })
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "src/styles/common.scss";

  .show-images {
    width: 40%;
    margin-top: 30px;
  }

  .show-images img {
    width: 100%
  }
</style>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>

