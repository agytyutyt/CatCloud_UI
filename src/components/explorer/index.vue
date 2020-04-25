<template>
<!--  <el-container>-->
<!--    <el-header v-bind:style="head_bar_style" id="head_bar" class="head_bar">-->
<!--      <head_bar></head_bar>-->
<!--    </el-header>-->
    <el-container style="">
      <el-aside width="201px" style="height: 100vh;">
        <side_bar></side_bar>
      </el-aside>
      <el-main  style="background-color: #FFFFFF;padding: 0 0;">
        <fileList></fileList>
      </el-main>
    </el-container>
<!--  </el-container>-->
</template>

<script>
  import side_bar from './SideBar'
  import head_bar from './HeadBar'
  import fileList from './fileList'
  export default {
    name: "explorer_index",
    data() {
      return{
        head_bar_style: ""
      }
    },
    components: {
      side_bar,
      head_bar,
      fileList
    },
    methods: {
      test(){
        document.querySelector('#')
      }
    },
    created() {
      let userName=sessionStorage["userName"];
      let userHome=sessionStorage["userHome"];
      let currentDir=sessionStorage["currentDir"];
      // let dir=sessionStorage["dir"];
      if(userName && userName!=="" && userHome && userHome!==""){
        this.$store.commit("setUser",{
          name: userName,
          home: userHome
        });
      }
      if(currentDir && currentDir!==""){
        this.$store.commit("gotoDir",currentDir);
      }
      // if(dir && dir.length>0){
      //   this.$store.commit("setDir",dir);
      // }
      // window.onbeforeunload = function(e){ //刷新前确认
      //   var msg="真的要离开么？";
      //   e.returnValue=msg;
      //   return msg;
      // };
      window.addEventListener("beforeunload",()=>{
        let user=this.$store.getters.getUser;
        let currentDir=this.$store.getters.getCurrentDir;
        // let dir=this.$store.getters.getDir;
        sessionStorage.setItem("userName",user["name"]);
        sessionStorage.setItem("userHome",user["home"]);
        sessionStorage.setItem("currentDir",currentDir);
        // sessionStorage.setItem("setDir",dir);
      });
      // window.addEventListener(("onunload"));
    }
  }
</script>

<style scoped>
  .head_bar{
    background-color: #409EFF;
    position: relative;
    height: 40px;
  }

</style>
