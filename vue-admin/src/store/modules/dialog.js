const state = {
    dialogInfo: false
}
const getters = {

}
const mutations = {
    SHOW_DIALOG: (state) => {
        state.dialogInfo = true;
    },
    HIDE_DIALOG: (state) => {
        state.dialogInfo = false;
    },
}
const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};