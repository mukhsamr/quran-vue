<template>
  <NavHome v-once />
  <template v-for="penanda in penandas" :key="penanda.id">
    <router-link
      v-if="penanda.catatan"
      :to="{
        name: 'penandaEdit',
        params: { id: penanda.id },
      }"
    >
      <div class="flex p-4 items-center border-b-2">
        <div class="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <div>{{ penanda.surat.nama }}</div>
          <div class="text-xs">
            <span class="text-yellow-400">AYAT {{ penanda.ayat }} - </span>
            <span>{{ penanda.tanggal }}</span>
          </div>
        </div>
      </div>
    </router-link>
    <router-link
      v-else
      :to="{
        name: 'ayat',
        params: { id: penanda.surat_id },
        query: { ayat: penanda.ayat },
      }"
    >
      <div class="flex p-4 items-center border-b-2">
        <div class="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <div>{{ penanda.surat.nama }}</div>
          <div class="text-xs">
            <span class="text-yellow-400">AYAT {{ penanda.ayat }} - </span>
            <span>{{ penanda.tanggal }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </template>
</template>

<script>
import NavHome from "@/components/NavHome.vue";
import axios from "axios";

export default {
  name: "PenandaView",
  components: {
    NavHome,
  },
  data() {
    return {
      penandas: [],
    };
  },
  methods: {
    setPenandas() {
      axios
        .get("http://localhost:8000/api/penanda")
        .then((response) => (this.penandas = response.data.penandas))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.setPenandas();
  },
};
</script>

<style>
</style>