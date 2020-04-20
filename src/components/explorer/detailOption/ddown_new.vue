<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="文件夹" name="dir">
        <el-form label-position="top" label-width="80px" :model="formDir">
          <el-form-item label="名称">
            <el-input v-model="formDir.name">
              <template slot="prepend">{{currentDir}}</template>
            </el-input>
          </el-form-item>
          <el-form-item label="拥有者">
            <el-checkbox-group v-model="pri.owner">
              <el-checkbox label="r">读</el-checkbox>
              <el-checkbox label="w">写</el-checkbox>
              <el-checkbox label="x">执行</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="所属组">
            <el-checkbox-group v-model="pri.group">
              <el-checkbox label="r" >读</el-checkbox>
              <el-checkbox label="w" >写</el-checkbox>
              <el-checkbox label="x">执行</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="其他">
            <el-checkbox-group v-model="pri.other">
              <el-checkbox label="r">读</el-checkbox>
              <el-checkbox label="w">写</el-checkbox>
              <el-checkbox label="x">执行</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="文件" name="file">
        <el-form label-position="top" label-width="80px" :model="formDir">
          <el-form-item label="名称">
            <el-input v-model="formDir.name">
              <template slot="prepend">{{currentDir}}</template>
            </el-input>
          </el-form-item>
          <el-form-item label="拥有者">
            <el-checkbox-group v-model="pri.owner">
              <el-checkbox label="r">读</el-checkbox>
              <el-checkbox label="w">写</el-checkbox>
              <el-checkbox label="x">执行</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="所属组">
            <el-checkbox-group v-model="pri.group">
              <el-checkbox label="r" >读</el-checkbox>
              <el-checkbox label="w" >写</el-checkbox>
              <el-checkbox label="x">执行</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="其他">
            <el-checkbox-group v-model="pri.other">
              <el-checkbox label="r">读</el-checkbox>
              <el-checkbox label="w">写</el-checkbox>
              <el-checkbox label="x">执行</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" style="float: right">
      <el-button @click="switchDialog()">取 消</el-button>
      <el-button type="primary" @click="confirmNew">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import com_utils from "../../../utils/common";
  export default {
    methods: {
      handleClick(tab, event) {

      },
      switchDialog: function(){
        this.cancelFunc();
      },
      confirmNew: function () {
        let pri=com_utils.priTransToCode(this.pri);
        let tmp_result=this.$store.dispatch("newFile",{
          name: this.formDir.name,
          type: this.activeName,
          pri: pri
        });
        tmp_result.then(resolve=>{    //处理dispatch 返回的promise对象
          //promise为axios的promise对象
          resolve.promise.then(res=>{   //处理axios 返回的promise对象
            let code=res.data["code"];
            if(code==0){
              this.$message({
                message: '新建成功！',
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

    },
    data() {
      return {
        activeName: 'dir',
        currentDir:"",
        formDir:{
          name: ""
        },
        formFile:{
          name: ""
        },
        pri:{
          owner:[],
          group:[],
          other:[]
        }
      };
    },
    watch:{

    },
    props: ['cancelFunc','confirmFunc','dialogProps'],
    created() {
      this.currentDir=this.$store.getters.getCurrentDir;
    }
  }
</script>


<style scoped>

</style>
