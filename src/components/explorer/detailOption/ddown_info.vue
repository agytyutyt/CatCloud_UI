<template>
  <div  style="margin-top: 30px;">
    <el-form ref="form" :model="form" label-width="auto" gutter="20">
      <el-row>
        <el-col :span="18">
          <el-form-item label="文件名">
            <el-input v-model="form.name" :disabled="!editState.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button @click="changeEditState('name')" v-if="!editState.name" type="text">修改</el-button>
          <el-button @click="submitEdit('name')" v-if="editState.name" type="primary">提交</el-button>
          <el-button @click="cancelEdit('name')" v-if="editState.name" type="primary">取消</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18">
        <el-form-item label="拥有者">
          <el-input v-model="form.owner" :disabled="!editState.owner"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button @click="changeEditState('owner')" v-if="!editState.owner" type="text">修改</el-button>
          <el-button @click="submitEdit('owner')" v-if="editState.owner" type="primary">提交</el-button>
          <el-button @click="cancelEdit('owner')" v-if="editState.owner" type="primary">取消</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18">
        <el-form-item label="用户组">
          <el-input v-model="form.group" :disabled="!editState.group"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button @click="changeEditState('group')" v-if="!editState.group" type="text">修改</el-button>
          <el-button @click="submitEdit('group')" v-if="editState.group" type="primary">提交</el-button>
          <el-button @click="cancelEdit('group')" v-if="editState.group" type="primary">取消</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18">
        <el-form-item label="最后修改时间">
          <el-input v-model="form.recentTime" disabled></el-input>
        </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18">
        <el-form-item label="权限">
        </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button @click="changeEditState('pri')" v-if="!editState.pri" type="text">修改</el-button>
          <el-button @click="submitEdit('pri')" v-if="editState.pri" type="primary">提交</el-button>
          <el-button @click="cancelEdit('pri')" v-if="editState.pri" type="primary">取消</el-button>
        </el-col>
      </el-row>
      <el-form-item label="拥有者">
        <el-checkbox-group v-model="form.ownerPri" :disabled="!editState.pri">
          <el-checkbox label="r">读</el-checkbox>
          <el-checkbox label="w">写</el-checkbox>
          <el-checkbox label="x">执行</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="所属组">
        <el-checkbox-group v-model="form.groupPri" :disabled="!editState.pri">
        <el-checkbox label="r" >读</el-checkbox>
        <el-checkbox label="w" >写</el-checkbox>
        <el-checkbox label="x">执行</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="其他">
        <el-checkbox-group v-model="form.otherPri" :disabled="!editState.pri">
          <el-checkbox label="r">读</el-checkbox>
          <el-checkbox label="w">写</el-checkbox>
          <el-checkbox label="x">执行</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="cancelFunc">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import com_utils from "../../../utils/common"
  export default {
    data() {
      return {
        form: {
          name: '',
          owner: '',
          group: '',
          recentTime: '',
          ownerPri: [],
          groupPri: [],
          otherPri: [],
        },
        oldForm: {
          name: '',
          owner: '',
          group: '',
          recentTime: '',
          ownerPri: [],
          groupPri: [],
          otherPri: [],
        },
        editState: {
          name: false,
          owner: false,
          group: false,
          recentTime: false,
          pri: false
        },
        loadingState: {
          name: false,
          owner: false,
          group: false,
          recentTime: false,
          pri: false
        }
      }
    },
    methods: {
      onSubmit() {

      },
      switchDialog: function(){
        this.cancelFunc();
      },
      isEdited(){
        if(this.oldForm.name!==this.form.name) return true;
        if(this.oldForm.owner!==this.form.owner) return true;
        if(this.oldForm.group!==this.form.group) return true;
        if(this.oldForm.recentTime!==this.form.recentTime) return true;
        if(this.oldForm.ownerPri!==this.form.ownerPri) return true;
        if(this.oldForm.groupPri!==this.form.groupPri) return true;
        if(this.oldForm.otherPri!==this.form.otherPri) return true;
        return false;
      },
      changeEditState(type){
        this.editState[type]=!this.editState[type];
      },
      submitEdit(type){
        // let value=type==="pri"?com_utils.priTransToCode(this.form["owner"]+this.form["group"]+this.form["other"]):this.form[type];
        let value=this.form[type];
        if(type==="pri"){
          value=com_utils.priTransToCode({
            owner: this.form["ownerPri"],
            group: this.form["groupPri"],
            other: this.form["otherPri"]
          });
        }
        let tmp_result=this.$store.dispatch("editInfo",{
          type: type,
          value: value,
          file: this.dialogProps["fileName"]
        });
        tmp_result.then(resolve=>{    //处理dispatch 返回的promise对象
          //promise为axios的promise对象
          resolve.promise.then(res=>{   //处理axios 返回的promise对象
            let code=res.data["code"];
            if(code==0){
              this.$message({
                message: '修改成功！',
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
      },
      cancelEdit(type){
        switch (type) {
          case "pri": {
            console.log("pri");
            this.form["ownerPri"]=this.oldForm["ownerPri"];
            this.form["groupPri"]=this.oldForm["groupPri"];
            this.form["otherPri"]=this.oldForm["otherPri"];
            break;
          }
          default: {
            console.log( this.form[type]);
            this.form[type]=this.oldForm[type];
            break;
          }
        }
        this.changeEditState(type);
      }
    },
    props: ['cancelFunc','confirmFunc','dialogProps'],
    created() {
      let tmp_result=this.$store.dispatch("fileInfo",{
        name:this.dialogProps["fileName"]
      });
      tmp_result.then(resolve=>{    //处理dispatch 返回的promise对象
        //promise为axios的promise对象
        resolve.promise.then(res=>{   //处理axios 返回的promise对象
          console.log(res.data);
          this.form.name=this.dialogProps["fileName"];
          this.form.owner=res.data["owner"];
          this.form.group=res.data["group"];
          this.form.recentTime=res.data["recentTime"];
          let pri_tmp=com_utils.priAnalysis(res.data["privilege"])
          this.form.ownerPri=pri_tmp["owner"];
          this.form.groupPri=pri_tmp["group"];
          this.form.otherPri=pri_tmp["other"];

          this.oldForm.name=this.form.name;
          this.oldForm.owner=this.form.owner;
          this.oldForm.group=this.form.group;
          this.oldForm.recentTime=this.form.recentTime;
          this.oldForm.ownerPri=this.form.ownerPri;
          this.oldForm.groupPri=this.form.groupPri;
          this.oldForm.otherPri=this.form.otherPri;

        });

        //loading为加载页面的处理对象
        resolve.loading.close();
      });
    },
  }
</script>
