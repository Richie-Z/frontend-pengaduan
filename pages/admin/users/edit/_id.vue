<template>
  <div>
    <h1 class="w-full pb-6 text-3xl text-black">Edit Users</h1>
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
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="email"
                >Username</label
              >
              <input
                class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
                type="text"
                v-model="data.username"
              />
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
    },
  }),
  async fetch() {
    const { data } = await this.$axios.$get(`admin/${this.$route.params.id}`);
    this.data = data;
  },
  methods: {
    async saveUser() {
      const res = await this.$axios.$put(`admin/${this.$route.params.id}`, {
        name: this.data.name,
        username: this.data.username,
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
