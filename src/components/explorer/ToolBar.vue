<template>
  <div>
  <el-row class="border" type="flex" justify="start">
    <el-col :span=1.5>
      <el-button @click="newFileDialog" class="elButton" style="width: auto;padding: 0 10px;" icon="el-icon-folder-add" round>
        新建
      </el-button>
    </el-col>
    <el-col :span=1.5>
      <el-button icon="el-icon-copy-document" class="elButton" style="width: auto;padding: 0 10px;" round>
        复制
      </el-button>
    </el-col>
    <el-col :span=1.5>
      <el-button icon="el-icon-delete" class="elButton" style="width: auto;padding: 0 10px;" round>
        删除
      </el-button>
    </el-col>
    <el-col :span=1.5>
      <el-button icon="el-icon-edit" class="elButton" style="width: auto;padding: 0 10px;" round>
        重命名
      </el-button>
    </el-col>
    <el-col>
      <el-switch
        v-model="listType"
        active-icon-class="el-icon-s-grid"
        inactive-icon-class="el-icon-s-fold"
        class="switchShowType">
      </el-switch>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  /**
   * 路径更新逻辑:
   * 1、渲染组件时通过vuex获取当前路径并进行初始化
   * 2、利用computed返回vuex中的路径值
   * 3、通过watch属性监听computed中相关返回值，当路径值变化时更新dirPath的值。
   */
  export default {
    name: "border",
    methods: {
      goBack: function () {
        this.$parent.$parent.$parent.goBack();
      },
      goBackTo: function(dirName) {
        this.$store.commit("lastDir",dirName);
      },
      enterDir(){
        this.$store.commit("gotoDir",this.dirPath);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      newFileDialog(){
        this.$parent.$parent.$parent.newFileDialog();
      }
    },
    data() {
      return {
        dirPath: "",
        form: {
          findFileName:""
        },
        activeName: 'second',
        listType: true,
        dialogVisible: false
      }
    },
    computed: {
      getRoute: function () {
        return this.$store.state.currentDir;
      },
    },
    watch: {
      getRoute(val){
        if(val==="") this.dirPath="/";
        else this.dirPath=val;
      }
    },
    created() {
      this.dirPath=this.getRoute;
      if(this.dirPath==="") this.dirPath="/";
    }
  }
</script>

<style scoped>
  .border{
    border-bottom: 1px solid #cbcbcb;
    height: 40px;
    padding: 0 20px;
    /*background: linear-gradient(to top,#fafafa,#ebebeb);*/
  }
  .elButton{
    height: 30px;
    margin: 5px 5px;
  }
  .addressBar{/*   别动*/
    margin-top: 5px;
  }
  .el-button {/*   别动*/
    padding: 0 0;
    width: 100%;
    border-color: #409EFF;
    color: #409EFF;
  }
  .address>>>.el-input__inner{     /* 可用于覆盖 el-input 自带样式 el-input__inner */
    height: 30px;
    letter-spacing: 1px;
  }
  .searchInput>>>.el-input__inner{  /* 可用于覆盖 el-input 自带样式 el-input__inner */
    height: 30px;
    margin: 5px 0;
  }
  .switchShowType{
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    float: right;
  }
</style>
