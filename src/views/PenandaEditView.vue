<template>
  <nav class="bg-red-600 text-white fixed top-0 z-10">
    <div class="flex justify-between items-center p-4">
      <div class="flex space-x-4">
        <a class="cursor-pointer" @click="$router.go(-1)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </a>
        <span class="text-xl">Catatan Ayat</span>
      </div>
      <a class="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </a>
    </div>
  </nav>
  <TheAlert>{{ message }}</TheAlert>

  <div class="mt-28 shadow-md py-4">
    <span class="px-5 py-3 bg-yellow-400 text-white rounded-r-full">
      {{ ayat.nama_surat + " : " + ayat.ayat }}
    </span>
    <div class="p-4">
      <div class="flex justify-between items-center my-4">
        <NumberIcon>{{ ayat.ayat }}</NumberIcon>
        <div class="arab w-96 text-right">{{ ayat.text }}</div>
      </div>
      <div>{{ ayat.trans }}</div>
      <div class="flex justify-end">
        <router-link
          v-if="ayat"
          :to="{
            name: 'ayat',
            params: { id: ayat.surat_id },
            query: { ayat: ayat.ayat },
          }"
          class="
            mt-4
            px-4
            py-3
            rounded-sm
            shadow-lg
            border-2
            font-semibold
            text-red-600
          "
        >
          BUKA AL-QURAN
        </router-link>
      </div>
    </div>
  </div>
  <div class="p-4">
    <div class="text-xl">Catatan</div>
    <input
      type="text"
      class="w-full border-b-2 h-20 p-4 bg-yellow-200 outline-none"
      v-model="catatan"
    />
    <div class="flex justify-between p-4">
      <button
        class="px-7 py-2 rounded-sm bg-orange-600 text-white"
        @click="setCatatan"
      >
        SIMPAN PERUBAHAN
      </button>
      <button
        class="px-7 py-2 rounded-sm bg-red-700 text-white"
        @click="showModal('#modalHapus')"
      >
        HAPUS
      </button>
    </div>
  </div>
  <TheModal id="modalHapus" @close="closeModal('#modalHapus')">
    <template v-slot:header>
      <div class="p-4 border-b">Hapus Catatan</div>
    </template>
    <template v-slot:body>
      <div>Ingin menghapus catatan ini?</div>
    </template>

    <template v-slot:footer>
      <button
        class="text-yellow-400"
        type="button"
        @click="closeModal('#modalHapus')"
        aria-label="Close modal"
      >
        TIDAK
      </button>
      <button class="text-yellow-400" type="button" @click="deleteCatatan">
        YA
      </button>
    </template>
  </TheModal>
</template>

<script>
import NumberIcon from "@/components/NumberIcon.vue";
import TheModal from "@/components/TheModal.vue";
import TheAlert from "@/components/TheAlert.vue";
import axios from "axios";
import router from "@/router";

export default {
  name: "PenandaEditView",
  components: {
    NumberIcon,
    TheModal,
    TheAlert,
  },
  data() {
    return {
      ayat: "",
      catatan: "",
      message: "",
    };
  },
  methods: {
    showAlert() {
      let el = document.querySelector("#alert");
      el.classList.toggle("translate-y-full");
      setTimeout(() => {
        el.classList.toggle("translate-y-full");
      }, 2500);
    },
    showModal(target) {
      let el = document.querySelector(target);
      el.classList.remove("hidden");
    },
    closeModal(target) {
      let el = document.querySelector(target);
      el.classList.add("hidden");
    },
    getAyat() {
      axios
        .get("http://localhost:8000/api/penanda/" + this.$route.params.id)
        .then((response) => {
          this.ayat = response.data.ayat;
          this.catatan = response.data.ayat.catatan;
        })
        .catch((error) => console.log(error));
    },
    setCatatan() {
      axios
        .put("http://localhost:8000/api/ayat/catatan/edit", {
          id: this.ayat.id,
          catatan: this.catatan,
        })
        .then((response) => {
          this.message = response.data.status.message;
          this.showAlert();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCatatan() {
      axios
        .delete("http://localhost:8000/api/ayat/catatan/" + this.ayat.id)
        .then((response) => {
          this.message = response.data.status.message;
          this.closeModal("#modalHapus");
          this.showAlert();
          setTimeout(() => {
            router.go(-1);
          }, 2500);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getAyat();
  },
};
</script>

<style>
</style>