<template>
  <div class="m-auto w-full bg-stone-900 text-stone-300 mt-20 shadow-xl">
    <div class="container mx-auto text-center">
      <p class="text-lg">Pengaduan @ {{ year }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getUTCFullYear();
    },
  },
};
</script>
