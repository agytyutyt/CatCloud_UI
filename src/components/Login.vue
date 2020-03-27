<template>
  <div  class="background">
    <div></div>
    <div class="login_body">
      <div class="login_header">
        <span class="login_header_text">登录</span>
      </div>
      <el-row type="flex" justify="center" class="row-style" style="margin-top: 30px;">
        <el-col :span="6" class="login-span">
          <span>用户名：</span>
        </el-col>
        <el-col :span="16">
          <div style="line-height: 40px; opacity: 1;">
            <el-input v-model="username" placeholder="请输入用户名" class="el-input"></el-input>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" class="row-style">
        <el-col :span="6" class="login-span">
          <span>密码：</span>
        </el-col>
        <el-col :span="16">
          <div style="line-height: 40px;">
            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
          </div>
        </el-col>
      </el-row>

      <el-row style="float: right;margin-right: 17px;">
        <el-button type="primary" plain v-on:click="check">登录</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      check: function () {
        alert("!!!!!!");
      }
    }
  }
</script>

<style>
  .background{
    position: fixed;
    background-image: url("../assets/index.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .login_body{
    width: 400px;
    height: 200px;
    background-color: rgba(255,255,255,1);
    position: absolute;
    margin: auto;
    top: 0; left: 0; bottom: 0; right: 0;
    box-shadow: 0 0 50px 15px rgba(0,0,0,0.8);
    z-index: 100;
  }

  .login_header{
    width: 100%;
    height: 100px;
    position: absolute;
    top: -100px;
    background-color: rgba(10,10,10,0.8);
    box-shadow: 0 0 50px 10px rgba(0,0,0,0.8);
    z-index: 0;
  }

  .login_header_text{
    font-family: "Microsoft YaHei";
    color: #FFFFFF;
    font-size: 30px;
    line-height: 40px;
    font-weight: 700;
    letter-spacing: 30px;
    text-align:center;
    float: right;
    margin-top: 45px;
  }

  .login-span{
    font-family: "Microsoft YaHei";
    font-size: 17px;
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    letter-spacing: 5px;
    text-align: right;
  }
  .row-style{
    margin-top: 10px;
    margin-bottom: 10px;
    height: 50px;
  }
  .el-input {
    font-size: 15px;
    line-height: 20px;
    background-color: #FFFFFF;
  }
</style>
