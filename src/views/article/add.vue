<template>
  <div class="app-container">
    <div>
      <el-form v-loading="isLoading" element-loading-spinner="el-icon-loading" :model="dataForm" :rules="rules" label-width="130px" ref="dataForm" class="demo-addForm" >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="标题" prop="title">
              <el-input v-model="dataForm.title" maxlength="255" placeholder="请输入文章名称" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!--文章栏目名称-->
            <el-form-item label="栏目" prop="cId">
              <parentColomn v-model="dataForm.cId" :showHead="false" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!--文章栏目名称-->
            <el-form-item label="所属分类" prop="categoryId">
              <categorySelect v-model="dataForm.categoryId" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <!--是否推荐(1是，0否)，首页尾部三个图文-->
          <el-col :span="6">
            <el-form-item label="推荐" prop="isHot">
              <el-radio-group v-model="dataForm.isHot">
                <el-radio-button :label="0">正常</el-radio-button>
                <el-radio-button :label="1">推荐</el-radio-button>
              </el-radio-group>
              <i class="el-icon-info" title="推荐：首页尾部三个图文"></i>
            </el-form-item>
          </el-col>

          <!--是否热门(1是，0否)，文章列表、文章详情热门推荐-->
          <el-col :span="6">
            <el-form-item label="热门" prop="isHeat">
              <el-radio-group v-model="dataForm.isHeat">
                <el-radio-button :label="0">正常</el-radio-button>
                <el-radio-button :label="1">热门</el-radio-button>
              </el-radio-group>
              <i class="el-icon-info" title="热门：文章列表、文章详情热门推荐"></i>
            </el-form-item>
          </el-col>

          <!--是否头条(1是，0否)，首页尾部三个图文下方文章-->
          <el-col :span="6">
            <el-form-item label="头条" prop="isHead">
              <el-radio-group v-model="dataForm.isHead">
                <el-radio-button :label="0">正常</el-radio-button>
                <el-radio-button :label="1">头条</el-radio-button>
              </el-radio-group>
              <i class="el-icon-info" title="头条：首页尾部三个图文下方文章"></i>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="状态" prop="state">
              <el-radio-group v-model="dataForm.state">
                <el-radio-button :label="0">隐藏</el-radio-button>
                <el-radio-button :label="1">显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="序号" prop="sorting">
              <el-input-number v-model="dataForm.sorting" class="box-input" :min="0"  :max="999" controls-position="right" />
            </el-form-item>
          </el-col>
        </el-row>

        <!--      <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="url" prop="url">
              <el-input type="textarea" autosize v-model="dataForm.url" maxlength="255" placeholder="请输入文章url"/>
            </el-form-item>
          </el-col>
        </el-row>-->

        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="SEO关键词" prop="keywords">
              <el-input
                type="textarea"
                autosize
                v-model="dataForm.keywords"
                maxlength="100"
                placeholder="请输入文章SEO标题"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="SEO描述" prop="description">
              <el-input
                type="textarea"
                autosize
                v-model="dataForm.description"
                maxlength="100"
                placeholder="请输入文章SEO关键词"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!--单图片-->
        <el-row :gutter="20">
          <!-- <el-col :span="18">
            <el-form-item label="缩略图" prop="pic">
              <el-upload
                class="avatar-uploader"
                :action="GLOBAL.UPLOAD_URL"
                :show-file-list="false"
                :on-success="picUploadSuccess"
                :before-upload="beforeAvatarUpload">
                <el-image v-if="dataForm.pic"  :src="GLOBAL.BASE_URL_HEAD + dataForm.pic" alt="缩略图" lazy style="max-height: 400px;max-width: 400px;">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>-->
          <el-col :span="10">
            <el-form-item label="缩略图" prop="pic">
              <el-upload
                class="upload-demo"
                v-model="dataForm.pic"
                drag
                :show-file-list="false"
                :action="GLOBAL.UPLOAD_URL"
                multiple
                :on-success="picUploadSuccess"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div class="show-images">
              <img :src="this.dataForm.pic" alt />
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="内容" prop="body">
              <quill-editor
                v-model="dataForm.body"
                ref="myQuillEditor"
                class="editer"
                :options="editorOption"
                @ready="onEditorReady($event)"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item>
              <el-button type="primary" @click="submitForm()"  v-if="addVisible" icon="el-icon-edit" >保存</el-button>
              <el-button type="primary" @click="submitForm()" v-else icon="el-icon-edit">修改</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Article from "@/api/article";
