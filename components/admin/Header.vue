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
          class="absolute w-32 py-2 mt-16 bg-white rounded-lg shadow-lg"
        >
          <a href="#" class="block px-4 py-2 account-link hover:text-white"
            >Account</a
          >
          <a href="#" class="block px-4 py-2 account-link hover:text-white"
            >Support</a
          >
          <a href="#" class="block px-4 py-2 account-link hover:text-white"
            >Sign Out</a
          >
        </div>
      </div>
    </header>

    <!-- Mobile Header & Nav -->
    <header class="w-full px-6 py-5 bg-sidebar sm:hidden">
      <div class="flex items-center justify-between">
        <a
          href="index.html"
          class="text-3xl font-semibold text-white uppercase hover:text-gray-300"
          >Admin</a
        >
        <button
          @click="isOpen = !isOpen"
          class="text-3xl text-white focus:outline-none"
        >
          <i v-if="!isOpen" class="fas fa-bars"></i>
          <i v-if="isOpen" class="fas fa-times"></i>
        </button>
      </div>

      <!-- Dropdown Nav -->
      <nav :class="isOpen ? 'flex' : 'hidden'" class="flex flex-col pt-4">
        <a
          href="index.html"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <i class="mr-3 fas fa-tachometer-alt"></i>
          Dashboard
        </a>
        <a
          href="blank.html"
          class="flex items-center py-2 pl-4 text-white active-nav-link nav-item"
        >
          <i class="mr-3 fas fa-sticky-note"></i>
          Blank Page
        </a>
        <a
          href="tables.html"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <i class="mr-3 fas fa-table"></i>
          Tables
        </a>
        <a
          href="forms.html"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <i class="mr-3 fas fa-align-left"></i>
          Forms
        </a>
        <a
          href="tabs.html"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <i class="mr-3 fas fa-tablet-alt"></i>
          Tabbed Content
        </a>
        <a
          href="calendar.html"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <i class="mr-3 fas fa-calendar"></i>
          Calendar
        </a>
        <a
          href="#"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <i class="mr-3 fas fa-cogs"></i>
          Support
        </a>
        <a
          href="#"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <i class="mr-3 fas fa-user"></i>
          My Account
        </a>
        <a
          href="#"
          class="flex items-center py-2 pl-4 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <i class="mr-3 fas fa-sign-out-alt"></i>
          Sign Out
        </a>
        <button
          class="flex items-center justify-center w-full py-2 mt-3 font-semibold bg-white rounded-lg shadow-lg cta-btn hover:shadow-xl hover:bg-gray-300"
        >
          <i class="mr-3 fas fa-arrow-circle-up"></i> Upgrade to Pro!
        </button>
      </nav>
      <!-- <button class="flex items-center justify-center w-full py-2 mt-5 font-semibold bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg shadow-lg cta-btn hover:shadow-xl hover:bg-gray-300">
                <i class="mr-3 fas fa-plus"></i> New Report
            </button> -->
    </header>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
  }),
};
</script>

<style lang="scss" scoped></style>
