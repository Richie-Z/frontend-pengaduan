<template>
  <div class="flex bg-gray-100 font-karla">
    <AdminSidebar />
    <div class="relative flex flex-col w-full h-screen overflow-y-hidden">
      <AdminHeader />
      <div class="flex flex-col w-full h-screen overflow-x-hidden border-t">
        <main class="flex-grow w-full p-6">
          <nuxt />
          <!-- Content goes here! 😁 -->
        </main>
        <footer class="w-full p-4 text-right bg-white">
          Pengaduan @ {{ year }}
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getUTCFullYear();
    },
  },
};
</script>

<style lang="scss" scoped></style>
