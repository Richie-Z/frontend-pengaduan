<template>
  <div class="mx-auto">
    <div class="leading-loose">
      <h1 class="w-full px-10 py-5 pb-6 text-xl font-bold text-black">
        Change Password
      </h1>
      <div class="px-10 py-5">
        <div class="">
          <label class="block text-sm text-gray-600" for="name"
            >Old Password</label
          >
          <input
            class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
            type="text"
            v-model="data.oldPassword"
          />
        </div>
        <div class="mt-5">
          <label class="block text-sm text-gray-600" for="name"
            >New Password</label
          >
          <input
            class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
            type="text"
            v-model="data.newPassword"
          />
        </div>
        <div class="mt-5 flex">
          <button
            class="mr-5 rounded bg-gray-900 px-4 py-1 font-light tracking-wider text-white"
            @click="savePassword()"
          >
            Save
          </button>
          <button
            class="rounded bg-red-900 px-4 py-1 font-light tracking-wider text-white"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data: () => ({
    data: {
      oldPassword: "",
      newPassword: "",
    },
  }),
  methods: {
    async savePassword() {
      const res = await this.$axios.$put("auth/change_password", {
        oldPassword: this.data.oldPassword,
        newPassword: this.data.newPassword,
      });
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: res.message,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
