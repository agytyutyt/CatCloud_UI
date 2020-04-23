<template>
  <div>
    <el-input v-model="userName" type="text"></el-input>
    <el-input v-model="passWord" type="text"></el-input>
    <el-button @click="" type="primary">提交</el-button>
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
