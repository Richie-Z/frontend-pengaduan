<template>
  <div class="flex min-h-screen items-center justify-center bg-stone-100">
    <div class="w-fit rounded bg-stone-50 px-20 py-5 shadow shadow-stone-500">
      <div class="form-box">
        <label for="username">Username</label>
        <input type="text" name="username" v-model="data.username" />
      </div>
      <div class="form-box">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="data.password" />
      </div>
      <div class="flex justify-center">
        <button
          class="my-2 rounded-md bg-stone-900 px-5 py-2 text-stone-200 shadow-md"
          @click="login"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "~/plugins/swal";
export default {
  async middleware({ $axios, store, redirect }) {
    if (store.state.petugas.petugas !== null) redirect({ name: "admin" });
    const user = await $axios.$get("auth/me");
    if (user.status) {
      if (store.state.petugas.petugas === null)
        store.dispatch("petugas/storePetugas", user.data);
      redirect({ name: "admin" });
    }
  },
  data: () => ({
    data: {
      username: "",
      password: "",
    },
  }),
  methods: {
    async login() {
      const response = await this.$axios.$post("auth/login", this.data);
      if (response.status) {
        Toast.fire({ icon: "success", title: response.message });
        this.$store.dispatch("petugas/storePetugas", response.data);
        this.$nuxt.$router.push({ name: "admin" });
      }
    },
  },
  async mounted() {
    await this.$axios.$get("csrf-token");
  },
};
</script>

<style scoped>
input {
  @apply rounded border px-1;
}
.form-box {
  @apply my-2 flex flex-col;
}
</style>
