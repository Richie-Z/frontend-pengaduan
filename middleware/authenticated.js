export default async ({ store, redirect, $axios }) => {
  const user = await $axios.$get("auth/me");
  console.log(user);
  if (!user.status && !store.state.authenticated)
    return redirect({ name: "admin-login" });
  if (user.status) {
    store.commit("LOGIN");
  }
};
