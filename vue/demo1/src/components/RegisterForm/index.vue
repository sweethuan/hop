<template>
  <el-dialog
    class="register-form"
    title="注册"
    :append-to-body="true"
    :visible.sync="dialogVisible"
  >
    <el-form
      ref="registerForm"
      :rules="rules"
      :model="registerForm"
      label-width="90px"
    >
      <div class="top">
        <input type="text" />
        <input type="password" />
      </div>
      <el-form-item label="姓名" prop="name">
        <el-input
          size="small"
          v-model="registerForm.name"
          prefix-icon="icon-xingming1 iconfont"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input
          size="small"
          v-model="registerForm.userName"
          prefix-icon="icon-xingmingyonghumingnicheng iconfont"
        ></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input
          size="small"
          v-model="registerForm.password"
          prefix-icon="icon-mima iconfont"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input
          size="small"
          v-model="registerForm.password2"
          prefix-icon="icon-mima iconfont"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar
          @click.native="changeHeadPortrait"
          :src="registerForm.headPortrait"
        ></el-avatar>
      </el-form-item>
    </el-form>
    <div class="form-btn">
      <el-button type="primary" @click="close" size="small">关闭</el-button>
      <el-button type="primary" @click="register" size="small">注册</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { PictureCompression } from "@/utils/mixins.js";
import axios from "axios";
import "@/../static/js/config.js";
export default {
  mixins: [PictureCompression],
  data() {
    return {
      dialogVisible: false,
      registerForm: {
        name: "",
        userName: "",
        password: "",
        password2: "",
        headPortrait:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "change" },
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "请再次输入密码", trigger: "change" },
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    //头像提换事件
    changeHeadPortrait() {
      this.PictureCompression(178, src => {
        this.registerForm.headPortrait = src;
      });
    },
    nowResetFields() {
      this.headPortrait="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      this.$refs["registerForm"].resetFields();
      this.dialogVisible = false;
    },
    //关闭
    close() {
      this.nowResetFields()
    },
    //注册
    register() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          if (this.registerForm.password != this.registerForm.password2) {
            this.$message({
              message: "两次密码输入不一致",
              type: "error"
            });
          } else {
            let reqData = {
              name: this.registerForm.name,
              userName: this.registerForm.userName,
              password: this.getAesString(this.registerForm.password),
              headPortrait: this.registerForm.headPortrait
            };
            axios
              .post(demoSetting.commonUrl + "/user/register", reqData)
              .then(res => {
                let status = res.data.status;
                let reqData = res.data.data;
                if (status == 0) {
                  this.$message({
                    message: "注册成功",
                    type: "success"
                  });
                   this.nowResetFields()
                }
              });
          }
        } else {
          this.$message({
            message: "表单未填写完整",
            type: "error"
          });
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.form-btn {
  text-align: right;
}
</style>
