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


/*删除用户*/
export function UserDelete(data) {
    return http.request({
        method: 'post',
        url: '/user/delete/',
        data
    })
}



/*用户禁用启用*/
export function UserActives(data) {
    return http.request({
        method: 'post',
        url: '/user/actives/',
        data
    })
}

