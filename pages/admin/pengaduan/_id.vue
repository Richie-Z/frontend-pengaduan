<template>
  <div>
    <h1 class="w-full text-3xl text-black pb-6">Detail Pengaduan</h1>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-1/2 my-6 pr-0 lg:pr-2 resize">
        <p class="text-xl pb-6 flex items-center">
          <font-awesome-icon icon="fa-solid fa-list" class="mr-3" /> Pengaduan
        </p>
        <div class="leading-loose">
          <div class="p-10 bg-white rounded shadow-xl">
            <div class="">
              <label class="block text-sm text-gray-600" for="name">Name</label>
              <input
                class="w-full px-5 py-1 text-gray-500 bg-gray-200 rounded"
                type="text"
                disabled
                v-model="data.detail.nama"
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="email">IP</label>
              <input
                class="w-full px-5 py-1 text-gray-500 bg-gray-200 rounded"
                type="text"
                disabled
                v-model="data.detail.masyarakatIp"
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="message"
                >Pengaduan</label
              >
              <textarea
                class="w-full px-5 py-2 text-gray-500 bg-gray-200 rounded"
                disabled
                rows="6"
                >{{ data.isiLaporan }}</textarea
              >
            </div>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
        <p class="text-xl pb-6 flex items-center">
          <font-awesome-icon icon="fa-solid fa-list" class="mr-3" /> Lampiran
        </p>
        <div class="leading-loose">
          <div class="p-10 bg-white rounded shadow-xl">
            <div v-if="data.lampiran">
              <div
                v-for="({ filename, location }, i) in JSON.parse(data.lampiran)"
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
            <div v-else>
              <p class="block text-md text-gray-600">Tidak ada Lampiran</p>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full mt-6 pl-0 lg:pl-2">
        <div class="leading-loose">
          <div class="p-10 bg-white rounded shadow-xl">
            <p class="text-lg text-center text-gray-800 font-medium pb-4">
              Tanggapan
            </p>
            <div class="flex justify-center flex-wrap">
              <button
                v-for="(v, i) in prosesTanggapan"
                class="proses"
                :class="{ '!bg-stone-700 cursor-default': activeProses === i }"
                @click="activeProses = i"
              >
                Proses {{ i + 1 }}
              </button>
              <button class="proses" @click="addProses">+</button>
            </div>
            <div class="flex">
              <div class="w-1/2 mt-6 pl-0 lg:pl-2">
                <div class="">
                  <label class="block text-sm text-gray-600">Tanggapan</label>
                  <textarea
                    class="w-full px-5 py-2 text-gray-700 disabled:text-gray-500 bg-gray-200 rounded"
                    rows="6"
                    v-model="prosesTanggapan[activeProses].tanggapan"
                    :disabled="prosesTanggapan[activeProses].detailPerubahan"
                  ></textarea>
                </div>
                <div class="">
                  <label class="block text-sm text-gray-600">Status</label>
                  <select
                    v-model="prosesTanggapan[activeProses].status"
                    class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded disabled:text-gray-500"
                    :disabled="prosesTanggapan[activeProses].detailPerubahan"
                  >
                    <option
                      v-for="[key, value] of Object.entries(statusTanggapan)"
                      :value="key"
                    >
                      {{ value }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-1/2 mt-6 pl-0 lg:pl-2 mx-2">
                <div class="leading-loose">
                  <div class="p-10 bg-white rounded shadow-xl">
                    <p
                      class="text-lg text-center text-gray-800 font-medium pb-4"
                    >
                      Lampiran
                    </p>
                    <div v-if="prosesTanggapan[activeProses].detailPerubahan">
                      <div>
                        <div
                          v-for="({ filename, location }, i) in prosesTanggapan[
                            activeProses
                          ].lampiran"
                        >
                          <label
                            class="block text-sm text-gray-600"
                            for="cus_name"
                          >
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
                      <div
                        v-if="
                          typeof prosesTanggapan[activeProses].lampiran[0] ===
                          'undefined'
                        "
                      >
                        <p class="block text-md text-gray-600">
                          Tidak ada Lampiran
                        </p>
                      </div>
                    </div>
                    <div v-else>
                      <div
                        class="flex justify-center my-4"
                        v-for="(v, lampiranKey) in prosesTanggapan[activeProses]
                          .lampiran"
                      >
                        <input
                          type="file"
                          :ref="`lampiranFiles${activeProses}`"
                          id="lampiranFiles[]"
                          class="file:bg-stone-900 file:rounded-lg file:text-slate-300 file:border-none file:shadow-xl hover:file:bg-stone-600 hover:file:text-slate-100 file:px-4"
                        />
                        <button
                          class="btn-lampiran bg-red-500 border-red-900 hover:bg-red-900"
                          @click="spliceLampiran(activeProses, lampiranKey)"
                          v-if="
                            prosesTanggapan[activeProses].lampiran.length > 1
                          "
                        >
                          x
                        </button>
                        <button
                          class="btn-lampiran bg-indigo-400 border-indigo-900 hover:bg-indigo-900"
                          @click="pushLampiran(activeProses)"
                          v-if="
                            prosesTanggapan[activeProses].lampiran.length < 6
                          "
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="mt-6"
              v-if="!prosesTanggapan[activeProses].detailPerubahan"
            >
              <button
                class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                @click="saveTanggapan(activeProses)"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "~/plugins/swal";

