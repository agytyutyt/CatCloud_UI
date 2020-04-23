<template>
<!--  <el-table :data="gridData">-->
<!--    <el-table-column width="150" property="date" label="日期"></el-table-column>-->
<!--    <el-table-column width="100" property="name" label="姓名"></el-table-column>-->
<!--    <el-table-column width="300" property="address" label="地址"></el-table-column>-->
<!--  </el-table>-->

  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>磁盘信息</span>
      </div>
      <el-row v-for="(disk,index) in disks" :key="index">
        <el-row>
          <el-col :span="2" :offset="1">挂载:</el-col>
          <el-col :span="20">
            <span>{{disk["mountPoint"]}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="1" style="line-height: 31px;">用量:</el-col>
          <el-col :span="20">
            <el-progress class="progressBar" :text-inside="true" :stroke-width="20" :percentage="parseInt(disk['usedPercent'])" :color="customColors"></el-progress>
          </el-col>
        </el-row>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>磁盘信息</span>
      </div>
      <el-row v-for="(disk,index) in disks" :key="index">
        <el-row>
          <el-col :span="2" :offset="1">挂载:</el-col>
          <el-col :span="20">
            <span>{{disk["mountPoint"]}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="1" style="line-height: 31px;">用量:</el-col>
          <el-col :span="20">
            <el-progress class="progressBar" :text-inside="true" :stroke-width="20" :percentage="parseInt(disk['usedPercent'])" :color="customColors"></el-progress>
          </el-col>
        </el-row>
      </el-row>
    </el-card>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        disks:[],
        customColors: [
          {color: 'rgb(19, 206, 102)', percentage: 25},
          {color: '#1989fa', percentage: 50},
          {color: '#e6a23c', percentage: 75},
          {color: '#ff0000', percentage: 100}
        ]
      };
    },
    created() {
      let tmp_result=this.$store.dispatch("getDiskInfo");
      tmp_result.then(res=>{
        if(res.data["staCode"]===0){
          this.disks=res.data["disks"];
        }
      })
    }
  }
</script>

<style scoped>
  .progressBar{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 10px 0;
  }
</style>
