<template>
  <el-container>
<!--    <el-header v-bind:style="head_bar_style" id="head_bar" class="head_bar">-->
<!--      <head_bar></head_bar>-->
<!--    </el-header>-->
    <el-container>
      <el-aside width="201px" style="height: 100vh;">
        <side_bar></side_bar>
      </el-aside>
      <el-main  style="background-color: #FFFFFF;padding: 0 0;">
        <fileList></fileList>
      </el-main>
    </el-container>
  </el-container>
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
