import request from '@/utils/request'
import { getToken, removeToken } from '@/utils/auth'
import ElementUI from 'element-ui';

const baseUrl = '/apiPro'
var token = getToken()
/*富文本编辑图片上传配置*/
const uploadConfig = {
  action:  `${baseUrl}/category/uploadCategoryBac`,  // 必填参数 图片上传地址
  methods: 'POST',  // 必填参数 图片上传方式
  token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: 'upfile',  // 必填参数 文件的参数名
  size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'  // 可选 可上传的图片格式
};

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{'header': 1}, {'header': 2}],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],
  [{'indent': '-1'}, {'indent': '+1'}],
  [{'direction': 'rtl'}],
  [{'size': ['small', false, 'large', 'huge']}],
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'color': []}, {'background': []}],
  [{'font': []}],
  [{'align': []}],
  ['clean'],
  ['link', 'image', 'video'],
  ['sourceEditor'] 
];
const handlers = {
  image: function image() {
      var self = this;

      var fileInput = this.container.querySelector('input.ql-image[type=file]');
      if (fileInput === null) {
          fileInput = document.createElement('input');
          fileInput.setAttribute('type', 'file');
          // 设置图片参数名
          if (uploadConfig.name) {
              fileInput.setAttribute('name', uploadConfig.name);
          }
          
          // 可设置上传图片的格式
          fileInput.setAttribute('accept', uploadConfig.accept);
          fileInput.classList.add('ql-image');
          // 监听选择文件
          fileInput.addEventListener('change', function () {
              // 创建formData
              var formData = new FormData();
              formData.append(uploadConfig.name, fileInput.files[0]);
              formData.append('object','product');
              // 如果需要token且存在token
              if (uploadConfig.token) {
                  formData.append('token', uploadConfig.token)
              }
              // 图片上传
              var xhr = new XMLHttpRequest();
              xhr.open(uploadConfig.methods, uploadConfig.action, true);
              xhr.setRequestHeader("token", token);
              // 上传数据成功，会触发
              xhr.onload = function (e) {
                  if (xhr.status === 200) {
                      var res = JSON.parse(xhr.responseText);
                      let length = self.quill.getSelection(true).index;
                      //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。  
                      console.log(res)
                      self.quill.insertEmbed(length, 'image', res.data.resource);
                      self.quill.setSelection(length + 1)
                  }
                  fileInput.value = ''
              };
              // 开始上传数据
              xhr.upload.onloadstart = function (e) {
                  fileInput.value = ''
              };
              // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
              xhr.upload.onerror = function (e) {
              };
              // 上传数据完成（成功或者失败）时会触发
              xhr.upload.onloadend = function (e) {
                  // console.log('上传结束')
              };
              xhr.send(formData)
          });
          this.container.appendChild(fileInput);
      }
      fileInput.click();
  },
  sourceEditor: function() {
    const reg = /\<br\>/g,
      container = this.container,
      firstChild = container.nextElementSibling.firstChild;
      console.log(firstChild)
    if(!this.shadeBox){
      let shadeBox = this.shadeBox = document.createElement('div');
      shadeBox.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); cursor:pointer';
      container.style.position  = 'relative';
      shadeBox.addEventListener('click',function(){

        this.style.display = 'none';
        firstChild.innerHTML = firstChild.innerText.trim();
      },false);
      container.appendChild(shadeBox);
      let innerHTML = firstChild.innerHTML;
      innerHTML = innerHTML.replace(reg,'');
      firstChild.innerText = innerHTML;
    }else {
      let innerHTML = firstChild.innerHTML;
      innerHTML = innerHTML.replace(reg,'');
      firstChild.innerText = innerHTML;
      this.shadeBox.style.display = 'block';
    }
  }
};

export default {
  placeholder: '',
  theme: 'snow',  // 主题
  modules: {
    toolbar: {
        container: toolOptions,  // 工具栏选项
        handlers: handlers  // 事件重写
    }

  },
  initButton: function() {
    const sourceEditorButton = document.querySelector('.ql-sourceEditor');
    sourceEditorButton.style.cssText = "width:80px; border:1px solid #ccc; border-radius:5px;";
    sourceEditorButton.innerText="源码编辑";
  },
  register(q){
    //注册标签(因为在富文本编辑器中是没有div,table等标签的，需要自己去注册自己需要的标签)
    class div extends q.import('blots/block/embed') {}
    class table extends q.import('blots/block/embed') {}
    class tr extends q.import('blots/block/embed') {}
    class td extends q.import('blots/block/embed') {}
    class section extends q.import('blots/block/embed') {}
    class span extends q.import('blots/block/embed') {}
    div.blotName =div.tagName='div';
    table.blotName =table.tagName='table';
    tr.blotName =tr.tagName='tr';
    td.blotName =td.tagName='td';
    td.blotName =td.tagName='section';
    td.blotName =td.tagName='span';
    q.register(div);
    q.register(table);
    q.register(tr);
    q.register(td);
    q.register(section);
    q.register(span);
  }
}