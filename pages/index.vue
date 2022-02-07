<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-center my-10">
      <button
        v-for="({ name, isOpen }, i) in navs"
        :key="i"
        class="relative w-fit h-fit px-5 py-1 text-md border rounded border-black mx-5 hover:bg-stone-700 hover:text-stone-100 transition ease-in-out"
        :class="{
          'bg-stone-700': isOpen,
          'cursor-default': isOpen,
          'text-stone-100': isOpen,
        }"
        @click="openNav(name)"
      >
        <p>{{ name }}</p>
      </button>
    </div>
    <div class="container mx-auto" v-if="navs[0].isOpen">
      <LazyDataDiriCard :ip="ip" />
    </div>
    <div
      class="flex flex-wrap mx-auto content-center justify-center w-10/12"
      v-if="navs[1].isOpen"
    >
      <LazyPengaduanCard
        v-for="(pengaduan, i) in pengaduans"
        :pengaduan="pengaduan"
        :key="i"
      />
      <nuxt-link
        :to="{ name: 'pengaduan-add' }"
        class="fixed bottom-20 right-20 bg-stone-600 rounded-full shadow-xl w-10 h-10 text-stone-100 hover:bg-stone-900 hover:text-stone-200 hover:shadow-2xl text-center py-2"
      >
        +
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data: () => ({
    navs: [
      { name: "Data Diri", isOpen: false },
      { name: "Aduan", isOpen: false },
    ],
    pengaduans: [],
  }),
  methods: {
    openNav(name, fromHook = false) {
      this.navs.forEach((x) => (x.isOpen = x.name === name));
      if (!fromHook) localStorage.setItem("menu", name);
    },
  },
  async asyncData({ $axios }) {
    const { ip } = await $axios.$get("myip");
    return { ip };
  },
  async fetch() {
    const pengaduans = await this.$axios.$get("pengaduan");
    this.pengaduans = pengaduans.data;
  },
  beforeMount() {
    this.openNav(localStorage.getItem("menu") ?? "Data Diri", true);
  },
};
</script>
