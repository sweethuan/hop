<template>
  <div>
    <el-row class="first-menu">
      <el-col :span="24">
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in tabs"
            :key="index"
            :label="item"
            :name="item"
          ></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div class="main-content-box">
      <el-card class="box-card problem-box">
        <div class="title-top">
          <h1>标题: {{ content.title }}</h1>
          <div class="btn" v-if="userForm.userId===content.userId">
            <el-button
              type="primary"
              size="mini"
              @click.native="updataAsk(1)"
              round
              icon="el-icon-edit"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteAsk"
              round
              icon="el-icon-delete"
              >删除</el-button
            >
          </div>
        </div>
        <p class="describe"><span>描述: </span>{{ content.describe }}</p>
        <div class="enclosure">
          <span>姓名: {{ content.name }}</span>
          <span>新增时间: {{ content.startDate }}</span>
          <span>修改时间: {{ content.endDate }}</span>
        </div>
        <div class="content-html" v-html="content.html"></div>
      </el-card>
      <!-- 论坛区域 -->
      <forum :menuId="content.menuId?content.menuId:''"></forum>
    </div>

    <el-tooltip
      class="item addAsk"
      effect="dark"
      @click.native="updataAsk(2)"
      content="添加"
      placement="bottom"
    >
      <el-button type="primary" icon="el-icon-plus" circle></el-button>
    </el-tooltip>

    <el-dialog
      :title="topTitle"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="beforeClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题:" prop="title">
          <el-input
            type="text"
            size="small"
            v-model="ruleForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="describe">
          <el-input
            type="textarea"
            size="small"
            v-model="ruleForm.describe"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类:" prop="menuType">
          <el-select
            v-model="ruleForm.menuType"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in primaryMenu"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="page-question" label="内容:">
          <!-- <el-input type="password" v-model="ruleForm.content"></el-input> -->
          <editor ref="questionEditor"></editor>
          <!-- <editor ref="questionEditor" @getContent="getContent"></editor> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import "@/../static/js/config.js";
