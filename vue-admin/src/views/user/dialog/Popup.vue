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
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" :label-width="data.formLabelWidth">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入6~20位+字母"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓  名:" :label-width="data.formLabelWidth">
        <el-input v-model="form.truename" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" :label-width="data.formLabelWidth">
        <el-input
          v-model.number="form.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>

      <el-form-item label="地区:" :label-width="data.formLabelWidth">
        <Citypicker
          :citypickerLevel="['province', 'city', 'ared', 'street']"
          :citypickerData.sync="data.citypickerData"
        />
      </el-form-item>
      <el-form-item label="是否启用:" :label-width="data.formLabelWidth">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="角色:" :label-width="data.formLabelWidth">
        <el-checkbox-group v-model="form.role">
          <el-checkbox
            v-for="item in data.roleCode"
            :label="item.role"
            :key="item.role"
            >{{ item.name }}</el-checkbox
          >
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
import { GetRole, GetUserAdd } from "@/api/user";
import Citypicker from "@/componeents/Citypicker";
import { reactive, ref, computed, onBeforeMount } from "@vue/composition-api";
export default {
  name: "popup",
  components: { Citypicker },
  setup(props, { root }) {
    const data = reactive({
      //返回的省、市、区县、街道数据
      citypickerData: {},
      //弹窗的显示状态
      dialogInfo: computed(() => root.$store.state.dialog.dialogInfo),
      //label的宽度
      formLabelWidth: "72px",
      //角色名称
      roleCode: []
    });

    const form = reactive({
      username: "", //用户名
      password: "", //密码
      truename: "", //真实姓名
      phone: "", //手机号
      region: {}, //地区
      status: "1", //禁启用状态
      role: [] //角色类型
    });

    //请求角色
    const getRole = () => {
      GetRole().then(response => {
        data.roleCode = response.data.data;
      });
    };
    //窗口打开,动画结束时
    const openDialog = _ => {
      getRole(); //请求角色
    };
    //添加用户时，修改状态值
    const dialogVisible = () => {
      root.$store.commit("dialog/HIDE_DIALOG");
    };

    //提交按钮
    const submit = () => {
      getUserAdd();
      root.$store.commit("dialog/HIDE_DIALOG");
    };
    //添加用户接口
    const getUserAdd = () => {
      let requestData = {
        username: form.username, //用户名（string）
        password: form.password, //密码（string）
        truename: form.truename, //真实姓名（string）
        phone: form.phone, //手机号（number）
        region: data.citypickerData, //地区（json）
        status: form.status, //禁启用状态（string）
        role: form.role //角色类型（string）
      };
      console.log(requestData);

      console.log(form);
      GetUserAdd(requestData).then(response => {
        let successData = response.data;
        root.$message({
          message: successData.message,
          type: "success"
        });
      });
    };

    //取消按钮
    const close = () => {
      root.$store.commit("dialog/HIDE_DIALOG");
    };

    return {
      data,
      // 表单数据
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