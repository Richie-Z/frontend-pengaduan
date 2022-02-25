export const state = () => ({
  authenticated: false,
});
export const mutations = {
  CHANGE_AUTH(state) {
    state.authenticated = !state.authenticated;
  },
};
