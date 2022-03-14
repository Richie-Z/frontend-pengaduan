<template>
  <div>
    <h1 class="w-full pb-6 text-3xl text-black">Detail Pengaduan</h1>
    <div class="flex flex-wrap">
      <div class="my-6 w-full resize pr-0 lg:w-1/2 lg:pr-2">
        <p class="flex items-center pb-6 text-xl">
          <font-awesome-icon icon="fa-solid fa-list" class="mr-3" /> Pengaduan
        </p>
        <div class="leading-loose">
          <div class="rounded bg-white p-10 shadow-xl">
            <div class="">
              <label class="block text-sm text-gray-600" for="name">Name</label>
              <input
                class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
                type="text"
                disabled
                v-model="data.detail.nama"
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="email">IP</label>
              <input
                class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
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
                class="w-full rounded bg-gray-200 px-5 py-2 text-gray-500"
                disabled
                rows="6"
                >{{ data.isiLaporan }}</textarea
              >
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 w-full pl-0 lg:w-1/2 lg:pl-2">
        <p class="flex items-center pb-6 text-xl">
          <font-awesome-icon icon="fa-solid fa-list" class="mr-3" /> Lampiran
        </p>
        <div class="leading-loose">
          <div class="rounded bg-white p-10 shadow-xl">
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
              <p class="text-md block text-gray-600">Tidak ada Lampiran</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 w-full pl-0 lg:pl-2">
        <div class="leading-loose">
          <div class="rounded bg-white p-10 shadow-xl">
            <p class="pb-4 text-center text-lg font-medium text-gray-800">
              Tanggapan
            </p>
            <div class="flex flex-wrap justify-center">
              <button
                v-for="(v, i) in prosesTanggapan"
                class="proses"
                :class="{ 'cursor-default !bg-stone-700': activeProses === i }"
                @click="activeProses = i"
              >
                Proses {{ i + 1 }}
              </button>
              <button class="proses" @click="addProses">+</button>
            </div>
            <div class="flex">
              <div class="mt-6 w-1/2 pl-0 lg:pl-2">
                <div class="">
                  <label class="block text-sm text-gray-600">Tanggapan</label>
                  <textarea
                    class="w-full rounded bg-gray-200 px-5 py-2 text-gray-700 disabled:text-gray-500"
                    rows="6"
                    v-model="prosesTanggapan[activeProses].tanggapan"
                    :disabled="prosesTanggapan[activeProses].detailPerubahan"
                  ></textarea>
                </div>
                <div
                  class=""
                  v-if="prosesTanggapan[activeProses].detailPerubahan"
                >
                  <label class="block text-sm text-gray-600">Penanggap</label>
                  <input
                    v-model="prosesTanggapan[activeProses].penanggap"
                    class="w-full rounded bg-gray-200 px-2 py-2 text-gray-700 disabled:text-gray-500"
                    disabled
                  />
                </div>
                <div class="" v-else>
                  <label class="block text-sm text-gray-600">Status</label>
                  <select
                    v-model="prosesTanggapan[activeProses].status"
                    class="w-full rounded bg-gray-200 px-2 py-2 text-gray-700 disabled:text-gray-500"
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
              <div class="mx-2 mt-6 w-1/2 pl-0 lg:pl-2">
                <div class="leading-loose">
                  <div class="rounded bg-white p-10 shadow-xl">
                    <p
                      class="pb-4 text-center text-lg font-medium text-gray-800"
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
                        <p class="text-md block text-gray-600">
                          Tidak ada Lampiran
                        </p>
                      </div>
                    </div>
                    <div v-else>
                      <div
                        class="my-4 flex justify-center"
                        v-for="(v, lampiranKey) in prosesTanggapan[activeProses]
                          .lampiran"
                      >
                        <input
                          type="file"
                          :ref="`lampiranFiles${activeProses}`"
                          id="lampiranFiles[]"
                          class="file:rounded-lg file:border-none file:bg-stone-900 file:px-4 file:text-slate-300 file:shadow-xl hover:file:bg-stone-600 hover:file:text-slate-100"
                        />
                        <button
                          class="btn-lampiran border-red-900 bg-red-500 hover:bg-red-900"
                          @click="spliceLampiran(activeProses, lampiranKey)"
                          v-if="
                            prosesTanggapan[activeProses].lampiran.length > 1
                          "
                        >
                          x
                        </button>
                        <button
                          class="btn-lampiran border-indigo-900 bg-indigo-400 hover:bg-indigo-900"
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
                class="rounded bg-gray-900 px-4 py-1 font-light tracking-wider text-white"
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
        penanggap: x.penanggap.name,
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
  @apply m-2 rounded bg-stone-500 px-3 text-stone-100 shadow transition hover:bg-stone-700 hover:text-stone-200;
}
.btn-lampiran {
  @apply ml-3 rounded-lg px-3 font-bold shadow hover:text-slate-200 hover:shadow-xl;
}
</style>
