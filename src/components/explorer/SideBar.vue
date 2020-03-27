<template>
  <el-menu style="background-color: #efefef" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-submenu index="1">
      <div slot="title" class="option_text">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">根目录</span>
      </div>
      <el-submenu index="1-1">
        <template slot="title">
          <i class="el-icon-folder-opened"></i>
          <span slot="title">bin</span>
        </template>
        <el-menu-item index="1-1-1">
          <template slot="title">
            <i class="el-icon-files"></i>
            <span slot="title">ssh</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">主目录</span>
      </template>
      <el-submenu index="2-1">
        <template slot="title">
          <i class="el-icon-folder-opened"></i>
          <span slot="title">admin</span>
        </template>
      </el-submenu>
    </el-submenu>
  </el-menu>


</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  .option_text{
    color: #409EFF;
  }
</style>

<script>
  import sideBarOption from "./SideBarOption"
  export default {
    data() {
      return {
        isCollapse: false,
        firstIndex: '1',
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components:{
      sideBarOption
    }
  }
</script>