import { quillEditor } from "vue-quill-editor";
import parentColomn from "@/common-select/select-parent-column";
import categorySelect from "@/common-select/select-category";

export default {
  name: "article-add",
  data() {
    return {
      addVisible: true,
      defaultMSG: null,
      t1: 1,
      t2: 0,
      dataForm: {
        aId: '',
        title: "",
        // url: '',
        keywords: "",
        description: "",
        cId: "",
        pic: "",
        state: 1,
        isHot: 1,
        isHeat: 0,
        isHead: 0,
        sorting: 1,
        body: "",
        categoryId: ''
      },
      editorOption: {},
      config: {
        initialFrameHeight: 500
      },
      isLoading: false,
      // 表单验证规则
      rules: {
        title: [{ required: true, message: "标题不能为空！", trigger: "blur" }],
        state: [{ required: true, message: "状态不能为空！", trigger: "blur" }],
        sorting: [
          { required: true, message: "排序不能为空！", trigger: "blur" }
        ],
        isHot: [{ required: true, message: "推荐不能为空！", trigger: "blur" }],
        isHeat: [
          { required: true, message: "热门不能为空！", trigger: "blur" }
        ],
        isHead: [
          { required: true, message: "头条不能为空！", trigger: "blur" }
        ],
        // url: [{ required: true, message: 'URL不能为空！', trigger: 'blur' }],
        // keywords: [{ required: true, message: 'SEO关键词不能为空！', trigger: 'blur' }],
        // description: [{ required: true, message: 'SEO描述不能为空！', trigger: 'blur' }],
        cId: [{ required: true, message: "栏目Id不能为空！", trigger: "blur" }]
      }
    };
  },
  components: {
    quillEditor,
    parentColomn,
    categorySelect
  },
  created() {
    // 判断是新增还是修改
    const rowData = this.$route.query.aId || 0;
    if (rowData) {
      this.addVisible = false;
    } else {
      this.addVisible = true;
    }
    // this.resetDataForm()
    this.$nextTick(() => {
      this.$refs["dataForm"].resetFields();
    });
    this.setData(rowData);
    // this.getInfo()
  },
  
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    resetDataForm() {
      this.$refs["dataForm"].resetFields();
      // this.dataForm = {
      //   title: '',
      //   // url: '',
      //   keywords: '',
      //   description: '',
      //   cId: '',
      //   pic: '',
      //   state: 1,
      //   isHot: 0,
      //   sorting: 1,
      //   body: ''
      // }
    },
    setData(data) {
      const mythis = this;
      if (data !== 0) {
        Article.info(data).then(({data}) => {
          let {code, msg, result} = data
          if (code === 0) {
            this.dataForm = result
          } else {
            this.$message(msg);
          }
        }).catch(err => {
          if (err.response) {
            mythis.$message.error(err.response.data.msg);
          } else {
            console.log("Error", err.msg);
          }
        });
      }
    },
    onEditorReady(editor) {},
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    submitForm() {
      this.dataForm.body = this.escapeStringHTML(this.dataForm.body)
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.addVisible) {
            // 新增
            console.log(this.dataForm)
            Article.save(this.dataForm)
              .then(res => {
                if (res.data && res.data.code === 0) {
                  this.$message({
                    message: "新增成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                      this.$router.push({
                        name: "articleList"
                      });
                    }
                  });
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error",
                    duration: 1500
                  });
                }
              })
              .catch(err => {
                console.log(err);
                this.$message({ message: err, type: "error", duration: 1500 });
              });
          } else {
            Article.update(this.dataForm)
              .then(res => {
                if (res.data && res.data.code === 0) {
                  this.$message({
                    message: "更新成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                      this.$router.push({
                        name: "articleList"
                      });
                    }
                  });
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error",
                    duration: 1500
                  });
                }
              })
              .catch(err => {
                if (err.response) {
                  mythis.$message.error(err.response.data.msg);
                } else if (err.request) {
                  // 发送请求但是没有响应返回
                  console.log(err.request);
                } else {
                  console.log("Error", err.msg);
                }
              });
          }
        }
      });
    },
    // 缩略图上传 成功回调
    picUploadSuccess(res, file) {
      if (res.data && res.code === 0) {
        this.dataForm.pic = res.data.resource;
      } else {
        this.$message(res.data.msg);
      }
    },
    // 上传图片 格式和大小校验
    beforeAvatarUpload(file) {
      const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/styles/common.scss";

.show-images {
  width: 80%;
  // margin-top: 30px;
}

.show-images img {
  width: 100%;
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
  border-color: #409eff;
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

