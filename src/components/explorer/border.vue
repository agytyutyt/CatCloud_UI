<template>
  <el-row class="border">
    <el-col :span="2">
      <div>
        <el-button type="text" @click="goBack" class="el-icon-d-arrow-left el-button-backButton"> 返回</el-button>
      </div>
    </el-col>
    <el-col :span="22">
      <div>
        <span style="float: left;line-height: 30px;margin-right: 20px;margin-left: 20px;">当前位置: </span>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
          <el-breadcrumb-item class="my-breadcrumb" v-for="(item,index) in getRoute" :key="index" ><span @click="goBackTo(item)">{{item}}</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "border",
    methods: {
      goBack: function () {
        this.$parent.$parent.$parent.goBack();
      },
      goBackTo: function(dirName) {
        this.$store.commit("lastDir",dirName);
      },

    },
    data() {
      return {
      }
    },
    computed: {
      getRoute: function () {
        let result = this.$store.getters.getRoute;
        result[0]="/";
        return result;
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .border{
    border-bottom: 1px solid #cbcbcb;
    height: 50px;
  }
  .el-button{
    padding: 0 0;
    width: 100%;
  }
  .el-button-backButton{
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;
    border-radius: 0;
    margin: 10px auto;
    border-right: 2px solid #e3e3e3;
  }
  .separator{
    float: right;
  }
  .el-breadcrumb{
    font-size: 15px;
    margin: 10px 30px;
    line-height: 30px;
  }
  .my-breadcrumb{
    font-weight: 700;
    font-size: 17px;
    cursor:pointer;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  }
</style>
