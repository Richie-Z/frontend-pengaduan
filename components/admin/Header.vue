<template>
  <div>
    <!-- Desktop Header -->
    <header class="items-center hidden w-full px-6 py-2 bg-white sm:flex">
      <div class="w-1/2"></div>
      <div class="relative flex justify-end w-1/2">
        <font-awesome-icon
          icon="fa-solid fa-circle-user"
          class="z-10 w-12 !h-10 overflow-hidden cursor-pointer"
          @click="isOpen = !isOpen"
        />
        <button
          v-if="isOpen"
          @click="isOpen = false"
          class="fixed inset-0 w-full h-full cursor-default"
        ></button>
        <div
          v-if="isOpen"
          class="absolute z-10 w-32 py-2 mt-16 bg-white rounded-lg shadow-lg"
        >
          <a href="#" class="block px-4 py-2 hover:text-stone-500">Account</a>
          <button @click="logout" class="block px-4 py-2 hover:text-stone-500">
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Header & Nav -->
    <header class="w-full px-6 py-5 bg-sidebar-500 sm:hidden">
      <div class="flex items-center justify-between">
        <nuxt-link
          :to="{ name: 'admin' }"
          class="text-3xl font-semibold text-white uppercase hover:text-gray-300"
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
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <i class="mr-3 fas fa-tachometer-alt"></i>
          Dashboard
        </nuxt-link>
        <a
          href="blank.html"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <i class="mr-3 fas fa-sticky-note"></i>
          Pengaduan
        </a>
        <a
          href="tables.html"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <i class="mr-3 fas fa-table"></i>
          Members
        </a>
        <a
          href="forms.html"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <i class="mr-3 fas fa-align-left"></i>
          Users
        </a>
        <a
          href="#"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <i class="mr-3 fas fa-user"></i>
          My Account
        </a>
        <button
          @click="logout"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <i class="mr-3 fas fa-sign-out-alt"></i>
          Sign Out
        </button>
      </nav>
    </header>
  </div>
</template>

<script>
import { Toast } from "~/plugins/swal";
export default {
  data: () => ({
    isOpen: false,
  }),
  methods: {
    async logout() {
      const response = await this.$axios.$delete("auth/logout");
      if (response.status) {
        Toast.fire({ icon: "success", title: response.message });
        this.$store.dispatch("petugas/storePetugas", null);
        this.$nuxt.$router.push({ name: "admin-login" });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
