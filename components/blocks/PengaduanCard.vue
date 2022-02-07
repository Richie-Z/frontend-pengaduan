<template>
  <nuxt-link
    :to="{
      name: 'pengaduan-id',
      params: { id: pengaduan.id },
    }"
    class="flex justify-between border text-left shadow-md rounded-2xl pl-2 py-2 cursor-pointer hover:shadow-xl hover:bg-slate-200 hover:border-slate-700 hover:text-slate-900 m-5 max-w-md"
  >
    <div class="text-slate-800 my-auto">
      <h5 class="font-bold text-lg break-words">
        {{ pengaduan.laporan }}
      </h5>
      <p class="text-sm font-light text-slate-600">
        {{ pengaduan.createdAt }}
      </p>
    </div>
    <UsersStatusCircle :status="pengaduan.detail.status" />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    pengaduan: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
