<template>
  <div>
    <el-button @click="subStrTest">123425</el-button>
  </div>
</template>

<script>
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
      }
    },
    computed:{
      computeStoreValue(){
        return this.$store.state.count
      }
    }
  }
</script>

<style scoped>
  /*点击文字变颜色*/
  .blue {
    color: blue;
  }
</style>
