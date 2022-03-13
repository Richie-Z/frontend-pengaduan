<template>
  <div class="text-slate-600">
    <nav class="mx-10 my-5 flex items-center justify-between font-semibold">
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
      class="custom-container my-10 first-letter:mr-1 first-letter:text-4xl first-letter:font-semibold first-letter:uppercase"
    >
      {{ pengaduan.isiLaporan }}
    </div>
    <div class="custom-container mt-20">
      <h1 class="text-center text-xl font-bold">Lampiran</h1>
      <div
        v-if="pengaduan.lampiran"
        class="mx-auto mt-10 flex max-w-xl content-center items-center justify-center"
      >
        <div
          v-for="({ filename, location }, i) in JSON.parse(pengaduan.lampiran)"
          :key="i"
          class="mx-2 rounded-lg bg-stone-300 p-5 shadow hover:bg-stone-600 hover:text-stone-100 hover:shadow-xl"
        >
          <a :href="`${$axios.defaults.baseURL}${location}`" target="_blank">
            {{ filename }}
          </a>
        </div>
      </div>
      <div v-else class="mt-20 text-center">Tidak ada lampiran!!</div>
    </div>
    <div class="custom-container mt-20">
      <h1 class="text-center text-xl font-bold">Tanggapan</h1>
      <div v-if="prosesTanggapan.length > 0" class="mt-20">
        <div class="flex flex-wrap justify-center">
          <button
            v-for="(v, i) in prosesTanggapan"
            class="proses"
            :class="{ 'cursor-default !bg-stone-700': activeProses === i }"
            @click="activeProses = i"
          >
            Proses {{ i + 1 }}
          </button>
        </div>
        <div class="flex">
          <div class="mt-6 w-1/2 pl-0 lg:pl-2">
            <div class="">
              <label class="block text-sm text-gray-600">Tanggapan</label>
              <textarea
                class="w-full rounded bg-gray-200 px-5 py-2 text-gray-700 disabled:text-gray-500"
                rows="6"
                v-model="prosesTanggapan[activeProses].tanggapan"
                disabled
              ></textarea>
            </div>
            <div class="">
              <label class="block text-sm text-gray-600"
                >Detail Perubahan</label
              >
              <input
                type="text"
                class="w-full rounded bg-gray-200 px-5 py-2 text-gray-700 disabled:text-gray-500"
                v-model="prosesTanggapan[activeProses].detailPerubahan"
                disabled
              />
            </div>
          </div>
          <div class="mx-2 mt-6 w-1/2 pl-0 lg:pl-2">
            <div class="leading-loose">
              <div class="rounded bg-white p-10 shadow-xl">
                <p class="pb-4 text-center text-lg font-medium text-gray-800">
                  Lampiran
                </p>
                <div
                  v-if="
                    typeof prosesTanggapan[activeProses].lampiran[0] ===
                    'object'
                  "
                >
                  <div>
                    <div
                      v-for="({ filename, location }, i) in prosesTanggapan[
                        activeProses
                      ].lampiran"
                    >
                      <label class="block text-sm text-gray-600" for="cus_name">
                        Lampiran {{ i + 1 }}
                      </label>
                      <a
                        :href="`${$axios.defaults.baseURL}${location}`"
                        target="_blank"
                      >
                        {{ filename }}
                      </a>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p class="text-md block text-gray-600">Tidak ada Lampiran</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mt-20 text-center">Tidak ada Tanggapan!!</div>
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
    prosesTanggapan: [],
    activeProses: 0,
  }),
  created() {
    this.$nuxt.$on("data", (data) => {
      this.pengaduan = data;
      if (data.tanggapan.length > 0)
        this.prosesTanggapan = data.tanggapan.map((x) => ({
          tanggapan: x.tanggapan,
          detailPerubahan: x.detailPerubahan,
          lampiran: JSON.parse(x.lampiran),
          status: data.detail.status,
        }));
    });
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
<style scoped>
.proses {
  @apply m-2 rounded bg-stone-500 px-3 text-stone-100 shadow transition hover:bg-stone-700 hover:text-stone-200;
}
</style>
