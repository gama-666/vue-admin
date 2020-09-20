<template>
  <el-dialog
    title="新增"
    @close="dialogVisible"
    :visible="dialogInfo"
    @open="openDialog"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in categoryData.item"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          rows="7"
          cols="7"
          v-model="form.content"
          placeholder="请输入内容"
          style="height:160px"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="danger" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { AddInfo } from "@/api/news";
import { reactive, ref, computed } from "@vue/composition-api";
import { onMounted } from "@vue/composition-api";
export default {
  name: "popup",
  props: {
    category: {
      type: Array,
      default: () => {}
    }
  },
  setup(props, { root }) {
    //、监听值得变化，新增对话框的显示隐藏
    const dialogInfo = computed(() => root.$store.state.dialog.dialogInfo);
    /*数据*/
    const formLabelWidth = ref("60px");
    const categoryData = reactive({
      item: []
    });
    const form = reactive({
      type: "",
      title: "",
      content: ""
    });
    /*函数 */
    //、当点击新增按钮时，修改状态值
    const dialogVisible = () => {
      root.$store.commit("dialog/HIDE_DIALOG");
    };
    //、新增窗口打开时，获取从父组件(category)传过来的值
    const openDialog = _ => {
      categoryData.item = props.category;
    };
    //、提交按钮
    const submit = () => {
      if (!form.type) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      root.$store.commit("dialog/HIDE_DIALOG");
      let requestData = {
        categoryId: form.type,
        title: form.title,
        content: form.content
      };
      //添加信息接口请求
      AddInfo(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          form.type = "";
          form.title = "";
          form.content = "";
        })
        .catch(error => {
          console.log(error);
        });
    };
    //、取消按钮
    const close = () => {
      root.$store.commit("dialog/HIDE_DIALOG");
    };

    return {
      // 基础数据
      formLabelWidth,
      // 对象数据
      form,
      categoryData,
      // 函数
      dialogInfo,
      dialogVisible,
      openDialog,
      submit,
      close
    };
  }
};
</script>
<style lang="scss" scoped>
</style>