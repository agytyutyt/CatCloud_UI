<template>
  <el-menu>
  <el-submenu :index="currentIndex">
    <template slot="title">
      <i class="el-icon-folder-opened"></i>
      <span slot="title">{{thisIndex}}</span>
      <template v-if="child.isDir">
          <side_bar_option  v-for="(item, index) in child.children" :key="index" :child="item" :currentIndex="currentIndex+'-'+item.name"></side_bar_option>
      </template>
    </template>
  </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "side_bar_option",
    data() {
      return{
        thisIndex: ""
      }
    },
    props: ['child','currentIndex'],
    created() {
      this.thisIndex=this.currentIndex;
    }
  }
</script>
