<template>
  <div class="text-slate-600">
    <nav class="flex justify-between mx-10 my-5 items-center font-semibold">
      <h1>{{ pengaduan.createdAt }}</h1>
      <div class="flex items-center">
        <h1>
          {{
            pengaduan.detail.status === "belumVerif"
              ? "Belum Verif"
              : pengaduan.detail.status
                  .split("")
                  .map((x, i) => (i === 0 ? x.toUpperCase() : x))
                  .join("")
          }}
        </h1>
        <UsersStatusCircle :status="pengaduan.detail.status" />
      </div>
    </nav>
    <div
      class="custom-container my-10 first-letter:text-4xl first-letter:font-semibold first-letter:mr-1 first-letter:uppercase"
    >
      {{ pengaduan.isiLaporan }}
    </div>
    <div class="custom-container mt-20">
      <h1 class="text-center font-bold text-xl">Lampiran</h1>
      <div
        v-if="pengaduan.lampiran"
        class="flex max-w-xl justify-center items-center mt-10 content-center mx-auto"
      >
        <div
          v-for="({ filename, location }, i) in JSON.parse(pengaduan.lampiran)"
          :key="i"
          class="bg-stone-300 rounded-lg shadow p-5 mx-2 hover:bg-stone-600 hover:text-stone-100 hover:shadow-xl"
        >
          <a :href="`${$axios.defaults.baseURL}${location}`" target="_blank">
            {{ filename }}
          </a>
        </div>
      </div>
      <div v-else class="text-center mt-20">Tidak ada lampiran!!</div>
    </div>
    <UsersBackToIndex />
  </div>
</template>

<script>
export default {
  layout: "users/PengaduanSlug",
  data: () => ({
    pengaduan: {
      detail: {
        status: "",
      },
    },
  }),
  created() {
    this.$nuxt.$on("data", (data) => (this.pengaduan = data));
  },
  beforeDestroy() {
    this.$nuxt.$off("data");
  },
  head() {
    return {
      title: `${this.pengaduan.laporan ?? ""} - Pengaduan`,
    };
  },
};
</script>
