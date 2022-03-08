export const state = () => ({
  petugas: null,
});
export const getters = {
  getPetugas: (state) => state.petugas,
};
export const mutations = {
  SET_PETUGAS(state, data) {
    state.petugas = data;
  },
};
export const actions = {
  storePetugas({ commit }, data) {
    commit("SET_PETUGAS", data);
  },
};
