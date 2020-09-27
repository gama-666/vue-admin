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
import { reactive } from "@vue/composition-api";
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
        tHead: []
      },
      //默认表格数据
      tableData: [
        {
          eamil: "2056435@qq.com",
          name: "张三",
          phone: 13556026588,
          address: "上海市普陀区金沙",
          role: "超管"
        },
        {
          eamil: "7865461@qq.com",
          name: "李四",
          phone: 13556026588,
          address: "上海市普陀区金沙",
          role: "超管"
        }
      ]
    });
    //初始化table表头配置项
    const initTableConfig = () => {
      let tableData = props.config;
      for (let key in tableData) {
        if (data.tableConfig[key]) {
          data.tableConfig[key] = tableData[key];
        }
      }
    };
    initTableConfig(); 

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped>
</style>