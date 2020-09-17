import { GetCategory } from "@/api/news";
import { reactive } from "@vue/composition-api";
export function common() {
    let categoryData = reactive({
        item: []
    })
    const getInfoCategory = () => {
        GetCategory({})
            .then(response => {
                categoryData.item = response.data.data.data;
            })
            .catch(error => { });
    }
    return {
        getInfoCategory,
        categoryData
    }
}