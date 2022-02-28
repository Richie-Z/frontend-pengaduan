<template>
  <div>
    <aside
      class="relative hidden w-64 h-screen shadow-xl bg-sidebar-500 sm:block"
    >
      <div class="p-6">
        <nuxt-link
          :to="{ name: 'admin' }"
          class="text-3xl font-semibold text-white uppercase hover:text-gray-300"
          >Admin Pengaduan</nuxt-link
        >
      </div>
      <nav class="pt-3 text-base font-semibold text-white" id="navbar">
        <nuxt-link
          :to="{ name: 'admin' }"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <font-awesome-icon icon="fa-solid fa-tachometer-alt" class="mr-3" />
          Dashboard
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'admin-pengaduan' }"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <font-awesome-icon icon="fa-solid fa-sticky-note" class="mr-3" />
          Pengaduan
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'admin-members' }"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <font-awesome-icon icon="fa-solid fa-table" class="mr-3" />
          Members
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'admin-users' }"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:opacity-100 hover:bg-sidebar-900"
        >
          <font-awesome-icon icon="fa-solid fa-align-left" class="mr-3" />
          Users
        </nuxt-link>
      </nav>
    </aside>
  </div>
</template>
