<template>
  <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580px">
    <el-form :model="form">
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  name: "popup",
  data() {
    return {
      dialog_info_flag: true,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "70px"
    };
  },
  methods: {
    //回调
    close() {
      this.dialog_info_flag = false;
      this.$emit("close", false);
    }
  },
  //单向数据流，父级->子级,不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  //通过watch来监听,修改值
  watch: {
    flag: {
      //新值newValue，旧值oldValue
      handler(newValue, oldValue) {
        this.dialog_info_flag = newValue;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>