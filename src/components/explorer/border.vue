<template>
  <el-row class="border" type="flex" justify="start" :gutter="10">
    <el-col :span="4" >
      <el-button-group>
        <el-button type="primary" class="uploadButton" round><i class="el-icon-download"></i>下载</el-button>
        <el-button @click="this.function['uploadDialog']" type="primary" class="uploadButton" round><i class="el-icon-upload"></i>上传</el-button>
      </el-button-group>
    </el-col>

    <el-col :span="11" :offset="0">
      <div class="addressBar" @contextmenu>
<!--        <span style="float: left;line-height: 20px;margin-right: 20px;margin-left: 20px;">当前位置: </span>-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">-->
<!--          <el-breadcrumb-item class="my-breadcrumb" v-for="(item,index) in getRoute" :key="index" ><span @click="">{{item}}</span></el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->

          <el-input class="address" v-model="dirPath" placeholder="请输入路径" @keyup.enter.native="enterDir()"  style="height: 20px;">
            <template slot="prepend" style="height: 20px;">当前位置：</template>
            <el-button slot="append" icon="el-icon-top" class="el-button-goBackButton" @click="goBack" style="font-weight: 900; height: 20px;"></el-button>
          </el-input>
      </div>
    </el-col>

    <el-col :span="1" :offset="0">
      <el-button @click="refresh" icon="el-icon-refresh" class="uploadButton"></el-button>
    </el-col>

    <el-col :span="4" :offset="4">
      <el-form ref="form" :model="form">
        <el-input v-model="form.findFileName" placeholder="请输入文件名" class="searchInput" prefix-icon="el-icon-search"></el-input>
      </el-form>
    </el-col>
    <el-col :span="1" :offset="0">
      <el-button @click="searchFile" type="primary" icon="el-icon-search" style="height: 30px;width: 30px;margin-top: 5px;padding: 0 0;" circle></el-button>
    </el-col>
  </el-row>
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
        // this.$parent.$parent.$parent.goBack();
        this.$store.commit("lastDir");
        this.updateDir();
      },
      //更新要显示的文件夹信息
      updateDir: function () {
        this.$store.dispatch("updateLocalDir");
      },
      goBackTo: function(dirName) {
        this.$store.commit("lastDir",dirName);
      },
      enterDir(){
        this.$store.commit("gotoDir",this.dirPath);
        this.updateDir();
      },
      refresh: function(){
        this.$store.dispatch("refreshFileList");
      },
      searchFile: function () {
        if(this.form.findFileName===""){
          this.$message({
            type: "warning",
            message: "请输入要搜索的关键字"
          });
        }
        else{
          this.$parent.$parent.$parent.dialog_props["findFileName"]=this.form.findFileName;
          this.function["searchDialog"]();
        }
      }
    },
    data() {
      return {
        dirPath: "",
        form: {
          findFileName:""
        }
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
    props: ['function'],
    created() {
      this.dirPath=this.getRoute;
      if(this.dirPath==="") this.dirPath="/";
    }
  }
</script>

<style scoped>
  .border{
    border-bottom: 1px solid #e5e5e5;
    height: 40px;
    padding: 0 20px;
    margin: 0 0;
    background: linear-gradient(to top,#ebebeb,#ffffff);
    /*width: calc(100vw - 196px);*/
    width: 100%;
  }
  .el-button-group{
    width: 100%;
  }
  .uploadButton{
    height: 30px;
    margin: 5px 0;
  }
  .addressBar{
    margin-top: 5px;
  }
  .el-button {/*   别动*/
    padding: 0 15px;
    /*width: 50%;*/
  }
  .address>>>.el-input__inner{     /* 可用于覆盖 el-input 自带样式 el-input__inner */
    height: 30px;
    letter-spacing: 1px;
  }
  .el-button-goBackButton{
    font-size: 18px;
    border-radius: 0;
    margin: 0 auto;
  }
  .searchInput>>>.el-input__inner{
    height: 30px;
    margin: 5px 0;
  }
</style>

