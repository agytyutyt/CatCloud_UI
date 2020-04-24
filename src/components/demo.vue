<template>
  <div style="max-height: 400px;width: 400px;background-color: #42b983;position: relative;overflow: hidden;">
    <div style="height:400px;">
      <el-scrollbar class="my-scrollbar" style="height:100%">
        <div style="width:400px;height:400px;" >
          <el-row v-for="i in 13" :key="i">
            <el-col :span="18" :offset="3">
              <el-input></el-input>
            </el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        userName: "",
        passWord: ""
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .my-scrollbar >>> .el-scrollbar__wrap{
    overflow-x: hidden;
  }
</style>
