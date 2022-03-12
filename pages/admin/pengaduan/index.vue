<template>
  <div>
    <h1 class="pb-6 text-3xl text-black">Pengaduan</h1>
    <div class="w-full mt-6">
      <p class="flex items-center pb-3 text-xl">
        <font-awesome-icon icon="fa-solid fa-list" class="mr-3" /> Data
        Pengaduan
      </p>
      <div class="overflow-auto bg-white">
        <vue-good-table
          :columns="columns"
          :rows="data"
          :line-numbers="true"
          :search-options="{ enabled: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span
              v-if="props.column.field === 'detail.status'"
              :class="getStatusColor(props.row.detail.status, 'text')"
              class="relative inline-block px-3 py-1 font-semibold leading-tight"
            >
              <span
                aria-hidden
                :class="getStatusColor(props.row.detail.status, 'bg')"
                class="absolute inset-0 bg-red-200 rounded-full opacity-50"
              ></span>
              <span class="relative">{{ props.row.detail.status }}</span>
            </span>
            <span v-else-if="props.column.field === 'option'">
              <nuxt-link
                :to="{
                  name: 'admin-pengaduan-id',
                  params: { id: props.row.id },
                }"
                class="px-5 py-2 transition rounded-lg shadow-md text-stone-100 bg-amber-500 hover:bg-amber-700 hover:text-stone-50"
                >Detail</nuxt-link
              >
              <button
                @click="deletePengaduan(props.row.id)"
                class="px-5 py-2 transition rounded-lg shadow-md text-stone-100 bg-rose-500 hover:bg-rose-700 hover:text-stone-50"
              >
                Delete
              </button>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "~/plugins/swal";

export default {
  middleware: "authenticated",
  layout: "admin/default",
  data: () => ({
    columns: [
      { label: "Nama", field: "detail.nama" },
      { label: "IP", field: "detail.masyarakatIp" },
      { label: "Laporan", field: "laporan" },
      { label: "Status", field: "detail.status" },
      { label: "Created At", field: "createdAt" },
      {
        label: "Option",
        field: "option",
        sortable: false,
        globalSearchDisabled: true,
      },
    ],
    data: [],
  }),
  async fetch() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data } = await this.$axios.$get("petugas/pengaduan/all");
      data.forEach((x) => {
        let newVal = x;
        newVal.detail.nama = newVal.detail.nama ?? "Anonymous";
        this.data.push(newVal);
      });
    },
    getStatusColor(data, mode) {
      let color =
        data === "belumVerif" ? "red" : data === "proses" ? "orange" : "green";
      return mode === "text" ? `text-${color}-900` : `bg-${color}-200`;
    },
    async deletePengaduan(id) {
      const response = await this.$axios.delete(`petugas/pengaduan/${id}`);
      if (response.status) {
        this.data = [];
        this.getData();
      }
      Toast.fire({
        icon: response.status ? "success" : "error",
        title: response.message,
      });
    },
  },
};
</script>
