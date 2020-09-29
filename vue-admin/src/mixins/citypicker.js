import { GetCityPicker } from "@/api/common";
import { reactive, toRefs } from "@vue/composition-api";

export function citypicker() {
    const data = reactive({
        //省份数据
        provinceValue: "",
        provinceData: [],
        //城市数据
        cityValue: "",
        cityData: [],
        //区县数据
        aredValue: "",
        aredData: [],
        //街道数据
        streetValue: "",
        streetData: []
    });

    //获取省份
    const getProvince = () => {
        GetCityPicker({
            type: "province"
        }).then(respone => {
            data.provinceData = respone.data.data.data;
        });
    };
    //获取城市,选择省份后去获取城市
    const hanglerProvince = () => {
        data.cityValue = "";
        data.aredValue = "";
        data.streetValue = "";
        GetCityPicker({
            type: "city",
            province_code: data.provinceValue
        }).then(
            respone => {
                data.cityData = respone.data.data.data;
            }
        );
    };
    //获取区县,选择城市后去获取地区县
    const hanglerCity = () => {
        data.aredValue = "";
        data.streetValue = "";
        GetCityPicker({
            type: "area",
            city_code: data.cityValue
        }).then(
            respone => {
                data.aredData = respone.data.data.data;
            }
        );
    };
    //获取街道,选择区县后去获取街道
    const hanglerStreet = () => {
        data.streetValue = "";
        GetCityPicker({
            type: "street",
            area_code: data.aredValue
        }).then(
            respone => {
                data.streetData = respone.data.data.data;
            }
        );
    };
    return {
        ...toRefs(data),
        getProvince,
        hanglerProvince,
        hanglerCity,
        hanglerStreet
    }
}