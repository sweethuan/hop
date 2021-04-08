<template>
  <div class="herder-content">
    <el-header class="home-header">
      <div class="logo">
        前端技术栈
      </div>
      <div class="right">
        <el-autocomplete
          v-model="keywords"
          class="search"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          clearable
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>
        <p class="txt">{{ userInfo.name }}</p>
        <el-dropdown class="avatar">
          <span class="el-dropdown-link">
            <el-avatar size="small" :src="userInfo.headPortrait"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="showDialog('pass')">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="showDialog('avatar')">修改头像</el-dropdown-item>
            <el-dropdown-item @click.native="cancellation">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="beforeClose">
      <div v-if="flag===1">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="oldPass">
            <el-input type="password" v-model="ruleForm.oldPass" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-avatar class="changeAvatar" @click.native="changeHeadPortrait" :src="imageUrl"></el-avatar>
        <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
          <img v-if="userInfo.headPortrait" :src="userInfo.headPortrait" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import axios from "axios";
  import "@/../static/js/config.js";
  import {
    PictureCompression
  } from "@/utils/mixins.js";
  export default {
    name: 'herder',
    mixins: [PictureCompression],
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else if (this.getAesString(value) !== this.userInfo.password) {
          callback(new Error('原密码输入错误!'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        keywords: '',
        userInfo: {
          name: '',
          headPortrait: ''
        },
        dialogVisible: false,
        ruleForm: {
          oldPass: '',
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
          oldPass: [{
            validator: validatePass1,
            trigger: 'blur'
          }]
        },
        imageUrl: '',
        title: '',
        flag: 1,
        allSelect: []
      };
    },
    created() {
       const userInfo= JSON.parse(sessionStorage.getItem("userItem"))
      if(!userInfo) {
        this.$router.push('/')
        return
      } else {
        this.userInfo = userInfo
      }
      this.imageUrl = this.userInfo.headPortrait
      this.getAllMenu()
    },
    methods: {
      //显示弹窗
      showDialog(str) {
        if (str === 'pass') {
          this.title = "修改密码"
          this.flag = 1
          this.dialogVisible = true
        } else {
          this.title = "修改头像"
          this.flag = 2
          this.dialogVisible = true
        }
      },
      // 修改头像/密码对话框确认按钮事件
      submitForm() {
        if (this.flag === 1) {
          this.$refs["ruleForm"].validate((valid) => {
            if (valid) {
              let reqData = {
                userId: this.userInfo.userId,
                password: this.getAesString(this.ruleForm.pass)
              };
              axios
                .post(demoSetting.commonUrl + "/user/updatePassword", reqData)
                .then(res => {
                  if (res.status !== 200) {
                    return this.$message({
                      message: "服务器繁忙,请稍后再试",
                      type: "error"
                    });
                  }
                  let status = res.data.status;
                  if (status == 0) {
                    this.$message({
                      message: "修改成功",
                      type: "success"
                    });
                    setTimeout(_ => {
                      this.cancellation()
                    }, 1500)
                  }
                })
            } else {
              return this.$message({
                message: "表单填写有误",
                type: "error"
              });
            }
          });
        } else {
          if (this.imageUrl === this.userInfo.headPortrait) {
            return this.$message({
              message: "请选择图片",
              type: "error"
            });
          }
          this.userInfo.headPortrait = this.imageUrl
          let reqData = {
            userId: this.userInfo.userId,
            headPortrait: this.imageUrl
          };
          axios
            .post(demoSetting.commonUrl + "/user/updateHeadPortrait", reqData)
            .then(res => {
              if (res.status !== 200) {
                return this.$message({
                  message: "服务器繁忙,请稍后再试",
                  type: "error"
                });
              }
              let status = res.data.status;
              if (status == 0) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                sessionStorage.setItem("userItem", JSON.stringify(this.userInfo));
                setTimeout(() => {
                  window.location.reload()
                }, 1500)
              }
            })
        }

      },
      // 修改头像/密码对话框关闭前事件
      beforeClose(done) {
        if (this.flag === 1) {
          this.$refs["ruleForm"].resetFields()
        }
        done()

      },
      // 注销
      cancellation() {
        this.$confirm('确认 注销 -- ' + this.userInfo.userName + ' ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          lockScroll: false
        }).then(() => {
          sessionStorage.removeItem("userItem")
          this.$router.push("/");
        }).catch(() => {

        });

      },
      // 更换头像事件
      changeHeadPortrait() {
        this.PictureCompression(178, src => {
          this.imageUrl = src;
        });
      },
      //获取所有菜单
      getAllMenu() {
        axios
          .get(demoSetting.commonUrl + "/menu/getAllMenu")
          .then(res => {
            if (res.status !== 200) {
              return this.$message({
                message: "服务器繁忙,请稍后再试",
                type: "error"
              });
            }
            let status = res.data.status;
            if (status == 0) {
              this.allSelect = res.data.data
              this.allSelect.forEach(item => {
                item.value = item.title
              })
            }
          })
      },
      //搜索
      querySearchAsync(queryString, cb) {
        let results = queryString ? this.allSelect.filter(this.createStateFilter(queryString)) : this.allSelect;
        cb(results);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //选择
      handleSelect(obj) {
        let reqData = {
          menuType: obj.menuType
        };
        sessionStorage.setItem("menuData", JSON.stringify(reqData));
        axios
          .post(demoSetting.commonUrl + "/menu/menuInsert", reqData)
          .then(res => {
            if (res.status !== 200) {
              return this.$message({
                message: "服务器繁忙,请稍后再试",
                type: "error"
              });
            }
            this.$Bus.$emit('changeTag',obj.menuType)
            this.$emit("changeMenu", res.data.data,obj.menuId);
          });
      },
    }
  }
</script>

<style scoped>
  .herder-content {
    width: 100%;
  }

  .avatar {
    cursor: pointer;
    vertical-align: middle;
  }

  /deep/ .el-dialog__body>div {
    text-align: center;
  }

  .changeAvatar {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }

  .search>>>input {
    border-radius: 20px;
  }

  .search>>>.el-input__suffix {
    cursor: pointer;
  }
</style>
