<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="20">
        <!--类目-->

        <el-col :span="4">
          <div class="label-wrap">
            <label for>类型:</label>
            <div class="wrap-content">
              <el-form-item>
                <el-select v-model="value" filterable placeholder="请选择" label="活动名称">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-col>

        <!--日期时间-->

        <el-col :span="7">
          <div class="label-wrap date">
            <label for>日期:</label>
            <div class="wrap-content">
              <el-form-item>
                <el-date-picker
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-col>

        <!--关键字-->
        <el-col :span="5">
          <div class="label-wrap date">
            <label for>关键字:</label>
            <div class="wrap-content_1">
              <el-form-item>
                <el-select v-model="value_1" filterable :placeholder="default_keyword">
                  <el-option
                    v-for="item in keyword"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-col>

        <!--输入框 -->
        <el-col :span="4">
          <el-input v-model="search_keyword" class="search_keyword" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" class="search">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="pull-right" type="danger">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "category",
  setup(props, { root }) {
    /*数据* ***************************/
    //、类型
    const options = reactive([
      {
        value: "选项1",
        label: "国际信息"
      },
      {
        value: "选项2",
        label: "国内信息"
      },
      {
        value: "选项3",
        label: "行业信息 "
      }
    ]);
    // 、关键字
    const keyword = reactive([
      {
        value: "选项1",
        label: "ID"
      },
      {
        value: "选项2",
        label: "标题"
      }
    ]);
    const default_keyword = keyword[0].label;
    const search_keyword = ref("");
    const value = ref("");
    const value_1 = ref("");

    return {
      options,
      value,
      value_1,
      keyword,
      default_keyword,
      search_keyword
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
    margin-left: 60px;
  }
  .wrap-content_1 {
    margin-left: 70px;
  }
}
.date {
  margin-left: 20px;
}
.search_keyword {
  margin-left: -15px;
}
.search {
  margin-left: -25px;
}

</style>