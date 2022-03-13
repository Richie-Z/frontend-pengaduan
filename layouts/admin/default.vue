<template>
  <div class="flex bg-gray-100 font-karla">
    <AdminSidebar :isAdmin="isAdmin" />
    <div class="relative flex h-screen w-full flex-col overflow-y-hidden">
      <AdminHeader :isAdmin="isAdmin" />
      <div class="flex h-screen w-full flex-col overflow-x-hidden border-t">
        <main class="w-full flex-grow p-6">
          <nuxt />
          <!-- Content goes here! 😁 -->
        </main>
        <footer class="w-full bg-white p-4 text-right">
          Pengaduan @ {{ year }}
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: "authenticated",
  computed: {
    year() {
      return new Date().getUTCFullYear();
    },
    ...mapGetters({ petugas: "petugas/getPetugas" }),
    isAdmin() {
      return this.petugas?.role === "admin";
    },
  },
};
</script>

<style lang="scss" scoped></style>
