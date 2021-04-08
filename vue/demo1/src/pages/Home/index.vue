<template>
  <el-container class="home-wrap">
    <herder @changeMenu="changeMenu"></herder>
    <el-container class="main-content">
      <!-- 左侧菜单 -->
      <el-aside width="200px" class="aside my-menu">
        <el-menu :default-active="activeIndex" ref="menu" class="el-menu-vertical-demo ">
          <el-menu-item :index="index.toString()" @click="getDetails(item,index)" v-for="(item, index) in menu" :key="index">
            <span slot="title" :title="item.title">{{item.title}} </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- /左侧菜单 -->
      <!-- 主体区域 -->
      <el-main class="my-content">
        <main-content @changeMenu="changeMenu" :menuId="menuId"/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import axios from "axios";
  import "@/../static/js/config.js";
  import homeMixins from "./mixins";
  import Herder from "@/components/Header/index.vue"
  import MainContent from "./child/main/index.vue"
  export default {
    mixins: [homeMixins],
    components: {
      Herder,
      MainContent
    },
    data() {
      return {
        menu: '',
        menuId: '',
        content: '',
        activeIndex: "0"
      };
    },
    methods: {
      //改变菜单
      changeMenu(menu,id) {
        this.menu = menu
        this.menuId = id ? id: menu.length>0 ?menu[0].menuId: ''
        this.activeIndex = "0"
        this.menu.forEach((item,index) => {
          if(item.menuId===this.menuId) {
            this.activeIndex=index+''
          }
        })
      },
      //获取详细信息
      getDetails(obj,index) {
        this.menuId = obj.menuId
        this.activeIndex = index+''
      }
    }
  };
</script>
<style scoped>
  .home-wrap {
    flex-wrap: wrap;
    align-content: flex-start;

  }
  .main-content {
    height: calc(100vh - 40px);
  }
  .aside > ul {
    height: 100%;
  }
</style>
