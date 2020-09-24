<template>
  <el-form ref="form" label-width="120px">
    <el-form-item label="信息分类：">
      <el-select v-model="from.catagory_value" filterable placeholder="请选择" label="活动名称">
        <el-option
          v-for="item in from.item"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题：" >
      <el-input placeholder="请输入标题" style="width:380px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { GetList } from "@/api/news";
import { common } from "@/api/common";
import { onMounted, reactive, watch } from "@vue/composition-api";
export default {
  name: "infodetails",
  setup(props, { root }) {
    const { getCategoryAll, categoryData } = common();
    const id = root.$route.params.id || root.$store.getters["infoDetails/id"];
    const data = reactive({
      item: [],
      formLabelWidth:'120px'
    });
    const from = reactive({
      item: [],
      catagory_value: "国际信息"
    });

    const getlist = () => {
      let requestData = {
        id, //信息ID（number）
        pageNumber: 1, //页码（number）*
        pageSize: 1 //条数（number）*
      };
      GetList(requestData)
        .then(response => {
          let successData = response.data.data.data;
        })
        .catch(error => {});
    };

    onMounted(() => {
      //获取信息列表
      getlist();
      //获取分类列表
      getCategoryAll();
    });
    /*watch 监听数据变化********/
    watch(
      () => categoryData.item,
      value => {
        from.item = value;
      }
    );
    return {
      data,
      from
    };
  }
};
</script>
<style lang="less" scoped>
</style>