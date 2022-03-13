export default async ({ store, redirect }) => {
  const petugas = store.getters["petugas/getPetugas"];
  if (petugas?.role !== "admin") redirect({ name: "admin" });
};
