<template>
  <el-form :model="ruleForm" :rules="rules">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
    }
  }
</script>

<style scoped>
  /*点击文字变颜色*/
  .blue {
    color: blue;
  }
</style>
