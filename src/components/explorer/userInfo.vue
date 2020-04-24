<template>
<!--  <el-table :data="gridData">-->
<!--    <el-table-column width="150" property="date" label="日期"></el-table-column>-->
<!--    <el-table-column width="100" property="name" label="姓名"></el-table-column>-->
<!--    <el-table-column width="300" property="address" label="地址"></el-table-column>-->
<!--  </el-table>-->

  <div style="max-height: 600px;overflow: hidden;">
    <el-scrollbar class="my-scrollbar" style="height:100%;width: 100%">
      <div style="max-height:600px;" >
<!--        用户信息-->
        <el-card class="box-card my-cardHeader my-cardBody">
          <div slot="header" class="">
            <span class="title_font">{{getUserName}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">登出</el-button>
          </div>
          <el-button @click="changePwd" style="margin: 0 auto;">修改密码</el-button>
          <el-button style="margin: 0 auto;">设置</el-button>
        </el-card>
<!--        磁盘信息-->
        <el-card class="box-card my-cardHeader my-cardBody" >
          <div slot="header" class="" style="margin-left: 5px;margin-right: 5px;">
            <span>磁盘信息</span>
          </div>
          <el-card v-for="(disk,index) in disks" :key="index" shadow="hover" class="box-card">
            <el-row>
              <el-col :span="2" :offset="1" style="line-height: 31px;">挂载</el-col>
              <el-col :span="20" style="line-height: 31px;">
                <span>{{disk["mountPoint"]}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22" :offset="1">
                <el-progress class="progressBar" :text-inside="true" :stroke-width="20" :percentage="parseInt(disk['usedPercent'])" :color="customColors"></el-progress>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="1" style="line-height: 31px;">用量：</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" :offset="2">大小：</el-col>
              <el-col :span="18">{{disk["block"]}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" :offset="2">可用：</el-col>
              <el-col :span="18">{{disk["available"]}}</el-col>
            </el-row>
          </el-card>
<!--          <el-row >-->
<!--           -->
<!--          </el-row>-->
        </el-card>
      </div>
    </el-scrollbar>

    <el-dialog :title="dialog_title" v-if="dialogVisible" @close="" :visible.sync="dialogVisible" width="" class="dialog dialog_header dialog_body dialog_close dialog_title" top="7vh" append-to-body destroy-on-close center>
      <div class="dialog_body_div">
        <component :is="currentDialog" :cancelFunc="switchDialog" confirmFunc="" :dialogProps="dialog_props"></component>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import changePwd from "./systemOption/more_changePwd"

  export default {
    data() {
      return {
        disks:[],
        customColors: [
          {color: 'rgb(19, 206, 102)', percentage: 25},
          {color: '#1989fa', percentage: 50},
          {color: '#e6a23c', percentage: 75},
          {color: '#ff0000', percentage: 100}
        ],
        dialogVisible: false,
        currentDialog: "",
        dialog_props: [],
        dialog_func: [],
        dialog_title: "",
        visible: false,
      };
    },
    methods: {
      switchDialog: function () {
        this.dialogVisible = !this.dialogVisible;
      },
      refresh: function(){
        this.$store.dispatch("refreshFileList");
      },
      changePwd: function () {
        // this.dialog_props["fileName"]=fileName;
        this.currentDialog="changePwd";
        this.dialog_title="修改密码";
        this.switchDialog();
      }
    },
    computed: {
      getUserName() {
        return this.$store.getters.getUserName;
      }
    },
    created() {
      let tmp_result=this.$store.dispatch("getDiskInfo");
      tmp_result.then(res=>{
        if(res.data["staCode"]===0){
          this.disks=res.data["disks"];
        }
      })
    },
    components:{
      changePwd
    }
  }
</script>

<style scoped>
  .my-scrollbar >>> .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .progressBar{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  /*.clearfix:before,*/
  /*.clearfix:after {*/
  /*  display: table;*/
  /*  content: "";*/
  /*}*/
  /*.clearfix:after {*/
  /*  clear: both*/
  /*}*/

  .my-cardHeader >>> .el-card__header{
    height: 50px;
  }
  .my-cardBody >>> .el-card__body{
    padding: 10px;
    margin: 15px;
  }

  .box-card {
    margin: 10px 10px;
  }

  .title_font{
    font-size: 25px;
    line-height: 10px;
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
