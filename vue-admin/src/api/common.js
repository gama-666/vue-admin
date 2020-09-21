import { GetCategory, GetCategoryAll } from "@/api/news";
import { reactive } from "@vue/composition-api";
export function common() {
    let categoryData = reactive({
        item: []
    })
    //获取分类
    const getInfoCategory = () => {
        GetCategory({})
            .then(response => {
                categoryData.item = response.data.data.data;
            })
            .catch(error => { });
    }
    //获取全部分类，包含子级
    const getCategoryAll = () => {
        GetCategoryAll({})
            .then(response => {
                categoryData.item = response.data.data;
            })
            .catch(error => { });
    }


    return {
        getCategoryAll,
        getInfoCategory,
        categoryData
    }
}