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
    <transition>
      <div class="container mx-auto" v-if="navs[0].isOpen">
        <div class="rounded-2xl shadow-lg w-1/3 flex flex-col p-10 mx-auto">
          <div class="my-3">
            <label for="name">Nama</label>
            <input
              type="text"
              id="name"
              v-model="dataDiri.name"
              class="w-full border border-slate-800 rounded-lg focus:ring-purple-900 px-2 py-1"
            />
          </div>
          <div class="my-3">
            <label for="ip">IP Address</label>
            <input
              type="text"
              id="ip"
              v-model="ip"
              class="w-full border border-slate-800 rounded-lg px-2 py-1 disabled:bg-slate-200"
              disabled
            />
          </div>
        </div>
      </div>
      <div
        class="flex flex-wrap w-3/5 mx-auto content-center justify-center"
        v-else
      >
        <div
          class="flex justify-between border text-left shadow-md rounded-2xl pl-2 py-2 cursor-pointer hover:shadow-xl hover:bg-slate-200 hover:border-slate-700 hover:text-slate-900 m-5"
          v-for="n in 10"
          :key="n"
        >
          <div class="text-slate-800">
            <h5 class="font-bold text-lg">My Dog is DYING !!</h5>
            <p class="text-sm font-light text-slate-600">Dec 22, 2021</p>
          </div>
          <div
            class="rounded-full bg-red-500 w-10 h-10 ml-24 mr-5 py-[9px] px-[17px]"
          >
            ?
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      navs: [
        { name: "Data Diri", isOpen: false },
        { name: "Aduan", isOpen: false },
      ],
      dataDiri: {
        name: "Richie Kuns",
      },
    };
  },
  methods: {
    openNav(name, fromHook = false) {
      this.navs.forEach((x) => (x.isOpen = x.name !== name ? false : true));
      if (!fromHook) {
        localStorage.setItem("menu", name);
      }
    },
  },
  async asyncData({ $axios }) {
    const { ip } = await $axios.$get("http://localhost:3000/api/v1/myip");
    return { ip };
  },
  beforeMount() {
    this.openNav(localStorage.getItem("menu") ?? "Data Diri", true);
  },
  head() {
    return {
      title: "Pengaduan - Tempat Untuk Mengadu Semua Yang Mau Diadukan",
    };
  },
};
</script>