import Editor from "../editor.vue";
import primaryMenu from "@/../static/json/primaryMenu.json";
import Forum from "./Forum";
export default {
  name: "main-content",
  data() {
    return {
      content: {},
      activeName: "",
      primaryMenu: primaryMenu,
      tabs: [],
      dialogVisible: false,
      topTitle: "",
      flag: "",
      ruleForm: {
        title: "",
        describe: "",
        menuType: "",
        content: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        describe: [
          {
            required: true,
            message: "请输入描述",
            trigger: "blur"
          }
        ],
        menuType: [
          {
            required: true,
            message: "请选择分类",
            trigger: "blur"
          }
        ]
      },
      userForm: {}
    }
  },
  props: ["menuId"],
  components: {
    Editor,
    Forum
  },
  mounted() {
    this.getTabs();

    if (sessionStorage.getItem("menuData")) {
      this.activeName = JSON.parse(sessionStorage.getItem("menuData")).menuType;
      this.handleClick(JSON.parse(sessionStorage.getItem("menuData")));
    } else {
      setTimeout(() => {
        let obj = {};
        obj.name = this.tabs[0];
        this.handleClick(obj);
      }, 200);
    }
    let userItem = sessionStorage.getItem("userItem")
    this.userForm = userItem ? JSON.parse(userItem) : ''
    this.$Bus.$on('changeTag',(val) => {
      this.activeName = val
      sessionStorage.setItem('menuData',JSON.stringify({menuType:val}))
    })
  },
  watch: {
    menuId(){
       this.getContentData()
    }
  },
  methods: {
    // 获取问题详情
    getContentData() {
    //  console.log("....")
      let reqData = {
        menuId: this.menuId
      };
      axios
        .post(demoSetting.commonUrl + "/menu/pageInsert", reqData)
        .then(res => {
          if (res.status !== 200) {
            return this.$message({
              message: "服务器繁忙,请稍后再试",
              type: "error"
            });
          }
          this.content = res.data.data;
        });
    },
    // 查询标签
    getTabs() {
      axios.post(demoSetting.commonUrl + "/menu/menuTypeInsert").then(res => {
        if (res.status !== 200) {
          return this.$message({
            message: "服务器繁忙,请稍后再试",
            type: "error"
          });
        }
        this.tabs = res.data.data;
      });
    },
    // 新增/修改 弹窗关闭事件
    beforeClose(done) {
      //this.$refs['ruleForm'].resetFields()
      for (let key in this.ruleForm) {
        this.ruleForm[key] = "";
      }
      done();
    },
    // 新增/修改 提交事件
    submitForm() {
      // console.log(this.ruleForm)
      this.$refs["ruleForm"].validate(valid => {
        if (!valid) {
          return this.$message({
            message: "表单未填写完整",
            type: "error"
          });
        }
        if (this.flag === 1) {
          let reqData = {
            menuId: this.content.menuId,
            title: this.ruleForm.title,
            describe: this.ruleForm.describe,
            menuType: this.ruleForm.menuType,
            name: this.userForm.name,
            userId: this.userForm.userId,
            html: $(".page-question .w-e-text").html()
          };
          axios
            .post(demoSetting.commonUrl + "/menu/update", reqData)
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
                let menuData = {
                  name: this.activeName,
                  menuId: this.content.menuId
                };
                sessionStorage.setItem("menuData", JSON.stringify(menuData));
                this.dialogVisible = false;
                this.getContentData()
              }
            });
        } else {
          let reqData = {
            title: this.ruleForm.title,
            describe: this.ruleForm.describe,
            menuType: this.ruleForm.menuType,
            name: this.userForm.name,
            userId: this.userForm.userId,
            html: $(".page-question .w-e-text").html()
          };
          axios.post(demoSetting.commonUrl + "/menu/add", reqData).then(res => {
            if (res.status !== 200) {
              return this.$message({
                message: "服务器繁忙,请稍后再试",
                type: "error"
              });
            }
            let status = res.data.status;
            if (status == 0) {
              this.$message({
                message: "新增成功",
                type: "success"
              });
              let menuData = {
                name: this.activeName,
                menuId: this.content.menuId
              };
              sessionStorage.setItem("menuData", JSON.stringify(menuData));
              window.location.reload();
            }
          });
        }
      });
    },
    // 标签页点击事件
    handleClick(tab) {
      this.activeName = tab.name ? tab.name : tab.menuType;
      let reqData = {
        menuType: this.activeName
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
         this.$emit("changeMenu", res.data.data);
        });
    },
    // 获取富文本内容
    getContent(content) {
      this.ruleForm.content = content;
    },
    // 修改问题
    updataAsk(flag) {
      if (flag === 1) {
        this.flag = flag;
        this.topTitle = "修改问题";
        for (let key in this.content) {
          this.ruleForm[key] = this.content[key];
        }
        setTimeout(() => {
          this.$refs.questionEditor.initialDataWhite(this.content.html);
        }, 300);
      } else {
        this.flag = flag;
        this.topTitle = "添加问题";
        for(let key in this.ruleForm){
          this.ruleForm[key]=""
        }
        setTimeout(() => {
          this.$refs.questionEditor.initialDataWhite("");
        }, 300);
      }
      this.dialogVisible = true;
    },
    // 删除该问题
    deleteAsk() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        lockScroll: false
      })
        .then(() => {
          let reqData = {
            menuId: this.content.menuId
          };
          axios
            .post(demoSetting.commonUrl + "/menu/delete", reqData)
            .then(res => {
              if (res.status !== 200) {
                return this.$message({
                  message: "服务器繁忙,请稍后再试",
                  type: "error"
                });
              }
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              let menuData = {
                name: this.activeName
              };
              sessionStorage.setItem("menuData", JSON.stringify(menuData));
              window.location.reload();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.addAsk {
  position: fixed;
  bottom: 60px;
  right: 60px;
  width: 66px;
  font-size: 40px;
}

.el-row {
  margin: 8px 0;
  font-size: 16px;
}
</style>
