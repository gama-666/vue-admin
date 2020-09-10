<template>
  <div id="console">
    <div class="console-wrap">控制台</div>
  </div>
</template>
<script>
import { onMounted } from "@vue/composition-api";
export default {
  name: "console",
  setup(props, context) {
    //4、生命周期 ***********************************************************************/
    //、挂载完成后
    onMounted(() => {});

    //5、3.0没有返回，不能使用//
    return {};
  }
};
</script>
<style lang="scss" scoped>
#console {
  height: 100vh;
}
.console-wrap {
  width: 330px;
}
</style>