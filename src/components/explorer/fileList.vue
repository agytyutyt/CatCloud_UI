<template>
  <el-container>
    <el-header style="height: auto;padding: 0;">
      <border></border>
      <ToolBar></ToolBar>
    </el-header>

    <el-main>
      <template v-for="(item,index) in dir">
        <template v-if="true">
          <el-button :class="[item.isDir?'el-icon-folder-opened':'el-icon-document',item.selected?'el-button-focus':'','file_icon']" @dblclick.native="enterFile(item.name)" @click="switchFileState(item)">
            <el-dropdown trigger="click"  class="dropdown-arrow">
              <i class="el-icon-arrow-down"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" @click="">重命名</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit">重命名</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="file_text">
              {{item.name}}
              <el-input :v-model="item.name" :placeholder="item.name" style="position: absolute;width: 10%;"></el-input>
            </div>
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
      //转变文件图标为选中状态
      switchFileState: function (item) {
        clearTimeout(time);  //首先清除计时器
        time = setTimeout(() => {
          if(item.selected){
            item.selected=false;
          }
          else{
            item.selected=true;
          }
        }, this.timeOut);   //大概时间300ms
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
      },

    },
    computed:{
      //从 Vuex 获取当前路径
      getCurrentPath() {
        return this.$store.state.currentDir;
      },
      //从 Vuex 获取要展示的文件夹信息
      getCurrentDir(){
        return this.$store.state.dir;
      },
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
        timeOut: 100,
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
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
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
