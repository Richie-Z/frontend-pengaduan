<template>
  <div>
    <h1 class="pb-6 text-3xl text-black">Members</h1>
    <div class="mt-6 w-full">
      <p class="flex items-center pb-3 text-xl">
        <font-awesome-icon icon="fa-solid fa-list" class="mr-3" /> Data Members
      </p>
      <div class="overflow-auto bg-white">
        <vue-good-table
          :columns="columns"
          :rows="data"
          :line-numbers="true"
          :search-options="{ enabled: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'option'">
              <nuxt-link
                :to="{
                  name: 'admin-members-detail',
                  query: {
                    memberIP: props.row.masyarakatIp,
                    nama: props.row.nama || 'Anonymous',
                  },
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
</template>

<script>
export default {
  middleware: "authenticated",
  layout: "admin/default",
  data: () => ({
    columns: [
      { label: "Nama", field: "nama" },
      { label: "IP", field: "masyarakatIp" },
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
      const { data } = await this.$axios.$get("petugas/members");
      data.forEach((x) => {
        let newVal = x;
        newVal.nama = newVal.nama ?? "Anonymous";
        this.data.push(newVal);
      });
    },
  },
};
</script>
