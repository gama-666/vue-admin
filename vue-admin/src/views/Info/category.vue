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
              <el-date-picker
                style="width:100%"
                v-model="dete_value"
                type="datetimerange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00','08:00:00']"
              ></el-date-picker>
            </div>
          </div>
        </el-col>
        <!--搜索关键字-->
        <el-col :span="5">
          <div class="label-wrap date">
            <label for>关键字:</label>
            <div class="wrap-content_1">
              <el-form-item>
                <el-select v-model="search_key" filterable :placeholder="search_keyword">
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
          <el-button type="danger" class="search" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="pull-right" type="danger" @click="dialogState">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      class="table"
      :data="table_Data.item"
      v-loading="loadingData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="700"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="130" :formatter="toCategory"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="237" :formatter="toDate"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="remove(scope.row.id)">删除</el-button>
          <el-button type="success" size="small" @click="dialogEditState(scope.row.id)">编辑</el-button>
        </template>
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
    <Popup :category="options.category" @getListAdd="getlist" />
    <!-- 编辑弹出框 -->
    <Edit :category="options.category" :id="editId" @getListEdit="getlist" />
  </div>
</template>
<script>
import { GetList, DeleteInfo } from "@/api/news";
import Popup from "./dialog/popup";
import Edit from "./dialog/edit";
import { common } from "@/api/common";
import { timestampToTime } from "@/utils/common";
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch
} from "@vue/composition-api";
export default {
  name: "category",
  components: { Popup, Edit },
  setup(props, { root }) {
    //、获取数据，引用公用方法
    const { getInfoCategory, categoryData } = common();
    /*数据* ***************************/
    //、基础数据
    const search_keyword = ref("id"); //搜索关键字
    const default_keyword = ref(""); //输入框默认内容
    const catagory_value = ref(""); //类型
    const search_key = ref(""); //关键字
    const total = ref(0); //条数统计
    const loadingData = ref(false); //信息列表请求显示loading状态，请求完成后显示数据
    const deleteInfoId = ref("");
    const dete_value = ref("");
    const editId = ref("111");
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
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);

    /*函数* **********************************/
    //、每页显示条数
    const handleSizeChange = val => {
      page.pageSize = val;
      getlist();
    };
    //、页码(当前页)
    const handleCurrentChange = val => {
      page.pageNumber = val;
      getlist();
    };
    //、新增弹框
    const dialogState = id => {
      root.$store.commit("dialog/SHOW_DIALOG");
    };
    //、编辑弹框
    const dialogEditState = id => {
      editId.value = id;
      root.$store.commit("dialog/SHOW_EDIT_DIALOG");
    };
    //、单个删除
    const remove = id => {
      deleteInfoId.value = [id];
      root.confirm({
        content: "确定删除当前信息，确定后无法恢复！！",
        fn: confirmDelete
      });
    };
    //、批量删除
    const removeAll = () => {
      if (!deleteInfoId.value || deleteInfoId.value.length == 0) {
        root.$message({
          message: "请选择要删除的数据",
          type: "error"
        });
        return false;
      }
      root.confirm({
        content: "确定删除选择的信息，确定后将无法恢复！！",
        fn: confirmDelete
      });
    };
    //、删除的回调
    const confirmDelete = value => {
      DeleteInfo({ id: deleteInfoId.value })
        //删除成功
        .then(response => {
          let requestData = response.data;
          root.$message({
            message: requestData.message,
            type: "success"
          });
          deleteInfoId.value = "";
          getlist();
        })
        //删除失败
        .catch(error => {
          root.$message({
            message: requestData.message,
            type: "error"
          });
        });
    };
    //单选按钮，保存选择值到数组中，批量删除需要选中值
    const handleSelectionChange = val => {
      let id = val.map(item => item.id);
      deleteInfoId.value = id;
    };
    //搜索
    const search = _ => getlist();
    const fromData = () => {
      let requestData = {
        categoryId: "", //分类ID（number）
        startTiem: "", //开始时间（string）
        endTime: "", //结束时间（string）
        title: "", //关键字标题（string）
        id: "", //信息ID（number）
        pageNumber: page.pageNumber, //页码（number）*
        pageSize: page.pageSize //条数（number）*
      };
      //分类ID（number）
      if (catagory_value.value) {
        requestData.categoryId = catagory_value.value;
      }
      //开始时间（string）结束时间（string）
      if (dete_value.value.length > 0) {
        requestData.startTiem = dete_value.value[0];
        requestData.endTime = dete_value.value[1];
      }
      //关键字标题（string）
      if (default_keyword.value) {
        requestData.id = default_keyword.value;
      }
      return requestData;
    };
    //、获取信息列表接口请求
    const getlist = () => {
      let requestData = fromData();
      loadingData.value = true; //加载状态
      GetList(requestData)
        .then(response => {
          let data = response.data.data.data;
          table_Data.item = data;
          total.value = response.data.data.total;
          loadingData.value = false;
        })
        .catch(error => {
          loadingData.value = false;
        });
    };
    //时间戳转换为日期时间，
    const toDate = row => timestampToTime(row.createDate);
    //类型匹配
    const toCategory = row => {
      let type = options.category.filter(item => {
        return item.id == row.categoryId;
      })[0].category_name;
      return type;
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
      search_key,
      total,
      loadingData,
      dete_value,
      editId,
      //对象数据
      options,
      keyword,
      table_Data,
      //函数
      handleSizeChange,
      handleCurrentChange,
      dialogState,
      dialogEditState,
      remove,
      removeAll,
      getlist,
      toDate,
      toCategory,
      handleSelectionChange,
      search
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