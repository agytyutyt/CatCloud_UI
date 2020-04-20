<template>
  <div>
    <el-form :model="renameForm" class="decorate" label-position="top" :rules="rules">
      <el-form-item label="旧文件名" :label-width="formLabelWidth">
        <el-input v-model="renameForm.oldName" autocomplete="off" style="font-weight: 900" disabled>
          <template slot="prepend">{{renameForm.currentDir}}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="新文件名" :label-width="formLabelWidth" prop="newName">
        <el-input v-model="renameForm.newName" autocomplete="off">
          <template slot="prepend">{{renameForm.currentDir}}</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="float: right">
      <el-button @click="switchDialog()">取 消</el-button>
      <el-button type="primary" @click="confirmRename()">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      switchDialog: function(){
        this.cancelFunc();
      },
      confirmRename: function () {
        let tmp_result=this.$store.dispatch("renameFile",{
          file: this.renameForm.oldName,
          newFile: this.renameForm.newName,
        });
        tmp_result.then(resolve=>{    //处理dispatch 返回的promise对象
          //promise为axios的promise对象
          resolve.promise.then(res=>{   //处理axios 返回的promise对象
            let code=res.data["code"];
            if(code==0){
              this.$message({
                message: '重命名成功！',
                type: 'success'
              });
              this.switchDialog();
            }
            else{
              this.$message.error('错误！请重试。');
            }
          })
          //loading为加载页面的处理对象
          resolve.loading.close();
        });
      }
    },
    computed: {
      stateCurrentDir(){
        return this.$store.getters.getCurrentDir;
      },
      getTargetFileName(){
        return this.dialogProps["fileName"];
      }
    },
    data() {
      return {
        renameForm: {
          oldName: this.getTargetFileName,
          newName: '',
          currentDir: ''
        },
        formLabelWidth: '120px',
        rules: {
          newName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
        }
      };
    },
    watch:{
      stateCurrentDir(val){
        this.renameForm.currentDir=val;
      }
    },
    props: ['cancelFunc','confirmFunc','dialogProps'],
    created() {
      // console.log(this.$parent.$parent.$parent.$parent.dialog_props);
      this.renameForm.currentDir=this.stateCurrentDir;
      this.renameForm.oldName=this.getTargetFileName;
    }
  }
</script>


<style scoped>
  .decorate{
    margin-top: 30px;
  }
</style>
