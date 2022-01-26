<template>
  <div class="m-auto w-full bg-stone-900 text-stone-300 mt-20">
    <div class="container mx-auto text-center">
      <p class="text-lg">Pengaduan @ {{ getYear() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getYear() {
      return new Date().getUTCFullYear();
    },
  },
};
</script>
