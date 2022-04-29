<template>
  <nav class="bg-red-600 fixed top-0 z-10">
    <h4 class="text-2xl p-4 text-white">Al Quran</h4>
    <div class="py-4">
      <router-link
        class="p-4 text-white/50 hover:bg-red-700"
        :to="{ name: 'surat' }"
        >SURAT</router-link
      >
      <router-link
        class="p-4 text-white/50 hover:bg-red-700"
        :to="{ name: 'juz' }"
        >JUZ</router-link
      >
      <router-link
        class="p-4 text-white/50 hover:bg-red-700"
        :to="{ name: 'penanda' }"
        >PENANDA</router-link
      >
    </div>
  </nav>
  <div class="mt-32"></div>
</template>

<script>
export default {
  name: "NavHome",
};
</script>

<style scoped>
a.router-link-exact-active {
  color: white;
  border-bottom: 4px solid white;
}
</style>