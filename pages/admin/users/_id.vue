<template>
  <div>
    <h1 class="w-full pb-6 text-3xl text-black">Detail Users</h1>
    <div class="flex flex-wrap">
      <div class="my-6 w-full resize pr-0">
        <p class="flex items-center pb-6 text-xl">
          <font-awesome-icon icon="fa-solid fa-list" class="mr-3" /> Users
        </p>
        <div class="leading-loose">
          <div class="rounded bg-white p-10 shadow-xl">
            <div class="">
              <label class="block text-sm text-gray-600" for="name">Name</label>
              <input
                class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
                type="text"
                disabled
                v-model="data.name"
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="email"
                >Username</label
              >
              <input
                class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
                type="text"
                disabled
                v-model="data.username"
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="message"
                >Role</label
              >
              <input
                class="w-full rounded bg-gray-200 px-5 py-1 text-gray-500"
                type="text"
                disabled
                v-model="data.role"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 w-full pl-0">
        <p class="flex items-center pb-6 text-xl">
          <font-awesome-icon icon="fa-solid fa-list" class="mr-3" /> Tanggapan
        </p>
        <div class="leading-loose">
          <div class="rounded bg-white p-10 shadow-xl">
            <vue-good-table
              :columns="columns"
              :rows="row"
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
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  layout: "admin/default",
  data: () => ({
    data: {
      tanggapan: [],
    },
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
    row: [],
  }),
  async fetch() {
    const { data } = await this.$axios.$get(`admin/${this.$route.params.id}`);
    if (data.tanggapan.length > 0) {
      data.tanggapan.forEach((val) => {
        let newVal = val.pengaduan;
        newVal.detail.nama = newVal.detail.nama ?? "Anonymous";
        this.row.push(newVal);
      });
    }
    this.data = data;
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
