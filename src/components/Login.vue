<template>
  <el-row type="flex" justify="center" align="center">
    <el-col :span="8"  style="position: absolute;top: 30%;">
      <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return{
        user:{
          username:'zhangsan',
          password:'123',
        }
      }
    },
    methods:{
      doLogin(){//一点击登录按钮，这个方法就会执行
        alert(JSON.stringify(this.user))//可以直接把this.user对象传给后端进行校验用户名和密码
      }
    }
  }
</script>

<style>
</style>
