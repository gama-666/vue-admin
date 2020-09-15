<template>
  <el-dialog title="新增" @close="dialogVisible" :visible="dialogInfo" width="580px">
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          rows="7"
          cols="7"
          v-model="form.name"
          placeholder="请输入内容"
          style="height:160px"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible">取 消</el-button>
      <el-button type="danger" @click="dialogVisible">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { reactive, ref, computed } from "@vue/composition-api";
export default {
  name: "popup",
  setup(props, { root }) {
    /*数据*/
    //、监听值得变化，对话框的显示隐藏
    const dialogInfo = computed(() => root.$store.state.dialog.dialogInfo);
    const formLabelWidth = ref("60px");
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });
    /*函数 */
    const dialogVisible = () => {
      root.$store.commit("dialog/HIDE_DIALOG");
    };

    return {
      dialogInfo,
      formLabelWidth,
      form,
      dialogVisible
    };
  }
};
</script>
<style lang="scss" scoped>
</style>