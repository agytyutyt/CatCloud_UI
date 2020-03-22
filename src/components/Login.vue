<template>
  <div>
    <div class="background"></div>
    <el-row type="flex" justify="center">
      <el-col :span="7">
        <el-card class="el-card" style="box-shadow: 0px 0px 50px 15px rgba(0,0,0,0.8);">
<!--      登录框头部-->
          <div slot="header"  style="background-color: #409EFF; border-color: #409EFF;height: 50px;">
              <span class="card-head-text"><div style="text-align: right; position: relative; top: 20px;">登录</div></span>
          </div>

<!--      登录框主体-->
          <el-row type="flex" justify="space-around" class="row-style">
            <el-col :span="6" class="login-span">
              <span>用户名：</span>
            </el-col>
            <el-col :span="16">
              <div style="line-height: 40px; opacity: 1;">
                <el-input v-model="username" placeholder="请输入用户名" class="el-input"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around" class="row-style">
            <el-col :span="6" class="login-span">
              <span>密码：</span>
            </el-col>
            <el-col :span="16">
              <div style="line-height: 40px;">
                <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
              </div>
            </el-col>
          </el-row>

          <el-row style="float: right;margin-right: 9px;">
            <el-button type="primary" plain>登录</el-button>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
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
  }

  .el-card {
    min-height: 300px;
    margin-top: 35%;
    border: 0;
  }

  .card-head-text{
    font-family: "Microsoft YaHei";
    color: #FFFFFF;
    font-size: 30px;
    line-height: 40px;
    font-weight: 700;
    letter-spacing: 30px;
    text-align:center;
  }
  .el-card__header{
       background-color: #409EFF;
  }
  .login-span{
    font-family: "Microsoft YaHei";
    font-size: 20px;
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
    font-size: 20px;

    background-color: #FFFFFF;
  }
</style>
