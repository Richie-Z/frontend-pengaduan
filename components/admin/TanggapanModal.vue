<template>
  <div class="mx-auto">
    <div class="leading-loose">
      <h1 class="w-full px-10 py-5 pb-6 text-xl font-bold text-black">
        Edit Tanggapan
      </h1>
      <div class="px-10 py-5">
        <div class="">
          <label class="block text-sm text-gray-600" for="name"
            >Tanggapan</label
          >
          <textarea
            class="w-full rounded bg-gray-200 px-5 py-2 text-gray-700 disabled:text-gray-500"
            rows="6"
            v-model="data.tanggapan"
          ></textarea>
        </div>
        <div class="leading-loose">
          <div class="rounded bg-white p-10 shadow-xl">
            <p class="pb-4 text-center text-lg font-medium text-gray-800">
              Lampiran
            </p>
            <div>
              <div v-for="({ filename, location }, i) in data.lampiran">
                <label class="block text-sm text-gray-600" for="cus_name">
                  Lampiran {{ i + 1 }}
                </label>
                <div class="flex justify-between">
                  <a
                    :href="`${$axios.defaults.baseURL}${location}`"
                    target="_blank"
                  >
                    {{ filename }}
                  </a>
                  <button
                    class="btn-lampiran border-red-900 bg-red-500 hover:bg-red-900"
                    @click="deleteLampiran(i)"
                  >
                    x
                  </button>
                </div>
              </div>
              <p class="py-4 text-center text-lg font-medium text-gray-800">
                Tambah Lampiran
              </p>
              <div
                class="my-4 flex justify-center"
                v-for="(data, i) in lampiran"
                :key="i"
              >
                <input
                  type="file"
                  ref="lampiranFiles"
                  class="file:rounded-lg file:border-none file:bg-stone-900 file:px-4 file:text-slate-300 file:shadow-xl hover:file:bg-stone-600 hover:file:text-slate-100"
                />
                <button
                  class="btn-lampiran border-red-900 bg-red-500 hover:bg-red-900"
                  @click="spliceLampiran(i)"
                  v-if="lampiran.length > 1"
                >
                  x
                </button>
                <button
                  class="btn-lampiran border-indigo-900 bg-indigo-400 hover:bg-indigo-900"
                  @click="pushLampiran()"
                  v-if="lampiran.length < 4"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 flex">
          <button
            class="mr-5 rounded bg-gray-900 px-4 py-1 font-light tracking-wider text-white"
            @click="saveChange()"
          >
            Save
          </button>
          <button
            class="rounded bg-red-900 px-4 py-1 font-light tracking-wider text-white"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "~/plugins/swal";

export default {
  props: {
    data: {
      type: Object,
    },
  },
  data: () => ({
    lampiran: [""],
    deleted: [],
  }),
  methods: {
    deleteLampiran(id) {
      this.data.lampiran.splice(id, 1);
      this.deleted.push(id);
    },
    pushLampiran() {
      this.lampiran.length >= 4 ? "" : this.lampiran.push("");
    },
    spliceLampiran(i) {
      this.$refs.lampiranFiles[i].value = "";
      this.lampiran.splice(i, 1);
    },
    async saveChange() {
      let body = new FormData();
      body.append("tanggapan", this.data.tanggapan);
      this.deleted.forEach((x) => body.append("deletedLampiran", x));
      this.$refs.lampiranFiles.forEach((x) =>
        body.append("lampiran", x.files[0])
      );
      const res = await this.$axios.$put(
        `petugas/tanggapan/${this.data.id}`,
        body
      );
      if (res.status) {
        Toast.fire({ icon: "success", title: "Success Update Tanggapan" });
        window.location.reload(true);
      }
    },
  },
};
</script>

<style scoped>
.btn-lampiran {
  @apply ml-3 rounded-lg px-3 font-bold shadow hover:text-slate-200 hover:shadow-xl;
}
</style>
