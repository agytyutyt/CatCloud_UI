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
      //检查选择状态
      checkSelectedState: function(item){
        if(item.selected==="true"){
          return 'el-button-focus';
        }
        else{
          return '';
        }
      },
      //转变文件图标为选中状态
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
      //更新要显示的文件夹信息
      updateDir: function () {
        this.$store.dispatch("updateLocalDir");
      },
      //进入某个文件夹
      enterFile: function(dirName){
        clearTimeout(time);  //清除
        this.$store.commit("enterDir",dirName);
        this.updateDir();
        //this.dir=this.getDir2;    //获取文件列表数据h
      },
      //返回上一个文件夹
      goBack: function () {
        this.$store.commit("lastDir");
      }
    },
    computed:{
      //从 Vuex 获取当前路径
      getCurrentPath() {
        return this.$store.state.currentDir;
      },
      //从 Vuex 获取要展示的文件夹信息
      getCurrentDir(){
        return this.$store.state.dir;
      }
    },
    watch: {
      //监听路径变化信息
      getCurrentPath(val){
      },
      //监听要展示的文件夹信息变化
      getCurrentDir(val){
        // console.log("getCurrentDir is changed:"+val);
        this.dir=JSON.parse(val);
      }
    },
    data() {
      return{
        demo: "true",
        baseFileClass: "el-icon-folder-opened file_icon",
        selectedClass: "el-button-focus",
        loading: true,
        selected: [],
        dir: {}
      }
    },
    components: {
      border,
      ToolBar
    },
    created() {
      // this.dir=;
      this.updateDir();
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
