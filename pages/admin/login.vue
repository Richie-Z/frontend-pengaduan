<template>
  <div>
    <div>
      <label for="username">Username</label>
      <input type="text" name="username" v-model="data.username" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" v-model="data.password" />
    </div>
    <button
      class="px-5 py-2 my-2 rounded-md shadow-md bg-stone-900 text-stone-200"
      @click="login"
    >
      submit
    </button>
  </div>
</template>

<script>
import { Toast } from "~/plugins/swal";
export default {
  async middleware({ $axios, store, redirect }) {
    const user = await $axios.$get("auth/me");
    if (user.status) {
      store.commit("LOGIN");
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
        this.$store.commit("LOGIN");
        this.$nuxt.$router.push({ name: "admin" });
      }
    },
  },
  async mounted() {
    const csrfToken = await this.$axios.$get("csrf-token");
    console.log(csrfToken);
  },
};
</script>

<style scoped>
input {
  @apply border;
}
</style>
