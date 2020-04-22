<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="'http://localhost:8080/api/upload?'+badge"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    <router-link to="/"></router-link>
  </el-upload>
</template>
<script>
  export default {
    data() {
      return {
        fileList: [],
        badge:""
      };
    },
    methods: {
      submitUpload() {
        this.$store.dispatch("test",{})
          .then(res=>{
          this.badge="badge=111111111111";
          // console.log(this.$refs.upload);

        }).finally(()=>{
          this.$refs.upload.submit();
        });
        // this.badge="asdasda";
        // this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