export default {
  layout: "admin/default",
  data: () => ({
    data: {
      detail: {
        nama: "",
        masyarakatIp: "",
        status: "",
      },
    },
    prosesTanggapan: [{ tanggapan: "", status: "", lampiran: [""] }],
    statusTanggapan: {
      belumVerif: "Belum Verif",
      proses: "Proses",
      selesai: "Selesai",
    },
    activeProses: 0,
  }),
  async fetch() {
    const { data } = await this.$axios.$get(
      `pengaduan/${this.$route.params.id}`
    );
    data.detail.nama = data.detail.nama ?? "Anonymous";
    if (data.tanggapan.length > 0)
      this.prosesTanggapan = data.tanggapan.map((x) => ({
        tanggapan: x.tanggapan,
        detailPerubahan: x.detailPerubahan,
        lampiran: JSON.parse(x.lampiran),
        status: data.detail.status,
      }));
    this.data = data;
  },
  methods: {
    pushLampiran(key) {
      this.prosesTanggapan[key].lampiran.length >= 6
        ? ""
        : this.prosesTanggapan[key].lampiran.push("");
    },
    spliceLampiran(key, i) {
      this.$refs[`lampiranFiles${key}`][i].value = "";
      this.prosesTanggapan[key].lampiran.splice(i, 1);
    },
    addProses() {
      this.prosesTanggapan.push({ tanggapan: "", status: "", lampiran: [""] });
      this.activeProses = this.prosesTanggapan.length - 1;
    },
    async saveTanggapan(id) {
      const body = new FormData();
      body.append("tanggapan", this.prosesTanggapan[id].tanggapan);
      body.append("statusVerif", this.prosesTanggapan[id].status);
      this.$refs[`lampiranFiles${id}`].forEach((x) =>
        body.append("lampiran", x.files[0])
      );
      const res = await this.$axios.$put(
        `petugas/pengaduan/${this.$route.params.id}`,
        body
      );
      Toast.fire({
        icon: res.status ? "success" : "error",
        title: res.message ?? "Error",
      });
      if (res.status) {
        this.$nuxt.$router.push({ name: "admin-pengaduan" });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.proses {
  @apply m-2 bg-stone-500 px-3 rounded shadow text-stone-100 transition hover:text-stone-200 hover:bg-stone-700;
}
.btn-lampiran {
  @apply ml-3 px-3 rounded-lg font-bold shadow hover:shadow-xl hover:text-slate-200;
}
</style>
