<template>
  <div>
    <h1 class="w-full pb-6 text-3xl text-black">Add Users</h1>
    <div class="flex flex-wrap">
      <div class="my-6 w-full resize pr-0">
        <p class="flex items-center pb-6 text-xl">
          <font-awesome-icon icon="fa-solid fa-list" class="mr-3" /> Users
        </p>
        <div class="leading-loose">
          <div class="rounded bg-white p-10 shadow-xl">
            <div class="">
              <label class="block text-sm text-gray-600" for="name">Name</label>
              <input
                class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
                type="text"
                v-model="data.name"
              />
            </div>
            <div class="flex">
              <div class="mt-2 mr-2 w-1/2">
                <label class="block text-sm text-gray-600" for="email"
                  >Username</label
                >
                <input
                  class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
                  type="text"
                  v-model="data.username"
                />
              </div>
              <div class="mt-2 ml-2 w-1/2">
                <label class="block text-sm text-gray-600" for="message"
                  >Password</label
                >
                <input
                  class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
                  type="text"
                  v-model="data.password"
                />
              </div>
            </div>
            <button
              class="mt-2 rounded bg-gray-900 px-4 py-1 font-light tracking-wider text-white"
              @click="saveUser()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  middleware: "admin-only",
  layout: "admin/default",
  data: () => ({
    data: {
      name: "",
      username: "",
      password: "",
    },
  }),
  methods: {
    async saveUser() {
      let body = new FormData();
      body.append("name", this.data.name);
      body.append("username", this.data.username);
      body.append("password", this.data.password);
      const res = await this.$axios.$post("admin", {
        name: this.data.name,
        username: this.data.username,
        password: this.data.password,
      });
      console.log(res);
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: res.message,
        });
        this.$nuxt.$router.push({ name: "admin-users" });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.proses {
  @apply m-2 rounded bg-stone-500 px-3 text-stone-100 shadow transition hover:bg-stone-700 hover:text-stone-200;
}
.btn-lampiran {
  @apply ml-3 rounded-lg px-3 font-bold shadow hover:text-slate-200 hover:shadow-xl;
}
</style>
