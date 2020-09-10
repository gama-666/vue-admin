<template>
  <div id="news">
    <div class="news-wrap">新闻页</div>
  </div>
</template>
<script>
import { onMounted } from "@vue/composition-api";
export default {
  name: "news",
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
#news {
  height: 100vh;
}
.news-wrap {
  width: 330px;
  margin: auto;
}
</style>