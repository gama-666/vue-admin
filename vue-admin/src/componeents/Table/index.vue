<template>
  <el-table :data="data.tableData" border style="width: 100%">
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
</template>
<script>
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";
import { onBeforeMount, reactive } from "@vue/composition-api";
export default {
  name: "tableVue",
  props: {
    config: {
      type: Object,
      default: _ => {}
    }
  },
  setup(props, { root }) {
    const data = reactive({
      //默认table表头配置项
      tableConfig: {
        selection: true,
        recordCheckbox: "false",
        requestData: {},
        tHead: []
      },
      //默认表格数据
      tableData: []
    });

    //接口
    const loadData = () => {
      let requestKey = data.tableConfig.requestData;
      let demandData = {
        url: requestUrl[requestKey.url],
        method: requestKey.method,
        data: requestKey.data
      };
      loadTableData(demandData)
        .then(response => {
          //请求成功的数据
          let successData = response.data.data.data;
          //判断数据是否为空
          if (successData && successData.length > 0) {
            data.tableData = successData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    //初始化table表头配置项
    const initTableConfig = () => {
      let configData = props.config;
      let keys = Object.keys(data.tableConfig);
      for (let key in configData) {
        if (keys.includes(key)) {
          data.tableConfig[key] = configData[key];
        }
      }
    };
    
    onBeforeMount(() => {
      initTableConfig();
      loadData();
    });

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped>
</style>