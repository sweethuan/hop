<template>
<div>
<div class="forum-wrap">
    <h2 class="forum-title">论坛</h2>
    <ul class="forum-box" v-if="forumData.length>0">
      <li v-for="(item, index) in forumData" :key="index">
        <div class="left">
          <div
            class="pic"
            :style="{
              'background-image': `url(${item.headPortrait}) `,
              color: 'red',
              'background-color': '#BAE5F5',
              'background-size': 'cover'
            }"
          ></div>
          <div class="text">
            <p class="txt1">{{ item.name }}</p>
            <p class="txt2">{{ item.startData }}</p>
          </div>
        </div>
        <div class="right">
          <div class="right-html" v-html="item.describe"></div>
        </div>
      </li>
    </ul>
    <div class="forum-form">
      <div class="forum-form-top" v-show="!forumFormOffon">
        <input @click="applyAnswer" class="ipt" type="text" />
        <el-button type="primary" :disabled="true" size="small">回帖</el-button>
      </div>
      <div class="huifu" v-show="forumFormOffon">
        <editor ref="editorForum"></editor>
        <div class="btn">
          <el-button type="primary" @click="getForumAdd" size="small"
            >提交回复</el-button
          >
        </div>
      </div>
    </div>
  </div>

</div>

</template>
<script>
import editor from "../editor";
import "@/../static/js/config.js";
import axios from "axios";
export default {
  components: { editor },
  props: ["menuId"],
  data() {
    return {
      forumFormOffon: false, //回复区域开关
      userItem: {},
      url: "../../../../assets/logo.png",
      forumData: []
    };
  },
  mounted() {
    this.userItem = JSON.parse(sessionStorage.getItem("userItem"));
  },
  watch: {
    menuId(val) {
      this.getForumData();
      this.forumFormOffon=false;
    }
  },
  methods: {
    // 今天最后一天，明天就过去
    //论坛数据获取事件
    getForumData() {
      axios
        .post(demoSetting.commonUrl + "/forum/insert", { menuId: this.menuId })
        .then(res => {
          if (res.status !== 200) {
            return this.$message({
              message: "服务器繁忙,请稍后再试",
              type: "error"
            });
          }
          let status = res.data.status;
          let resData = res.data.data;
          if (status == 0) {
            this.forumData = resData;
            //    console.log(resData)
          }
        });
    },
    //论坛数据新增事件
    getForumAdd() {
      let reqData = {
        userId: this.userItem.userId,
        menuId: this.menuId,
        describe: $(".forum-form .w-e-text").html()
      };
      if (!reqData.menuId) {
        this.$message({
          message: "请先选中菜单",
          type: "error"
        });
        return;
      }
      axios.post(demoSetting.commonUrl + "/forum/add", reqData).then(res => {
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
          this.$refs.editorForum.initialDataWhite("");
          this.getForumData();
        }
      });
    },
    //回帖
    applyAnswer(e) {
      this.forumFormOffon = true
      this.$nextTick(() => {
        let scrollHeight = $('.main-content-box').prop("scrollHeight");
        $('.main-content-box').animate({scrollTop:scrollHeight},600)
      })

    }
  }
};
</script>
