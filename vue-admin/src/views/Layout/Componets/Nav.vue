<template>
  <div id="nav-wrap">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          router
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollpase"
          background-color="transparent"
          text-color="#fff "
          active-text-color="#fff"
        >
          <template v-for="(item,index) in routes">
            <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
              <!-- 一级菜单 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.meta.name}}</span>
              </template>
              <!-- 子级菜单 -->
              <el-menu-item
                v-for="subitem in item.children"
                :key="subitem.id"
                :index="subitem.path"
              >{{subitem.meta.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    //1、数据位置 ************************************************************************/
    const isCollpase = ref(false);
    const routes = reactive(root.$router.options.routes);

    //2、声明函数 ***********************************************************************/
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollpase,
      routes,
      handleOpen,
      handleClose
    };
  }
};
</script>
<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: $navMenu;
  background-color: #344a5f;
}
</style>