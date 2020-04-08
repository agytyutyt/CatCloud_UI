<template>
  <div>
    <el-button @click="ajaxTest">123425</el-button>
  </div>
</template>

<script>
  // import service from "../utils/axios";
  import service from "../utils/axios";
  export default {
    data() {
      return {
        str: "/home/drcat/frp/config",
        input: "",
        result: "",
        count: 1
      }
    },
    methods: {
      search: function () {
        let index=this.str.lastIndexOf(this.input);
        let result=this.str.substr(0,index+this.input.length);
        this.result=result;
      },
      increase: function () {
        this.count++;
      },
      subStrTest: function () {
        let str = "";
        let result=str.split("/");
        console.log(result);
      },
      ajaxTest: function () {

      }
    },
    computed:{
      computeStoreValue(){
        return this.$store.state.count
      }
    },
    created() {
      // console.log(this.getRemoteDir("asd"));
      let res=service.methods.getRemoteDir("asd");
      console.log(res);
    }
  }
</script>

<style scoped>
  /*点击文字变颜色*/
  .blue {
    color: blue;
  }
</style>
