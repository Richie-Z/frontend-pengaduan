<template>
  <div class="text-slate-600">
    <div class="flex justify-between">
      <div class="!ml-20 !mr-10 custom-container mt-12 w-full">
        <h1 class="text-center font-bold text-xl mb-5">Isi Laporan</h1>
        <textarea
          v-model="post.isiLaporan"
          class="border w-full p-2 h-full rounded-lg shadow focus:outline-stone-900 resize-none"
          rows="10"
        ></textarea>
      </div>
      <div class="custom-container mt-12 flex flex-col">
        <h1 class="text-center font-bold text-xl">Lampiran*</h1>
        <div
          class="flex justify-center my-4"
          v-for="(data, i) in post.lampiran"
          :key="i"
        >
          <input
            type="file"
            ref="lampiranFiles"
            class="file:bg-stone-900 file:rounded-lg file:text-slate-300 file:border-none file:shadow-xl hover:file:bg-stone-600 hover:file:text-slate-100 file:px-4"
            @change="previewFiles(i)"
          />
          <button
            class="btn-lampiran bg-red-500 border-red-900 hover:bg-red-900"
            @click="spliceLampiran(i)"
            v-if="post.lampiran.length > 1"
          >
            x
          </button>
          <button
            class="btn-lampiran bg-indigo-400 border-indigo-900 hover:bg-indigo-900"
            @click="pushLampiran()"
            v-if="post.lampiran.length < 6"
          >
            +
          </button>
        </div>
        <p class="text-right font-light text-xs italic mt-auto">
          *Lampiran max 6 item, bisa dikosongkan
        </p>
      </div>
    </div>
    <UsersBackToIndex />
    <center>
      <button
        class="bg-violet-600 hover:bg-violet-900 text-slate-200 hover:text-slate-50 rounded-full shadow hover:shadow-lg mt-10 px-5 py-2"
        @click="saveLampiran"
      >
        Save
      </button>
    </center>
  </div>
</template>

<script>
export default {
  layout: "PengaduanAdd",
  data: () => ({
    post: {
      isiLaporan: "",
      lampiran: [""],
    },
  }),
  methods: {
    pushLampiran() {
      this.post.lampiran.length >= 6 ? "" : this.post.lampiran.push("");
    },
    spliceLampiran(i) {
      this.$refs.lampiranFiles[i].value = "";
      this.post.lampiran.splice(i, 1);
    },
    previewFiles(i) {
      this.post.lampiran[i] = this.$refs.lampiranFiles[i].files;
    },
    async saveLampiran() {
      let body = new FormData();
      body.append("isiLaporan", this.post.isiLaporan);
      this.$refs.lampiranFiles.forEach((x) =>
        body.append("lampiran", x.files[0])
      );
      await this.$axios.$post("pengaduan", body);
    },
  },
};
</script>

<style scoped>
.btn-lampiran {
  @apply ml-3 px-3 rounded-lg font-bold shadow hover:shadow-xl hover:text-slate-200;
}
</style>
