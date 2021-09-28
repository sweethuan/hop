const routerArr = [{"name":"系统管理","path":"/main/system","children":[{"name":"菜单管理","path":"/main/system/menu","component":"A"},{"name":"用户管理","path":"/main/system/user","component":"B"},{"name":"角色管理","path":"/main/system/role","children":[{"name":"主角色","path":"/mian/system/role/admin","component":"C"},{"name":"次角色","path":"/main/system/role/noadmin","component":"D"}]}]},{"name":"商品管理","path":"/main/goods","children":[{"name":"商品分类","path":"/main/goods/cate","component":"E"},{"name":"商品规格","path":"/main/goods/guide","component":"F"},{"name":"商品运费","path":"/main/goods/money","component":"G"}]},{"name":"订单管理","path":"/main/order","component":"H"}]

// 使用my-menu组件
<el-menu :default-active="defaultRoute">
   <my-menu :router="routerArr"></my-menu>
</el-menu>

// 定义my-menu组件
<template>
  <template v-for="route in router" :key="route.path">
    <div v-if="route.children && route.children.length">
      <el-sub-menu :index="route.path">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>{{ route.name }}</span>
        </template>

        <my-menu :router="route.children"></my-menu>
      </el-sub-menu>
    </div>

    <el-menu-item :index="route.path" v-else @click="menuClick(route.path)">
      <i class="el-icon-menu"></i>
      <template #title>{{ route.name }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    router: {
      type: Array
    }
  },
  name: 'MyMenu',
  setup() {
    const router = useRouter()
    const menuClick = (path: string) => {
      // console.log(path)

      router.push(path)
    }
    return {
      menuClick
    }
  }
})
</script>

<style lang="less" scoped></style>
