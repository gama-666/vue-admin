const state = {
    dialogInfo: false,
    dialogEdit: false
}
const getters = {}
const mutations = {
    SHOW_DIALOG: (state) => {
        state.dialogInfo = true;
    },
    HIDE_DIALOG: (state) => {
        state.dialogInfo = false;
    },

    SHOW_EDIT_DIALOG: (state) => {
        state.dialogEdit = true;
    },
    HIDE_EDIT_DIALOG: (state) => {
        state.dialogEdit = false;
    },
}
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};