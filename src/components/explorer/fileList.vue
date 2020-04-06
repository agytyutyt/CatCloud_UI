<template>
  <el-container>
    <el-header style="height: auto;padding: 0;">
      <border></border>
      <ToolBar></ToolBar>
    </el-header>

    <el-main>
      <template v-for="(item,index) in dir">
        <template v-if="item.isDir">
          <el-button :class="baseFileClass+' '+checkSelectedState(item)" @dblclick.native="enterFile(item.name)" @click="switchFileState(item)">
            <el-dropdown trigger="click"  class="dropdown-arrow">
              <i class="el-icon-arrow-down"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="file_text">{{item.name}}</div>
          </el-button>
        </template>
        <template v-else>
          <el-button class="el-icon-document file_icon" plain @dblclick.native="">
            <div class="file_text">{{item.name}}</div>
          </el-button>
        </template>
      </template>
    </el-main>
  </el-container>
</template>

<script>
  import border from "./border";
  import ToolBar from "./ToolBar";
  let time=null;
  export default {
    name: "fileList",
    methods: {
      checkSelectedState: function(item){
        if(item.selected==="true"){
          return 'el-button-focus';
        }
        else{
          return '';
        }
      },
      switchFileState: function (item) {
        clearTimeout(time);  //首先清除计时器
        time = setTimeout(() => {
          if(item.selected==="true"){
            item.selected="false";
          }
          else{
            item.selected="true";
          }
        }, 250);   //大概时间300ms
      },
      enterFile: function(dirName){
        clearTimeout(time);  //清除
        this.$store.commit("enterDir",dirName);
        //this.dir=this.getDir2;    //获取文件列表数据h
      },
      goBack: function () {
        this.$store.commit("lastDir");
      },
      updateDir(){
        let dirName=this.$store.state.currentDir;
        if(dirName==="" || dirName==="/"){
          return this.getDir1;
        }
        else{
          return this.getDir2;
        }
      }
    },
    computed:{
      getDir1() {
        return this.$store.state.dir1;
      },
      getDir2() {
        return this.$store.state.dir2;
      },
      getCurrentDir() {
        return this.$store.state.currentDir;
      }
    },
    watch: {
      getCurrentDir(val){
        this.dir=this.updateDir();
      }
    },
    data() {
      return{
        demo: "true",
        baseFileClass: "el-icon-folder-opened file_icon",
        selectedClass: "el-button-focus",
        selected: [],
        dir: "",
      }
    },
    components: {
      border,
      ToolBar
    },
    created: function () {
      this.dir=this.getDir1;
    }
  }
</script>

<style scoped>
.el-button {
  margin-top: 5px;
  margin-bottom: 5px;
}
.el-button-focus{
  background-color: #409EFF;
  color: #FFFFFF;
}
  .dropdown-arrow{
    position: absolute;
  }
  .el-header{
    padding: 0;
  }
</style>
