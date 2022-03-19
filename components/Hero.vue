<template>
  <div
    class="m-auto w-full text-stone-300 shadow-xl"
    :class="[
      {
        'p-44 text-stone-300': isIndex,
        'p-20 text-stone-100': !isIndex && !isAdd,
        'bg-stone-900 py-1': isAdd,
      },
      isIndex ? 'bg-stone-900' : status,
    ]"
  >
    <div class="container mx-auto text-center">
      <h1 class="mb-10 text-7xl font-semibold">{{ title }}</h1>
      <p class="px-20 text-xl leading-relaxed" v-if="isIndex">
        Tempat Untuk Mengadu Semua Yang Mau Diadukan
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isIndex: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "Pengaduan",
    },
    status: {
      type: String,
      default: "",
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
