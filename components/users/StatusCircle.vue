<template>
  <button
    class="rounded-full shadow-md w-10 h-10 mx-2 my-auto font-semibold"
    :class="statusColor"
  ></button>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: "selesai",
    },
  },
  computed: {
    statusColor() {
      const STATUS = this.status;
      return STATUS === "belumVerif"
        ? "bg-red-500"
        : STATUS === "proses"
        ? "bg-orange-500"
        : "bg-green-500";
    },
  },
};
</script>

<style lang="scss" scoped></style>
