<template>
  <div class="region">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select v-model="provinceValue" @change="hanglerProvince">
          <el-option
            v-for="item in provinceData"
            :key="item.PROVINCE_CODE"
            :value="item.PROVINCE_CODE"
            :label="item.PROVINCE_NAME"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select v-model="cityValue" @change="hanglerCity">
          <el-option
            v-for="item in cityData"
            :key="item.CITY_CODE"
            :value="item.CITY_CODE"
            :label="item.CITY_NAME"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select v-model="aredValue" @change="hanglerStreet">
          <el-option
            v-for="item in aredData"
            :key="item.AREA_CODE"
            :value="item.AREA_CODE"
            :label="item.AREA_NAME"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select v-model="streetValue">
          <el-option
            v-for="item in streetData"
            :key="item.STREET_CODE"
            :value="item.STREET_ID"
            :label="item.STREET_NAME"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { citypicker } from "@/mixins/citypicker";
export default {
  name: "region",
  props: {
    citypickerData: {
      type: Object,
      defalut: _ => {}
    }
  },
  setup(props, { root }) {
    const {
      getProvince, //获取省份
      hanglerProvince, //获取城市
      hanglerCity, //获取区县
      hanglerStreet, //获取街道
      //省份数据
      provinceValue,
      provinceData,
      //城市数据
      cityValue,
      cityData,
      //区县数据
      aredValue,
      aredData,
      //街道数据
      streetValue,
      streetData
    } = citypicker();

    getProvince();
    return {
      //事件
      hanglerProvince, //城市
      hanglerCity, //区县
      hanglerStreet, //街道
      //省份数据
      provinceValue,
      provinceData,
      //城市数据
      cityValue,
      cityData,
      //区县数据
      aredValue,
      aredData,
      //街道数据
      streetValue,
      streetData
    };
  }
};
</script>
<style lang="scss" scoped>
.region {
  overflow: hidden;
}
</style>