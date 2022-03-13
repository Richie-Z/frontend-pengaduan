<template>
  <div>
    <h1 class="pb-6 text-3xl text-black">Users</h1>
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
                  name: 'admin-users-id',
                  params: { id: props.row.id },
                }"
                class="rounded-lg bg-amber-500 px-5 py-2 text-stone-100 shadow-md transition hover:bg-amber-700 hover:text-stone-50"
                >Detail</nuxt-link
              >
              <button
                @click="deletePetugas(props.row.id)"
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
import Swal from "sweetalert2";
export default {
  middleware: "admin-only",
  layout: "admin/default",
  data: () => ({
    columns: [
      { label: "Nama", field: "name" },
      { label: "Username", field: "username" },
      { label: "Role", field: "role" },
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
      const { data } = await this.$axios.$get("admin");
      this.data = data;
    },
    deletePetugas(id) {
      Swal.fire({
        title: "Do you want to delete this Petugas?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.$axios.delete(`admin/${id}`);
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
