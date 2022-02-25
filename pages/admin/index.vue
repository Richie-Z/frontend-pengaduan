<template>
  <div></div>
</template>

<script>
export default {
  // middleware: "authenticated",
  async mounted() {
    const data = await this.$axios.$get("/api/auth/me");
    console.log(data);
  },
};
</script>

<style lang="scss" scoped></style>
