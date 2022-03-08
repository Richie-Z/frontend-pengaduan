export default async ({ store, redirect, $axios }) => {
  const user = await $axios.$get("auth/me");
  if (!user.status && store.state.petugas.petugas === null)
    return redirect({ name: "admin-login" });
  if (user.status && store.state.petugas.petugas === null) {
    store.dispatch("petugas/storePetugas", user.data);
  }
};
