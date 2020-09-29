<template>
  <el-dialog
    title="添加用户"
    @close="dialogVisible"
    :visible="data.dialogInfo"
    @open="openDialog"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="用户名:" :label-width="data.formLabelWidth">
        <el-input v-model="form.title" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓  名:" :label-width="data.formLabelWidth">
        <el-input v-model="form.title" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" :label-width="data.formLabelWidth">
        <el-input v-model="form.title" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区:" :label-width="data.formLabelWidth">
        <Citypicker  :citypickerData.sync="data.citypickerData"/>
      </el-form-item>
      <el-form-item label="是否启用:" :label-width="data.formLabelWidth">
        <el-radio v-model="data.radio" label="1">备选项</el-radio>
        <el-radio v-model="data.radio" label="2">备选项</el-radio>
      </el-form-item>
      <el-form-item label="角色:" :label-width="data.formLabelWidth">
        <el-checkbox-group v-model="data.checkedCities">
          <el-checkbox v-for="city in data.cities" :label="city" :key="city">{{
            city
          }}</el-checkbox>
        </el-checkbox-group>
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
import Citypicker  from "@/componeents/Citypicker";
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
  components: { Citypicker },
  setup(props, { root, emit }) {
    const data = reactive({
      citypickerData:{},
      dialogInfo: computed(() => root.$store.state.dialog.dialogInfo),
      formLabelWidth: "72px",
      radio: "1",
      checkedCities: ["系统管理员"],
      cities: ["系统管理员", "信息管理员", "用户管理员"],
      categoryData: {
        item: []
      }

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
      data.categoryData.item = props.category;
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
          emit("getListAdd");
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
      data,
      // 对象数据
      form,
      // 函数
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