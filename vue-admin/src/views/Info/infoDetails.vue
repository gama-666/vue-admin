<template>
  <el-form ref="form" label-width="120px">
    <el-form-item label="信息分类：">
      <el-select
        v-model="from.categoryId"
        filterable
        placeholder="请选择"
        label="活动名称"
      >
        <el-option
          v-for="item in from.item"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="新闻标题：">
      <el-input v-model="from.title" placeholder="请输入标题"></el-input>
    </el-form-item>

    <el-form-item label="图片上传：">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="data.dialogVisible" size="tiny">
        <img width="100%" :src="data.dialogImageUrl" alt />
      </el-dialog>
    </el-form-item>

    <el-form-item label="发布日期：">
      <el-date-picker
        v-model="from.createDate"
        type="date"
        placeholder="选择日期"
        disabled
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item label="详细内容：">
      <quillEditor v-model="from.content" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { GetList, EditInfo } from "@/api/news";
import { common } from "@/api/common";
import { timestampToTime } from "@/utils/common";
import { onMounted, reactive, watch } from "@vue/composition-api";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "infodetails",
  components: { quillEditor },
  setup(props, { root }) {
    const { getCategoryAll, categoryData } = common();
    const data = reactive({
      id: root.$route.params.id || root.$store.getters["infoDetails/id"],
      dialogImageUrl: "",
      dialogVisible: false
    });
    const from = reactive({
      item: "",
      categoryId: "",
      title: "",
      createDate: "",
      content: ""
    });

    //获取当前id信息
    const getlist = () => {
      let requestData = {
        id: data.id, //信息ID（number）
        pageNumber: 1, //页码（number）*
        pageSize: 1 //条数（number）*
      };
      GetList(requestData)
        .then(response => {
          let successData = response.data.data.data;
          from.categoryId = successData[0].categoryId;
          from.title = successData[0].title;
          from.createDate = timestampToTime(successData[0].createDate);
          from.content = successData[0].content;
        })
        .catch(error => {});
    };
    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
    };
    const handlePictureCardPreview = file => {
      root.dialogImageUrl = file.url;
      root.dialogVisible = true;
    };
    //提交按钮
    const submit = () => {
      let requestData = {
        id: data.id,
        categoryId: from.categoryId,
        title: from.title,
        content: from.content
      };
      //修改信息接口请求
      EditInfo(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
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
      from,
      submit,
      handleRemove,
      handlePictureCardPreview
    };
  }
};
</script>
<style lang="less" scoped>
</style>