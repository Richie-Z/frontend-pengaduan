<template>
  <div>
    <!-- Desktop Header -->
    <header class="hidden w-full items-center bg-white px-6 py-2 sm:flex">
      <div class="w-1/2"></div>
      <div class="relative flex w-1/2 justify-end">
        <font-awesome-icon
          icon="fa-solid fa-circle-user"
          class="z-10 !h-10 w-12 cursor-pointer overflow-hidden"
          @click="isOpen = !isOpen"
        />
        <button
          v-if="isOpen"
          @click="isOpen = false"
          class="fixed inset-0 h-full w-full cursor-default"
        ></button>
        <div
          v-if="isOpen"
          class="absolute z-10 mt-16 w-32 rounded-lg bg-white py-2 shadow-lg"
        >
          <button
            @click="show"
            class="block px-4 py-2 text-left hover:text-stone-500"
          >
            Password
          </button>
          <button
            @click="logout"
            class="block px-4 py-2 text-left hover:text-stone-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
    <!-- Mobile Header & Nav -->
    <header class="w-full bg-sidebar-500 px-6 py-5 sm:hidden">
      <div class="flex items-center justify-between">
        <nuxt-link
          :to="{ name: 'admin' }"
          class="text-3xl font-semibold uppercase text-white hover:text-gray-300"
          >Admin Pengaduan</nuxt-link
        >
        <button
          @click="isOpen = !isOpen"
          class="text-3xl text-white focus:outline-none"
        >
          <font-awesome-icon icon="fa-solid fa-bars" v-if="!isOpen" />
          <font-awesome-icon icon="fa-solid fa-times" v-if="isOpen" />
        </button>
      </div>

      <!-- Dropdown Nav -->
      <nav
        :class="isOpen ? 'flex' : 'hidden'"
        class="flex flex-col pt-4"
        id="navbar"
      >
        <nuxt-link
          :to="{ name: 'admin' }"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <i class="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'admin-pengaduan' }"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <i class="fas fa-sticky-note mr-3"></i>
          Pengaduan
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'admin-members' }"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <i class="fas fa-table mr-3"></i>
          Members
        </nuxt-link>
        <nuxt-link
          v-if="isAdmin"
          :to="{ name: 'admin-users' }"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <i class="fas fa-align-left mr-3"></i>
          Users
        </nuxt-link>
        <button
          @click="show"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <i class="fas fa-sign-out-alt mr-3"></i>
          Change Password
        </button>
        <button
          @click="logout"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <i class="fas fa-sign-out-alt mr-3"></i>
          Sign Out
        </button>
      </nav>
    </header>
  </div>
</template>

<script>
import { Toast } from "~/plugins/swal";
import PasswordModal from "@/components/admin/PasswordModal.vue";
export default {
  data: () => ({
    isOpen: false,
  }),
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async logout() {
      const response = await this.$axios.$delete("auth/logout");
      if (response.status) {
        Toast.fire({ icon: "success", title: response.message });
        this.$store.dispatch("petugas/storePetugas", null);
        this.$nuxt.$router.push("/");
      }
    },
    show() {
      this.$modal.show(PasswordModal);
    },
    hide() {
      this.$modal.hide(PasswordModal);
    },
  },
};
</script>

<style lang="scss" scoped></style>
