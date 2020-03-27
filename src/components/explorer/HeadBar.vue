<template>
  <div>
    <el-button type="text" class="el-icon-arrow-up up_icon" v-on:click=""> </el-button>
    <div class="head_icon"><el-avatar :size="46" src="./static/123.png"></el-avatar></div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  .up_icon{
    line-height: 100%;
    color: #FFFFFF;
    font-weight: 900;
    font-size: 20px;
    float: right;
    position: relative;
  }

  .head_icon{
    margin: 7px 30px;
    float: right;
    position: relative;
  }
</style>
