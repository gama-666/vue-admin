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
                    <SelectValue :config="data.configOption" />
                  </el-form-item>
                </el-col>
                <!--输入框 -->
                <el-col :span="5">
                  <el-input placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="14">
                  <el-button type="danger" class="seach">搜索</el-button>
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
      <TableVue :config="data.configTable">
        <template v-slot:status="slotData">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
        <template v-slot:operation="slotData">
          <el-button type="danger" size="small" @click="remove(slotData.data)"
            >删除</el-button
          >
          <el-button type="success" size="small" @click="edit(slotData.data)"
            >编辑</el-button
          >
        </template>
      </TableVue>
    </div>
    <Popup />
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
import SelectValue from "@/componeents/Select";
import TableVue from "@/componeents/Table";
import Popup from "./dialog/Popup";
export default {
  name: "userList",
  components: { SelectValue, TableVue, Popup },
  setup(props, { root }) {
    const data = reactive({
      //搜索关键字组件配置参数
      configOption: {
        init: ["name", "phone"]
      },
      //table组件配置参数
      configTable: {
        //多选框
        selection: true,
        //表头
        tHead: [
          { label: "用户名/邮箱", field: "title" },
          { label: "真实姓名", field: "name" },
          { label: "手机号", field: "phone" },
          { label: "地区", field: "address" },
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
        }
      }
    });
    //添加用户
    const add = () => {
      root.$store.commit("dialog/SHOW_DIALOG"); //显示弹窗
    };
    //删除用户
    const remove = data => {
      console.log("删除", data);
    };
    //编辑用户
    const edit = data => {
      root.$store.commit("dialog/SHOW_DIALOG"); //显示弹窗
    };
    return {
      data,
      remove,
      edit,
      add
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