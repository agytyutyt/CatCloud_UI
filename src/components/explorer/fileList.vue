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
                <el-dropdown-item icon="el-icon-edit" @click.native="renameDialog(item.name)">重命名</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="file_text">
              {{item.name}}
            </div>
          </el-button>
        </template>
        <template v-else>
          <el-button class="el-icon-document file_icon" plain @dblclick.native="">
            <div class="file_text">{{item.name}}</div>
          </el-button>
        </template>
      </template>
<!--      弹窗-->
      <el-dialog title="重命名" v-if="dialogVisible" @close="refashion()" :visible.sync="dialogVisible" width="" class="dialog dialog_header dialog_body dialog_close dialog_title" top="7vh" append-to-body destroy-on-close center>
        <div class="dialog_body_div">
          <component :is="currentDialog" :cancelFunc="switchDialog" :confirmFunc="renameFile" :dialogProps="dialog_props"></component>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import border from "./border";
  import ToolBar from "./ToolBar";
  import dropdown_rename from "./detailOption/ddown_rename";
  import dropdown_info from "./detailOption/ddown_info";

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
      refashion: function(){
        console.log("刷新");
        this.updateDir();
        this.$forceUpdate()
      },
      switchDialog: function () {
        this.dialogVisible = this.dialogVisible?false:true;
        if(this.dialogVisible==false){
          this.refashion();
        }
      },
      renameFile: function () {

      },
      renameDialog: function (fileName) {
        this.dialog_props["fileName"]=fileName;
        this.switchDialog();
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
        dir: {},
        dialogVisible: false,
        currentDialog: "dropdown_rename",
        dialog_props: [],
      }
    },
    components: {
      border,
      ToolBar,
      dropdown_rename,
      dropdown_info
    },
    created() {
      // this.dir=;
      this.updateDir();
    }
  }
</script>

<style lang="css" scoped>
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
  .file_icon{
    font-size: 50px;
  }
  .file_text{
    margin-top: 10px;
    font-size: 15px;
  }
  .file_name_edit{
    position: absolute;
    width: 10%;
  }


  .dialog >>> .el-dialog{
    min-width: 600px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
  }
  .dialog_header >>> .el-dialog__header{
    border-bottom: 1px solid #dadada;
    padding: 5px 30px;
    background: linear-gradient(to top,#ededed,#ffffff);
    height: 35px;
  }
  .dialog_title >>> .el-dialog__title{
    font-size: 15px;
    letter-spacing: 2px;
    line-height: 30px;
  }
  .dialog_body >>> .el-dialog__body{   /*局部覆盖element_ui样式*/
    padding: 0 20px 20px;
    margin: 0 0;
    overflow: auto;
  }
  .dialog_close >>> .el-dialog__close{
    position: absolute;
    top: -10px;
    right: 0px;
    font-size: 20px;
  }
  .dialog_body_div{
    width: 100%;
    max-height: 70vh;
    border-top: 1px solid #FFFFFF;
    padding: 0px 0;
  }
</style>
