export const state = () => ({
  authenticated: false,
});
export const mutations = {
  LOGIN(state) {
    state.authenticated = true;
  },
};
