<template>
  <el-container>
    <el-header style="height: auto;padding: 0;">
      <div @contextmenu.prevent>
        <border :function="borderFunc"></border>
        <ToolBar></ToolBar>
      </div>
    </el-header>

    <el-main>
      <el-scrollbar style="height: 100%;">
      <template v-if="listType">
        <template v-if="item.name[0]!=='.'" v-for="(item,index) in dir">
          <el-button :class="[item.isDir?'el-icon-folder-opened':'el-icon-document',item.selected?'el-button-focus':'','file_icon']" @dblclick.native="enterFile(item)" @click="switchFileState(item)">
            <el-dropdown trigger="click"  class="dropdown-arrow">
              <i class="el-icon-arrow-down"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-download" @click.native="download(item.name)" v-if="!item.isDir">下载</el-dropdown-item>
                <el-dropdown-item icon="el-icon-document-copy" @click.native="copyDialog(item.name)">复制</el-dropdown-item>
                <el-dropdown-item icon="el-icon-position" @click.native="moveDialog(item.name)">移动</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit" @click.native="renameDialog(item.name)">重命名</el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete" @click.native="deleteOption(item)">删除</el-dropdown-item>
                <el-dropdown-item icon="el-icon-warning-outline" @click.native="infoDialog(item.name)">属性</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="file_text">
              {{item.name}}
            </div>
          </el-button>
        </template>
      </template>
      <template v-else>
        <el-table
          :data="dir"
          @row-dblclick="enterFile"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="文件名">
          </el-table-column>
          <el-table-column
            prop="mdfTime"
            label="日期"
            width="200vw">
          </el-table-column>
          <el-table-column
            prop="size"
            label="大小"
            width="200vw">
          </el-table-column>
          <el-table-column
            prop="type"
            label="文件类型"
            width="100vw">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-dropdown trigger="click"  class="dropdown-arrow">
                <i class="el-icon-arrow-down"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-download" @click.native="download(dir[scope.$index].name)" v-if="!dir[scope.$index].isDir">下载</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-document-copy" @click.native="copyDialog(dir[scope.$index].name)">复制</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-position" @click.native="moveDialog(dir[scope.$index].name)">移动</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-edit" @click.native="renameDialog(dir[scope.$index].name)">重命名</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-delete" @click.native="deleteOption(dir[scope.$index])">删除</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-warning-outline" @click.native="infoDialog(dir[scope.$index].name)">属性</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </template>

<!--      弹窗-->
      <el-dialog :title="dialog_title" v-if="dialogVisible" @close="refresh()" :visible.sync="dialogVisible" width="" class="dialog dialog_header dialog_body dialog_close dialog_title" top="7vh" append-to-body destroy-on-close center>
        <div class="dialog_body_div">
          <component :is="currentDialog" :cancelFunc="switchDialog" :confirmFunc="renameFile" :dialogProps="dialog_props"></component>
        </div>
      </el-dialog>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
  import border from "./border";
  import ToolBar from "./ToolBar";
  import dropdown_rename from "./detailOption/ddown_rename";
  import dropdown_info from "./detailOption/ddown_info";
  import dropdown_new from "./detailOption/ddown_new";
  import uploadDialog from "./uploadDialog";
  import copyDialog from "./detailOption/ddown_copy";
  import ddown_mv from "./detailOption/ddown_mv";
  import searchDialog from "./detailOption/searchFile";
  // import { MessageBox } from 'element-ui';

  let time=null;
  export default {
    name: "fileList",
    methods: {
      switchListType: function(){
        this.listType=!this.listType;
      },
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
      enterFile: function(file){
        clearTimeout(time);  //清除
        if(file.isDir){
          this.$store.commit("enterDir",file.name);
          this.updateDir();
        }
        //this.dir=this.getDir2;    //获取文件列表数据h
      },
      //返回上一个文件夹
      goBack: function () {
        this.$store.commit("lastDir");
      },
      refresh: function(){
        this.$store.dispatch("refreshFileList");
      },
      switchDialog: function () {
        this.dialogVisible = !this.dialogVisible;
        if(this.dialogVisible==false){
          this.refresh();
        }
      },
      renameFile: function () {

      },
      deleteOption: function(item){
        this.$confirm("该操作将不可逆，是否继续？", '提示', {    //弹出提示框，确定是否删除
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning",
          center: true,

        }).then(() => {
          let tmp_result=this.$store.dispatch("deleteFile",{    //获取调用action后返回的promise对象
            name: item.name,
            type: item.isDir?"dir":"file"
          });
          tmp_result.then(resolve=>{    //处理dispatch 返回的promise对象
            //promise为axios的promise对象
            resolve.promise.then(res=>{   //处理 ajax 返回的promise对象
              let code=res.data["code"];    //获取状态码
              if(code==0){
                this.$message({   //提示删除成功
                  message: '删除成功！',
                  type: 'success'
                });
              }
              else{
                this.$message.error('错误！请重试。');   //提示失败
              }
            });
            //loading为加载页面的处理对象
            resolve.loading.close();
          });
          this.refresh();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      renameDialog: function (fileName) {
        this.dialog_props["fileName"]=fileName;
        this.currentDialog="dropdown_rename";
        this.dialog_title="重命名";
        this.switchDialog();
      },
      newFileDialog: function () {
        // this.dialog_props["fileName"]=fileName;
        this.dialog_title="新建";
        this.currentDialog="dropdown_new";
        this.switchDialog();
      },
      infoDialog: function (fileName) {
        this.dialog_props["fileName"]=fileName;
        this.currentDialog="dropdown_info";
        this.dialog_title="属性";
        this.switchDialog();
      },
      download: function (name) {
        let tmp_result=this.$store.dispatch("downloadFile",{
          name: name
        });
        tmp_result.then(resolve=>{    //处理dispatch 返回的promise对象
          //promise为axios的promise对象
          resolve.promise.then(res=>{   //处理axios 返回的promise对象
            // let code=;
            if(res.data["code"]===0){
              this.$message({
                message: '即将开始下载',
              });
              window.open(res.data["msg"], '_blank');
            }
            else{
              this.$message.error('错误！请重试。');
            }
          })
          //loading为加载页面的处理对象
          resolve.loading.close();
        });
      },
      uploadDialog: function () {
        this.dialog_title="上传";
        this.currentDialog="uploadDialog";
        this.switchDialog();
      },
      searchDialog: function (){
        this.dialog_title="搜索";
        this.currentDialog="searchDialog";
        this.switchDialog();
      },
      copyDialog: function (fileName) {
        this.dialog_props["fileName"]=fileName;
        this.dialog_title="复制到";
        this.currentDialog="copyDialog";
        this.switchDialog();
      },
      moveDialog: function (fileName) {
        this.dialog_props["fileName"]=fileName;
        this.dialog_title="移动到";
        this.currentDialog="ddown_mv";
        this.switchDialog();
      },
      testRowClick: function (row) {
        console.log(row);
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
        if(val!==""){
          this.dir=JSON.parse(val);
        }
      }
    },
    data() {
      return{
        listType: true,
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
        dialog_func: [],
        dialog_title: "",
        visible: false,
        borderFunc: {
          uploadDialog: this.uploadDialog,
          searchDialog: this.searchDialog
        }
      }
    },
    components: {
      border,
      ToolBar,
      dropdown_rename,
      dropdown_info,
      dropdown_new,
      uploadDialog,
      copyDialog,
      ddown_mv,
      searchDialog
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
