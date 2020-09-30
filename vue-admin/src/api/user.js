import http from "@/utils/request.js";

/*获取用户角色*/
export function GetRole(data = {}) {
    return http.request({
        method: 'post',
        url: '/role/',
        data
    })
}

/*添加用户*/
export function GetUserAdd(data) {
    return http.request({
        method: 'post',
        url: '/user/add/',
        data
    })
}


