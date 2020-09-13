import Cookie from "cookie_js"

export function getToken() {
    return Cookie.get('admin_token');
}

export function setToken(value) {
    Cookie.set('admin_token', value)
}

export function deleteToken() {
    setToken('')
}





