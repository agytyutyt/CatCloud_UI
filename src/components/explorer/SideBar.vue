<template>
<!--  <el-menu-->
<!--    style="background-color: #efefef"-->
<!--    class="el-menu-vertical-demo"-->
<!--    @open="handleOpen"-->
<!--    @close="handleClose"-->
<!--    :collapse="isCollapse">-->
<!--  </el-menu>-->

  <el-menu
    default-active="home"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">

    <el-menu-item index="home">
      <i class="el-icon-s-home"></i>
      <span slot="title">主目录</span>
    </el-menu-item>
    <el-menu-item index="root">
      <i class="el-icon-location"></i>
      <span slot="title">根目录</span>
    </el-menu-item>
    <el-menu-item index="info" style="position: absolute;bottom: 0px;width: 100%;" @click="">
      <el-popover
        placement="right"
        width="500"
        trigger="hover">
        <userInfo></userInfo>
        <div slot="reference">
          <i class="el-icon-warning-outline"></i>
          <span>更多</span>
        </div>
      </el-popover>
    </el-menu-item>
  </el-menu>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    overflow: hidden;
  }
  .option_text{
    color: #409EFF;
  }
</style>

<script>
  import sideBarOption from "./SideBarOption"
  import service from "../../utils/axios";
  import qs from 'qs';
  import userInfo from "./userInfo";
  export default {
    data() {
      return {
        isCollapse: false,
        firstIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        switch (key) {
          case "home":{
            let data={
              user: this.getUserName
            };
            data=qs.stringify(data);
            service.post("/api/getHomePath",data)
            .then(res => {
              if(res.data["exist"]===true){
                this.$store.commit("gotoDir",res.data["home"]);
                this.$store.dispatch("updateLocalDir");
              }
              else{
                this.$message({
                  message: "目录不存在",
                  type: "error"
                });
              }
            });
            break;
          }
          case "root":{
            this.$store.commit("gotoDir","/");
            this.$store.dispatch("updateLocalDir");
          }
        }
      },
    },
    computed: {
      getUserName(){
        return this.$store.getters.getUserName;
      }
    },
    components:{
      sideBarOption,
      userInfo
    },
    created() {
    }
  }
</script>
