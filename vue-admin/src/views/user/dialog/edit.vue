<template>
  <el-dialog
    title="编辑用户"
    @close="dialogVisible"
    :visible="data.dialogEdit"
    @open="openDialog"
    width="580px"
  >
    <el-form :model="form" ref="form">
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
      <el-form-item label="系统:" :label-width="data.formLabelWidth">
        <el-checkbox-group v-model="form.role">
          <el-checkbox
            v-for="item in data.roleCode"
            :label="item.role"
            :key="item.role"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
       
        <el-form-item label="按钮权限:" :label-width="data.formLabelWidth">
           <template v-if="form.btnPerm.length>0">
             <div v-for="item in form.btnPerm">
              <h4> {{item.name}}</h4>
              <template v-if="item.perm && item.perm.length>0">
               <el-checkbox-group v-model="form.btnPerm">
                <el-checkbox v-for="buttons in item.perm" :label="buttons.value" :key="buttons.value">{{ buttons.name }}</el-checkbox >
              </el-checkbox-group>
              </template>
             </div>
           </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="danger" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import sha1 from "js-sha1";
import { GetRole,GetSystem, UserEdit,GetPermButton } from "@/api/user";
import Citypicker from "@/componeents/Citypicker";
import { reactive, ref, computed, watch } from "@vue/composition-api";
//中央事件
import Bus from "@/utils/bus";
export default {
  name: "edit",
  components: { Citypicker },
  setup(props, { root, refs, emit }) {
    const data = reactive({
      //返回的省、市、区县、街道数据
      citypickerData: {},
      //弹窗的显示状态
      dialogEdit: computed(() => root.$store.state.dialog.dialogEdit),
      //label的宽度
      formLabelWidth: "72px",
      //角色名称
      roleCode: [],
      //编辑弹窗数据
      editData: computed(() => root.$store.state.dialog.editData)
    });

    const form = reactive({
      username: "", //用户名
      password: "", //密码
      truename: "", //真实姓名
      phone: "", //手机号
      region: {}, //地区
      status: "1", //禁启用状态
      role: [], //角色类型
      btnPerm: [] //按钮权限
    });

    //编辑用户时，修改状态值
    const dialogVisible = () => {
      root.$store.commit("dialog/HIDE_EDIT_DIALOG");
    };
    //请求角色
    const getRole = () => {
      GetSystem().then(response => {
        data.roleCode = response.data.data;
      });
      GetPermButton().then(response => {
        form.btnPerm = response.data.data;
      });
    };
    //窗口打开,动画结束时
    const openDialog = _ => {
      let editDataKey = Object.keys(data.editData);
      editDataKey.forEach(key => {
        if(key == "btnPerm"){
            form.btnPerm = data.editData.btnPerm.split(",");
        }else{
            form[key] = data.editData[key];
        }
      });
      form.role = data.editData.role.split(",");
      form.password = "";
      getRole(); //请求角色
    };

    //编辑用户确认按钮
    const submit = () => {
      //请求数据
      let requestData = { ...form };
      requestData.id = parseInt(requestData.id);
      requestData.password ? requestData.password = sha1(requestData.password) : delete requestData.password;
      requestData.phone = parseInt(requestData.phone);
      requestData.region = data.citypickerData.provinceValue ? JSON.stringify( data.citypickerData) :JSON.stringify( requestData.region);
      requestData.role = requestData.role.toString();
      requestData.btnPerm = requestData.btnPerm.join();

      //请求接口
      userEdit(requestData);
    };
    //编辑用户接口
    const userEdit = (requestData) => {
      UserEdit(requestData)
        .then(response => {
          let successData = response.data;
          root.$message({
          message: successData.message,
          type: "success"
          });
          //调用中央事件，刷新数据
          Bus.$emit("refreshTableData");
          root.$store.commit("dialog/HIDE_EDIT_DIALOG");
        })
        .catch(error => {
          console.log(error);
        });
    };
    //取消按钮
    const close = () => {
      root.$store.commit("dialog/HIDE_EDIT_DIALOG");
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