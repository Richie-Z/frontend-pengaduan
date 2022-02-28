<template>
  <div>
    <h1 class="pb-6 text-3xl text-black">Members</h1>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  layout: "admin/default",
};
</script>
