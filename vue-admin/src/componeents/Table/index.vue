<template>
  <div>
    <el-table
      :data="data.tableData"
      border
      style="width: 100%"
      v-loading="data.loadingData"
    >
      <!-- 多选框 -->
      <el-table-column
        v-if="data.tableConfig.selection"
        type="selection"
        width="55"
      ></el-table-column>
      <template v-for="item in data.tableConfig.tHead">
        <!-- v-solt 作用域插槽 -->
        <el-table-column
          :key="item.field"
          v-if="item.columnType == 'slot'"
          :width="item.width"
          :prop="item.field"
          :label="item.label"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 文本数据渲染 -->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-else
        ></el-table-column>
      </template>
    </el-table>
    <div class="page">
      <el-pagination
        v-if="data.tableConfig.paginationShow"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.currentPage"
        :page-sizes="pageData.pageSizes"
        :page-size="pageData.pageSize"
        :layout="data.tableConfig.paginationLayout"
        :total="pageData.total"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { loadData } from "./tableLoadData"; //表格数据
import { paginationHook } from "./paginationHook"; //表格数据
import { onBeforeMount, reactive, watch } from "@vue/composition-api";
export default {
  name: "tableVue",
  props: {
    config: {
      type: Object,
      default: _ => {}
    }
  },
  setup(props, { root }) {
    //表格数据，接口请求
    const { tableData, tableLoadData } = loadData({ root });
    //页码记录及事件
    const { pageData, handleSizeChange, handleCurrentChange } = paginationHook();
    //默认table表头配置项
    const data = reactive({
      tableConfig: {
        selection: true,
        recordCheckbox: "false",
        requestData: {},
        tHead: [],
        paginationShow: true,
        paginationLayout: "total, sizes, prev, pager, next, jumper"
      },
      //默认表格数据
      tableData: [],
      //表格数据请求加载状态
      loadingData: true
    });
    //初始化table表头配置项
    //匹配相同的key， 如果存在，则替换
    const initTableConfig = () => {
      let configData = props.config;
      let keys = Object.keys(data.tableConfig);
      for (let key in configData) {
        if (keys.includes(key)) {
          data.tableConfig[key] = configData[key];
        }
      }
    };
    //数据渲染,监听值表格的数据、总条数条数的变化
    watch(
      [_ => tableData.item, _ => tableData.total, _ => tableData.loadingData],
      ([tableData, tableCount, loadingData]) => {
        data.tableData = tableData; //表格的数据、
        pageData.total = tableCount; //总条数
        data.loadingData = loadingData; //加载状态
      }
    );
    //监听值当前页、每页显示条数的的变化
    watch(
      [_ => pageData.currentPage, _ => pageData.pageSize],
      ([currentPage, pageSize]) => {
        pageData.currentPage = currentPage; //当前页
        pageData.pageSize = pageSize; //每页显示条数
        data.tableConfig.requestData.data.pageNumber = currentPage;
        data.tableConfig.requestData.data.pageSize = pageSize;
        tableLoadData(data.tableConfig.requestData);
      }
    );

    onBeforeMount(() => {
      initTableConfig();
      tableLoadData(data.tableConfig.requestData); //表格数据，接口请求
    });

    return {
      data,
      pageData,
      handleSizeChange,
      handleCurrentChange
    };
  }
};
</script>
<style lang="scss" scoped>
.page {
  margin-top: 20px;
  text-align: right;
}
</style>