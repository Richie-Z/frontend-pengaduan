<template>
  <div class="rounded-2xl shadow-lg w-1/3 flex flex-col p-10 mx-auto">
    <div class="my-3">
      <label for="name">Nama</label>
      <input
        type="text"
        id="name"
        v-model="dataDiri.name"
        class="w-full border border-slate-800 rounded-lg focus:ring-purple-900 px-2 py-1"
      />
    </div>
    <div class="my-3">
      <label for="ip">IP Address</label>
      <input
        type="text"
        id="ip"
        v-model="ip"
        class="w-full border border-slate-800 rounded-lg px-2 py-1 disabled:bg-slate-200"
        disabled
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ip: {
      type: String,
      default: "127.0.0.1",
    },
  },
  data() {
    return {
      dataDiri: { name: "" },
    };
  },
  watch: {
    "dataDiri.name": (newValue) => localStorage.setItem("name", newValue),
  },
  beforeMount() {
    this.dataDiri.name = localStorage.getItem("name") ?? " ";
  },
};
</script>

<style lang="scss" scoped></style>
