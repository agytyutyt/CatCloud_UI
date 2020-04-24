<template>
  <div style="margin-top: 20px;">
    <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input type="password" v-model="pwdForm.oldPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="pwdForm.newPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input type="password" v-model="pwdForm.confirmPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitBtn()">提交</el-button>
        <el-button @click="">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import service from "../../../utils/axios";
  import qs from 'qs';
  export default {
    methods: {
      switchDialog: function(){
        this.cancelFunc();
      },
      checkOldPwd: function () {
        return service.post("/api/checkOldPwd",qs.stringify({oldPwd:this.pwdForm.oldPwd}))
      },
      submitBtn: function () {
        this.$refs["pwdForm"].validate((valid) => {
          if (valid) {
            this.confirmChangePwd();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      confirmChangePwd: function () {
        let data={
          oldPwd: this.pwdForm.oldPwd,
          newPwd: this.pwdForm.newPwd
        };
        data=qs.stringify(data);
        service.post("/api/changePwd",data).then(res=>{
          this.$message({
            message: res.data["message"],
            type: res.data["type"]
          });
          this.switchDialog();
        })
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
      let validate_oldPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      let validate_newPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.pwdForm.newPwd !== '') {
            this.$refs.pwdForm.validateField('confirmPwd');
          }
          callback();
        }
      };
      let validate_confirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pwdForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        pwdForm: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        },
        formLabelWidth: '120px',
        rules: {
          oldPwd:[
            { validator: validate_oldPwd, trigger: 'blur'}
          ],
          newPwd: [
            { validator: validate_newPwd, trigger: 'blur' }
          ],
          confirmPwd: [
            { validator: validate_confirmPwd, trigger: 'blur' }
          ]
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
    }
  }
</script>

<style scoped>
  .decorate{
    margin-top: 30px;
  }
</style>
