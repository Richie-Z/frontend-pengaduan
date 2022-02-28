<template>
  <div>
    <aside class="relative hidden w-64 h-screen shadow-xl bg-sidebar sm:block">
      <div class="p-6">
        <a
          href="index.html"
          class="text-3xl font-semibold text-white uppercase hover:text-gray-300"
          >Admin</a
        >
        <button
          class="flex items-center justify-center w-full py-2 mt-5 font-semibold bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg shadow-lg cta-btn hover:shadow-xl hover:bg-gray-300"
        >
          <font-awesome-icon icon="fa-solid fa-plus" class="mr-3" />
          New Report
        </button>
      </div>
      <nav class="pt-3 text-base font-semibold text-white">
        <a
          href="index.html"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <font-awesome-icon icon="fa-solid fa-tachometer-alt" class="mr-3" />
          Dashboard
        </a>
        <a
          href="blank.html"
          class="flex items-center py-4 pl-6 text-white active-nav-link nav-item"
        >
          <font-awesome-icon icon="fa-solid fa-sticky-note" class="mr-3" />
          Blank Page
        </a>
        <a
          href="tables.html"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <font-awesome-icon icon="fa-solid fa-table" class="mr-3" />
          Tables
        </a>
        <a
          href="forms.html"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <font-awesome-icon icon="fa-solid fa-align-left" class="mr-3" />
          Forms
        </a>
        <a
          href="tabs.html"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <font-awesome-icon icon="fa-solid fa-tablet-alt" class="mr-3" />
          Tabbed Content
        </a>
        <a
          href="calendar.html"
          class="flex items-center py-4 pl-6 text-white opacity-75 hover:opacity-100 nav-item"
        >
          <font-awesome-icon icon="fa-solid fa-calendar" class="mr-3" />
          Calendar
        </a>
      </nav>
      <a
        href="#"
        class="absolute bottom-0 flex items-center justify-center w-full py-4 text-white upgrade-btn active-nav-link"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-circle-up" class="mr-3" />
        Upgrade to Pro!
      </a>
    </aside>
  </div>
</template>
