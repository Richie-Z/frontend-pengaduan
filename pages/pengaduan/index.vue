<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    window?.onNuxtReady(() => {
      window.$nuxt.$router.push({ name: "index" });
    });
  },
};
</script>

<style lang="scss" scoped></style>
