<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="action"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :with-credentials='true'
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>
<script>
  import props from "../../properties"
  export default {
    data() {
      return {
        action: "",
        fileList:[]
      };
    },
    methods: {
      submitUpload() {
        // console.log(JSON.stringify(this.$children[0]._data.uploadFiles));

        let count=this.$children[0]._data.uploadFiles.length;
        this.$store.dispatch("uploadRequest",{
          count: count,
          size: 0
        }).then(res=>{
          this.action="http://"+props.props.baseIP+"/api/upload?badge="+res.data["badge"];
          console.log(res.data["badge"]);
        }).finally(()=>{
          this.$refs.upload.submit();
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      submitChange(){
        this.$refs.upload.submit();
      }
    },
    computed:{
      getAction(){
        return this.action;
      }
    }
  }
</script>
