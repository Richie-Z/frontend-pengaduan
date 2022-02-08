<template>
  <div>
    <Hero :isIndex="false" :title="pengaduan.laporan" :status="status" />
    <nuxt class="min-h-screen" />
    <Footer />
  </div>
</template>

<script>
export default {
  data: () => ({
    pengaduan: {},
    status: "bg-stone-900",
  }),
  methods: {
    async getPengaduan() {
      try {
        let { data } = await this.$axios.$get(
          `pengaduan/${this.$route.params.id}`
        );
        this.pengaduan = data;
        this.$nuxt.$emit("data", data);
        this.status = this.bgColor(data.detail.status);
      } catch (error) {
        console.log(error);
      }
    },
    bgColor(status) {
      let color =
        status === "belumVerif"
          ? "bg-red-500"
          : status === "proses"
          ? "bg-orange-500"
          : "bg-green-500";
      return color;
    },
  },
  created() {
    this.getPengaduan();
  },
};
</script>
