<template>
  <div>
    <aside
      class="relative hidden h-screen w-64 bg-sidebar-500 shadow-xl sm:block"
    >
      <div class="p-6">
        <nuxt-link
          :to="{ name: 'admin' }"
          class="text-3xl font-semibold uppercase text-white hover:text-gray-300"
          >Admin Pengaduan</nuxt-link
        >
      </div>
      <nav class="pt-3 text-base font-semibold text-white" id="navbar">
        <nuxt-link
          :to="{ name: 'admin' }"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <font-awesome-icon icon="fa-solid fa-tachometer-alt" class="mr-3" />
          Dashboard
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'admin-pengaduan' }"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <font-awesome-icon icon="fa-solid fa-sticky-note" class="mr-3" />
          Pengaduan
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'admin-members' }"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <font-awesome-icon icon="fa-solid fa-table" class="mr-3" />
          Members
        </nuxt-link>
        <nuxt-link
          v-if="isAdmin"
          :to="{ name: 'admin-users' }"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:bg-sidebar-900 hover:opacity-100"
        >
          <font-awesome-icon icon="fa-solid fa-align-left" class="mr-3" />
          Users
        </nuxt-link>
      </nav>
    </aside>
  </div>
</template>
<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
