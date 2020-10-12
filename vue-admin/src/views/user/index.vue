<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row>
        <!--搜索关键字-->
        <el-col :span="20">
          <div class="label-wrap">
            <label for>关键字:</label>
            <div class="wrap-content">
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-form-item>
                    <SelectValue
                      :config="data.configOption"
                      :selectData.sync="data.selectData"
                    />
                  </el-form-item>
                </el-col>
                <!--输入框 -->
                <el-col :span="5">
                  <el-input v-model="data.keyWord" placeholder="请输入搜索关键字"></el-input>
                </el-col>
                <el-col :span="14">
                  <el-button type="danger" class="seach" @click="seach"
                    >搜索</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button class="pull-right" type="danger" @click="add"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <!-- 用户列表，表格 -->
    <div class="table-list">
      <TableVue
        ref="userTable"
        :config="data.configTable"
        :tableRow.sync="data.tableRow"
      >
        <template v-slot:status="slotData">
          <el-switch
            v-model="slotData.data.status"
            active-value="1"
            inactive-value="2"
            @change="handlerSwitch(slotData.data)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
        <template v-slot:operation="slotData">
          <el-button type="danger" size="small" @click="remove(slotData.data)"
            >删除</el-button
          >
          <el-button type="success" size="small" @click="edit(slotData.data)"
            >编辑</el-button
          >
        </template>
        <template v-slot:tableFooter>
          <el-button type="danger" size="small" @click="removeAll"
            >批量删除</el-button
          >
        </template>
      </TableVue>
    </div>
    <Popup />
    <Edit />
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
import { UserDelete, UserActives } from "@/api/user/";
//组件
import SelectValue from "@/componeents/Select";
import TableVue from "@/componeents/Table";
import Popup from "./dialog/Popup";
import Edit from "./dialog/edit";

export default {
  name: "userList",
  components: { SelectValue, TableVue, Popup, Edit },
  setup(props, { root, refs }) {
    const data = reactive({
      //搜索关键字组件配置参数
      configOption: {
        init: ["name", "phone"]
      },
      //下拉菜单的数据
      selectData: { value: "name", label: "姓名" },
      //搜索关键字
      keyWord:"",
      //table选择的数据
      tableRow: {},
      //table组件配置参数
      configTable: {
        //多选框
        selection: true,
        //表头
        tHead: [
          { label: "用户名/邮箱", field: "username" },
          { label: "真实姓名", field: "truename" },
          { label: "手机号", field: "phone" },
          { label: "地区", field: "region" },
          { label: "角色", field: "role" },
          {
            label: "禁启用状态",
            field: "status",
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "operation"
          }
        ],
        requestData: {
          url: "getUserList",
          method: "post",
          data: {
            pageNumber: 1, //页码（number）*
            pageSize: 10 //条数（number）*
          }
        },
        editData: {},
        showEdit: false
      }
    });
    //添加用户
    const add = () => {
      root.$store.commit("dialog/SHOW_DIALOG"); //显示弹窗
    };
    //单个删除用户
    const remove = userData => {
      let userId = [userData.id];
      deleteDialog(userId);
    };
    //批量删除用户
    const removeAll = () => {
      let userId = data.tableRow.idItem;
      if (!userId || userId.length === 0) {
        root.$message({
          message: "请勾选需要删除的用户！！！",
          type: "error"
        });
        return false;
      } else {
        deleteDialog(userId);
      }
    };
    //删除弹窗
    const deleteDialog = userId => {
      root.confirm({
        content: "确定删除当前信息，确定后无法恢复！！",
        fn: userDelete,
        catchFn: () => {
          root.$message({
            message: "已取消删除",
            type: "success"
          });
        },
        id: userId
      });
    };
    //删除用户接口
    const userDelete = userId => {
      UserDelete({ id: userId })
        .then(respone => {
          let successData = respone.data;
          root.$message({
            message: successData.message,
            type: "success"
          });
          refs.userTable.refresData();
        })
        .catch(error => {
          console.log(error);
        });
    };
    //禁启用状态修改，接口请求
    const handlerSwitch = userData => {
      let id = parseInt(userData.id);
      UserActives({ id, status: userData.status });
    };
    //编辑用户
    const edit = userData => {
      data.editData = { ...userData };
      root.$store.commit("dialog/SHOW_EDIT_DIALOG");
      root.$store.commit("dialog/SET_EDITDATA", data.editData);
    };
    //搜索用户
    const seach = () => {
      let requestData = {
        [data.selectData.value]:data.keyWord
      }
      refs.userTable.parmsLoadData(requestData)
    };

    return {
      data,
      remove,
      edit,
      add,
      removeAll,
      handlerSwitch,
      seach
    };
  }
};
</script>
<style lang="scss" scoped>
.label-wrap {
  label {
    float: left;
    line-height: 40px;
    width: 60px;
  }
  .wrap-content {
    margin-left: 70px;
  }
}
.seach {
  margin-left: 8px;
}
.table-list {
  margin-top: 25px;
}
</style>