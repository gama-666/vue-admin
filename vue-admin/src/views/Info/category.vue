<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="20">
        <!--类目-->
        <el-col :span="4">
          <div class="label-wrap">
            <label for>分类:</label>
            <div class="wrap-content">
              <el-form-item>
                <el-select v-model="catagory_value" filterable placeholder="请选择" label="活动名称">
                  <el-option
                    v-for="item in options.category"
                    :key="item.id"
                    :label="item.category_name"
                    :value="item.id"
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
          <el-button class="pull-right" type="danger" @click="dialogState">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格数据 -->
    <el-table class="table" :data="table_Data.item" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="700"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="130"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <el-button type="danger" size="small" @click="remove">删除</el-button>
        <el-button type="success" size="small" @click="dialogState">编辑</el-button>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <el-row class="page">
      <el-col :span="12">
        <el-button type="success" size="small" @click="removeAll">批量删除</el-button>
      </el-col>
      <el-pagination
        class="pull-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
    <!-- 新增弹出框 -->
    <Popup :category="options.category" />
  </div>
</template>
<script>
import { GetCategory, GetList } from "@/api/news";
import Popup from "./dialog/popup";
import { common } from "@/api/common";
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch
} from "@vue/composition-api";
export default {
  name: "category",
  components: { Popup },
  setup(props, { root }) {
    //、获取数据，引用公用方法
    const { getInfoCategory, categoryData } = common();
    /*数据* ***************************/
    //、基础数据
    const search_keyword = ref("id"); //搜索关键字
    const default_keyword = ref(""); //输入框默认内容
    const catagory_value = ref(""); //类型
    const keyword_value = ref(""); //关键字
    const total = ref(0); //条数统计
    //、页码
    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });
    //、类型数据
    const options = reactive({
      category: []
    });
    //、表格数据
    const table_Data = reactive({
      item: []
    });
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
    /*函数* **********************************/
    //、每页显示条数
    const handleSizeChange = val => {
      page.pageSize = val;
    
      console.log(page.pageSize);
    };
    //、页码(当前页)
    const handleCurrentChange = val => {
      page.pageNumber = val;
      getlist()
      // console.log(page.pageNumber);
    };
    //、新增弹框的显示
    const dialogState = () => {
      root.$store.commit("dialog/SHOW_DIALOG");
    };
    //、删除弹框的显示
    const remove = () => {
      root.confirm({
        content: "确定删除当前信息，确定后无法恢复！！",
        fn: confirmDelete,
        id: 111
      });
    };
    //、批量删除
    const removeAll = () => {
      root.confirm({
        content: "确定删除选择的信息，确定后将无法恢复！！",
        fn: confirmDelete,
        id: 222
      });
    };
    //、确认删除的回调
    const confirmDelete = id => {
      console.log("删除成功!!", id);
    };
    //、获取信息列表接口请求
    const getlist = () => {
      let requestData = {
        categoryId: "", //分类ID（number）
        startTiem: "", //开始时间（string）
        endTime: "", //结束时间（string）
        title: "", //标题（string）
        id: "", //信息ID（number）
        pageNumber: page.pageNumber, //页码（number）*
        pageSize: page.pageSize //条数（number）*
      };
      GetList(requestData)
        .then(response => {
          let data = response.data.data.data;
          table_Data.item = data;
          total.value = response.data.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    };

    /*生命周期 **********************************************/
    onMounted(() => {
      //获取分类
      getInfoCategory();
      //获取信息列表
      getlist();
    });
    /*watch 监听数据变化********/
    watch(
      () => categoryData.item,
      value => {
        options.category = value;
      }
    );
    return {
      //基础数据
      default_keyword,
      search_keyword,
      catagory_value,
      keyword_value,
      total,
      //对象数据
      options,
      keyword,
      table_Data,
      //函数
      handleSizeChange,
      handleCurrentChange,
      dialogState,
      remove,
      removeAll
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
.table {
  margin-top: 25px;
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