import http from "@/utils/request.js";

/*信息分类添加一级*/
export function AddFirstCategory(data) {
    return http.request({
        method: 'post',
        url: '/news/addFirstCategory/',
        data
    })
}

/*获取信息分类添加 （无子级分类）*/
export function GetCategory(data) {
    return http.request({
        method: 'post',
        url: '/news/getCategory/',
        data
    })
}

/*获取信息分类添加 （有子级分类）*/
export function GetCategoryAll(data) {
    return http.request({
        method: 'post',
        url: '/news/getCategoryAll/ ',
        data
    })
}

