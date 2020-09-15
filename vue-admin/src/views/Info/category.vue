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
                <el-select v-model="catagory_value" filterable placeholder="请选择" label="活动名称">
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
        <!--搜索关键字-->
        <el-col :span="5">
          <div class="label-wrap date">
            <label for>关键字:</label>
            <div class="wrap-content_1">
              <el-form-item>
                <el-select v-model="keyword_value" filterable :placeholder="search_keyword">
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
          <el-input v-model="default_keyword" class="search_keyword" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" class="search">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="pull-right" type="danger" @click="dialog_info=true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="700"></el-table-column>
      <el-table-column prop="category" label="类型" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <el-button type="success" size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <el-row class="page">
      <el-col :span="12">
        <el-button type="success" size="small">批量删除</el-button>
      </el-col>
      <el-pagination
        class="pull-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-row>
    <!-- 新增弹出框 -->
    <Popup :flag.sync="dialog_info" />
  </div>
</template>
<script>
import Popup from "./dialog/popup";
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "category",
  components: { Popup },
  setup() {
    /*数据* ***************************/
    //、基础数据
    const dialog_info = ref(false); //信息弹窗
    const search_keyword = ref("id"); //搜索关键字
    const default_keyword = ref(""); //输入框默认内容
    const catagory_value = ref(""); //类型
    const keyword_value = ref(""); //关键字
    //、类型数据
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
    //、表格数据
    const tableData = reactive([
      {
        title: "上海市普陀区金沙江路 1518 弄",
        category: "国内信息",
        date: "2016-05-02",
        user: "王小虎"
      },
      {
        title: "上海市普陀区金沙江路 1518 弄",
        category: "国际信息",
        date: "2016-05-02",
        user: "王小虎"
      },
      {
        title: "上海市普陀区金沙江路 1518 弄",
        category: "行业信息",
        date: "2016-05-02",
        user: "王小虎"
      }
    ]);

    /*函数* **********************************/
    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
    };

    return {
      //、基础数据
      dialog_info,
      default_keyword,
      search_keyword,
      catagory_value,
      keyword_value,
      //对象数据
      options,
      keyword,
      tableData,
      //函数
      handleSizeChange,
      handleCurrentChange
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
.page {
  margin: 20px 0px;
  .pull-right {
    text-align: right;
  }
}
</style>