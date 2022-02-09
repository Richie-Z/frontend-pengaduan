export const state = () => ({
  data: [],
});
export const getters = {
  data: (state) => state.data,
};
export const mutations = {
  SET_DATA(state, pengaduan) {
    state.data = pengaduan;
  },
};
export const actions = {
  storePengaduan({ commit }, pengaduan) {
    commit("SET_DATA", pengaduan);
  },
};
