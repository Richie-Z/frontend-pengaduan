<template>
  <div
    class="m-auto text-stone-300 w-full shadow-xl"
    :class="[
      {
        'p-44 text-stone-300': isIndex,
        'p-20 text-stone-100': !isIndex && !isAdd,
        'py-1 bg-stone-900': isAdd,
      },
      isIndex ? 'bg-stone-900' : status,
    ]"
  >
    <div class="container mx-auto text-center">
      <h1 class="text-7xl font-semibold mb-10">{{ title }}</h1>
      <p class="text-xl leading-relaxed px-20" v-if="isIndex">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, et
        fugiat dolorum dolores est ex magnam repellat quos id cum quidem
        pariatur aperiam, ducimus accusantium at, sequi ut dicta ratione?
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
