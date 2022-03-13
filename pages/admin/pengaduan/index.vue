<template>
  <div>
    <h1 class="pb-6 text-3xl text-black">Pengaduan</h1>
    <div class="mt-6 w-full">
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
              :class="{
                'text-red-900': props.row.detail.status === 'belumVerif',
                'text-yellow-900': props.row.detail.status === 'proses',
                'text-green-900': props.row.detail.status === 'selesai',
              }"
              class="relative inline-block px-3 py-1 font-semibold leading-tight"
            >
              <span
                aria-hidden
                :class="{
                  'bg-red-200': props.row.detail.status === 'belumVerif',
                  'bg-yellow-200': props.row.detail.status === 'proses',
                  'bg-green-200': props.row.detail.status === 'selesai',
                }"
                class="absolute inset-0 rounded-full opacity-50"
              ></span>
              <span class="relative">{{ props.row.detail.status }}</span>
            </span>
            <span v-else-if="props.column.field === 'option'">
              <nuxt-link
                :to="{
                  name: 'admin-pengaduan-id',
                  params: { id: props.row.id },
                }"
                class="rounded-lg bg-amber-500 px-5 py-2 text-stone-100 shadow-md transition hover:bg-amber-700 hover:text-stone-50"
                >Detail</nuxt-link
              >
              <button
                @click="deletePengaduan(props.row.id)"
                class="rounded-lg bg-rose-500 px-5 py-2 text-stone-100 shadow-md transition hover:bg-rose-700 hover:text-stone-50"
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
import { Swal } from "~/plugins/swal";

export default {
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
    await this.getData();
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
    deletePengaduan(id) {
      Swal.fire({
        title: "Do you want to delete this pengaduan?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.$axios.delete(`petugas/pengaduan/${id}`);
          if (response.status) {
            this.data = [];
            this.getData();
          }
          Swal.fire(
            response.message,
            "",
            response.status ? "success" : "error"
          );
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
  },
};
</script>
