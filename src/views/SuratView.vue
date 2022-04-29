<template>
  <NavHome v-once />
  <router-link
    v-if="akhir"
    :to="{
      name: 'ayat',
      params: { id: akhir.surat_id },
      query: { ayat: akhir.ayat },
    }"
  >
    <div class="grid grid-cols-6 items-center p-3 border-b-2">
      <div class="mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-red-400"
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
      <div class="col-start-2 col-span-3">
        <div>Bacaan Terakhir</div>
        <div class="text-sm text-yellow-400">
          {{ akhir.surat.nama + " - AYAT " + akhir.ayat }}
        </div>
      </div>
    </div>
  </router-link>
  <router-link
    :id="'surat-' + surat.id"
    :to="{ name: 'ayat', params: { id: surat.id } }"
    v-for="surat in surats"
    :key="surat.id"
  >
    <div class="grid grid-cols-6 items-center py-3 border-b-2">
      <div class="mx-auto">
        <NumberIcon>{{ surat.id }}</NumberIcon>
      </div>
      <div class="col-start-2 col-span-3">
        <div>{{ surat.nama }}</div>
        <div class="text-sm text-red-600">
          {{ surat.tipe.toUpperCase() + " | " + surat.ayat + " AYAT" }}
        </div>
      </div>
      <div class="col-span-2">
        <img src="@/assets/images/alfatihah.png" alt="image" class="w-32" />
      </div>
    </div>
  </router-link>
</template>

<script>
import NavHome from "@/components/NavHome.vue";
import NumberIcon from "@/components/NumberIcon.vue";
import axios from "axios";

export default {
  name: "SuratView",
  components: {
    NavHome,
    NumberIcon,
  },
  data() {
    return {
      surats: [],
      akhir: "",
    };
  },
  methods: {
    setSurats() {
      axios
        .get("http://localhost:8000/api/surat")
        .then((response) => {
          this.surats = response.data.surats;
          this.akhir = response.data.akhir;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.setSurats();
  },
};
</script>

<style scoped>
</style>