<template>
  <div>
    <h1 class="pb-6 text-3xl text-black">Dashboard</h1>
    <div class="-mx-2 md:flex">
      <div class="w-full px-2 md:w-1/3">
        <div class="mb-4 rounded-lg shadow-sm">
          <div
            class="relative overflow-hidden rounded-lg bg-white shadow-lg md:shadow-xl"
          >
            <div class="relative z-10 px-3 pt-8 pb-10 text-center">
              <h4 class="text-sm uppercase leading-tight text-gray-500">
                Pengaduan
              </h4>
              <h3
                class="my-3 text-3xl font-semibold leading-tight text-gray-700"
              >
                {{ data.pengaduan }}
              </h3>
              <p class="text-xs leading-tight text-red-500">▼ 42.8%</p>
            </div>
            <div class="absolute inset-x-0 bottom-0">
              <canvas id="chart2" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-2 md:w-1/3">
        <div class="mb-4 rounded-lg shadow-sm">
          <div
            class="relative overflow-hidden rounded-lg bg-white shadow-lg md:shadow-xl"
          >
            <div class="relative z-10 px-3 pt-8 pb-10 text-center">
              <h4 class="text-sm uppercase leading-tight text-gray-500">
                Members
              </h4>
              <h3
                class="my-3 text-3xl font-semibold leading-tight text-gray-700"
              >
                {{ data.members }}
              </h3>
              <p class="text-xs leading-tight text-green-500">▲ 57.1%</p>
            </div>
            <div class="absolute inset-x-0 bottom-0">
              <canvas id="chart1" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-2 md:w-1/3">
        <div class="mb-4 rounded-lg shadow-sm">
          <div
            class="relative overflow-hidden rounded-lg bg-white shadow-lg md:shadow-xl"
          >
            <div class="relative z-10 px-3 pt-8 pb-10 text-center">
              <h4 class="text-sm uppercase leading-tight text-gray-500">
                Users
              </h4>
              <h3
                class="my-3 text-3xl font-semibold leading-tight text-gray-700"
              >
                {{ data.petugas }}
              </h3>
              <p class="text-xs leading-tight text-green-500">▲ 8.2%</p>
            </div>
            <div class="absolute inset-x-0 bottom-0">
              <canvas id="chart3" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "admin/default",
  async asyncData({ $axios }) {
    const { data } = await $axios.$get("petugas/dashboard");
    return { data };
  },
  computed: {
    ...mapGetters({ petugas: "petugas/getPetugas" }),
  },
};
</script>
