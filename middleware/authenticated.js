export default ({ store, redirect, $axios }) => {
  if (!store.state.authenticated) return redirect({ name: "admin-login" });
};
