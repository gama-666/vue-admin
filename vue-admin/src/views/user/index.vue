<template>
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
        <el-button class="pull-right" type="danger">添加用户</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
import SelectValue from "@/componeents/Select";
export default {
  name: "userList",
  components: { SelectValue },
  setup(props, { root }) {
    const data = reactive({
      configOption: {
        init: ["name", "phone"]
      }
    });
    return {
      data
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
</style>