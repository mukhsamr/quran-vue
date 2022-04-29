<template>
  <NavHome></NavHome>
  <router-link
    :to="{
      name: 'ayat',
      params: { id: juz.surat_id },
      query: { ayat: juz.ayat },
    }"
    v-for="(juz, i) in juzs"
    :key="i"
  >
    <div class="p-3 border-b-2">
      <div>Juz {{ i + 1 }}</div>
      <div class="text-sm text-red-600">
        {{ juz.surat.nama + " - AYAT " + juz.ayat }}
      </div>
    </div>
  </router-link>
</template>

<script>
import NavHome from "@/components/NavHome.vue";
import axios from "axios";

export default {
  name: "JuzView",
  components: {
    NavHome,
  },
  data() {
    return {
      juzs: [],
    };
  },
  methods: {
    setJuzs() {
      axios
        .get("http://localhost:8000/api/juz")
        .then((response) => (this.juzs = response.data.juzs))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.setJuzs();
  },
};
</script>

<style>
</style>