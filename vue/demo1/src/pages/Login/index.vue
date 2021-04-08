<template>
  <div class="login-wrap">
    <h1 class="login-title">宝威前端技术栈</h1>
    <article class="login-box">
      <h2>用户登录</h2>
      <el-form
        ref="loginForm"
        :rules="rules"
        :model="loginForm"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            size="small"
            v-model="loginForm.userName"
            prefix-icon="icon-xingmingyonghumingnicheng iconfont"
          ></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input
            size="small"
            v-model="loginForm.password"
            prefix-icon="icon-mima iconfont"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="form-btn">
        <el-button type="primary" @click="getLogin" size="small"
          >登录</el-button
        >
        <el-button type="primary" @click="register" size="small"
          >注册</el-button
        >
      </div>
    </article>
    <register-form ref="registerForm"></register-form>
  </div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm";
import { PictureCompression } from "@/utils/mixins.js";
import axios from "axios";
import "@/../static/js/config.js";
export default {
  components: { RegisterForm },
  mixins: [PictureCompression],
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      //规则验证
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //用户登录点击事件
    getLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          let reqData = {
            userName: this.loginForm.userName,
            password: this.getAesString(this.loginForm.password)
          };
          axios
            .post(demoSetting.commonUrl + "/user/login", reqData)
            .then(res => {
              let status = res.data.status;
              let reqData = res.data.data;
              if (status == 0) {
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
                // delete reqData.password;
                sessionStorage.setItem("userItem", JSON.stringify(reqData));
                this.$router.push("/home");
              }
              if (status == 2) {
                this.$message({
                  message: "用户名或密码错误，请重新登录",
                  type: "error"
                });
              }
               return false;
            });
         
        } else {
          this.$message({
            message: "表单未填写完整",
            type: "error"
          });
          return false;
        }
      });
    },
    //注册按钮点击事件
    register() {
      this.$refs.registerForm.show();
    }
  }
};
</script>
