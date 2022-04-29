<template>
  <nav class="bg-red-600 text-white fixed top-0 z-10">
    <div class="flex justify-between items-center p-4 shadow-md">
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
      <div class="text-center">
        <div class="font-semibold">{{ surat.nama }}</div>
        <div class="text-sm">{{ surat.arti }}</div>
      </div>
      <div>
        <button @click="showModal('#modalMenu')">
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex justify-between text-sm p-2">
      <div>Juz {{ juz }} - Hal.{{ halaman }}</div>
      <div>{{ surat.ayat }} Ayat</div>
    </div>
  </nav>

  <TheAlert>{{ message }}</TheAlert>

  <div class="mt-28">
    <div
      class="bg-yellow-100 p-2 border-b-2"
      v-if="surat.id != 1 && surat.id != 9"
    >
      <img
        src="@/assets/images/basmalah.png"
        class="mx-auto w-80"
        alt="basmalah"
      />
    </div>
    <div
      :id="'ayat-' + ayat.ayat"
      :page="ayat.page"
      :juz="ayat.juz"
      class="ayat p-4 odd:bg-amber-100 border-b-2 cursor-pointer"
      @click="showModalAyat('#modalAyat', ayat.id)"
      v-for="ayat in ayats"
      :key="ayat.id"
    >
      <div class="flex justify-between items-center mb-4">
        <NumberIcon>{{ ayat.ayat }}</NumberIcon>
        <div class="arab w-96 text-right">{{ ayat.text }}</div>
        <img
          src="@/assets/images/sajdah.png"
          v-if="ayat.sajda"
          class="h-6 mx-3"
        />
      </div>
      <div>{{ ayat.trans }}</div>
    </div>
    <div class="p-4" v-if="nextSurat.id <= 114">
      <div
        class="rounded-md bg-gray-200 hover:bg-gray-300 p-4 cursor-pointer"
        @click="next"
      >
        <div class="text-red-600 text-lg">SURAT SELANJUTNYA</div>
        <div class="flex flex-auto items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <div class="text-sm ml-4">
            <div>{{ nextSurat.nama }}</div>
            <div class="text-yellow-600">
              {{ nextSurat.ayat + " Ayat " + nextSurat.tipe }}
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 ml-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <TheModal id="modalMenu" @close="closeModal('#modalMenu')">
    <template v-slot:body>
      <div class="p-2 cursor-pointer hover:bg-slate-300/50">Mode Malam</div>
      <div
        class="p-2 cursor-pointer hover:bg-slate-300/50"
        @click="
          closeModal('#modalMenu');
          showModal('#modalLoncat');
        "
      >
        Loncat
      </div>
    </template>

    <template v-slot:footer>
      <button
        class="text-yellow-400"
        type="button"
        @click="closeModal('#modalMenu')"
        aria-label="Close modal"
      >
        BATAL
      </button>
    </template>
  </TheModal>

  <TheModal id="modalLoncat" @close="closeModal('#modalLoncat')">
    <template v-slot:header>
      <div class="p-4 border-b">Loncat ke Ayat</div>
    </template>
    <template v-slot:body>
      <div>Masukan Ayat 1 - {{ ayats.length }}</div>
      <input
        type="number"
        class="p-2 w-full border-b-2 outline-0"
        min="1"
        :max="ayats.length"
        v-model="ayat"
        @keyup.enter="loncat"
      />
    </template>

    <template v-slot:footer>
      <button
        class="text-yellow-400"
        type="button"
        @click="closeModal('#modalLoncat')"
        aria-label="Close modal"
      >
        CANCEL
      </button>
      <button class="text-yellow-400" type="button" @click="loncat">OK</button>
    </template>
  </TheModal>

  <TheModal id="modalCatatan" @close="closeModal('#modalCatatan')">
    <template v-slot:header>
      <div class="p-4 border-b">Tulis Catatan</div>
    </template>
    <template v-slot:body>
      <div>
        Beri Catatan untuk Surat
        {{ surat.nama + " ayat " + modalAyat.ayat }}
      </div>
      <input
        type="text"
        class="p-2 w-full border-b-2 outline-0"
        v-model="catatan"
        @keyup.enter="setCatatan"
      />
    </template>

    <template v-slot:footer>
      <button
        class="text-yellow-400"
        type="button"
        @click="closeModal('#modalCatatan')"
        aria-label="Close modal"
      >
        CANCEL
      </button>
      <button class="text-yellow-400" type="button" @click="setCatatan">
        OK
      </button>
    </template>
  </TheModal>

  <TheModal id="modalAyat" @close="closeModal('#modalAyat')">
    <template v-slot:header>
      <div class="bg-red-600 p-4 text-center text-white">
        {{ surat.nama + " : " + modalAyat.ayat }}
      </div>
    </template>
    <template v-slot:body>
      <div
        class="border-b cursor-pointer p-3 hover:bg-slate-100"
        @click="setAkhir()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline-block mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <span>Tandai Akhir Bacaan</span>
      </div>
      <div
        class="border-b cursor-pointer p-3 hover:bg-slate-100"
        @click="setPenanda()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline-block mr-2"
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
        <span>Buat Penanda</span>
      </div>
      <div class="border-b cursor-pointer p-3 hover:bg-slate-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline-block mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
        <span>Dengarkan Bacaan</span>
      </div>
      <div
        class="border-b cursor-pointer p-3 hover:bg-slate-100"
        @click="showModalCatatan('#modalCatatan')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline-block mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <span>Catatan</span>
      </div>
      <div
        class="border-b cursor-pointer p-3 hover:bg-slate-100"
        @click="salin"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline-block mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span>Salin</span>
      </div>
      <div class="border-b cursor-pointer p-3 hover:bg-slate-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline-block mr-2"
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
        <span>Bagikan</span>
      </div>
    </template>
  </TheModal>
</template>

<script>
import NumberIcon from "@/components/NumberIcon.vue";
import TheModal from "@/components/TheModal.vue";
import TheAlert from "@/components/TheAlert.vue";
import axios from "axios";

export default {
  name: "AyatView",
  components: {
    NumberIcon,
    TheModal,
    TheAlert,
  },
  methods: {
    showModal(target) {
      document.querySelector(target).classList.remove("hidden");
    },
    closeModal(target) {
      document.querySelector(target).classList.add("hidden");
    },
    showAlert() {
      let el = document.querySelector("#alert");
      el.classList.toggle("translate-y-full");
      setTimeout(() => {
        el.classList.toggle("translate-y-full");
      }, 2500);
    },
    getSurat() {
      axios
        .get("http://localhost:8000/api/ayat/" + this.$route.params.id)
        .then((response) => {
          this.surat = response.data.surat;
          this.ayats = response.data.ayats;
          this.halaman = response.data.ayats[0].page;
          this.juz = response.data.ayats[0].juz;
          this.nextSurat = response.data.nextSurat;
        })
        .catch((error) => console.log(error));
    },
    getPage() {
      let ayats = document.querySelectorAll(".ayat");
      ayats.forEach((ayat) => {
        let position = ayat.getBoundingClientRect();
        if (
          position.top >= 0 &&
          position.bottom <=
            (window.innerHeight || document.documentElement.clientHeight)
        ) {
          this.halaman = ayat.getAttribute("page");
          this.juz = ayat.getAttribute("juz");
        }
      });
    },
    loncat() {
      let el = document.querySelector("#ayat-" + this.ayat);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        this.closeModal("#modalLoncat");
      }
    },
    showModalAyat(target, id) {
      document.querySelector(target).classList.remove("hidden");
      this.modalAyat = this.ayats.find((v) => v.id == id);
    },
    showModalCatatan(target) {
      document.querySelector(target).classList.remove("hidden");
      this.closeModal("#modalAyat");
    },
    setAkhir() {
      axios
        .put("http://localhost:8000/api/ayat/akhir", {
          id: this.modalAyat.id,
          akhir: 1,
        })
        .then((response) => {
          this.closeModal("#modalAyat");
          this.message = response.data.status.message;
          this.showAlert();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setPenanda() {
      axios
        .put("http://localhost:8000/api/ayat/penanda", {
          id: this.modalAyat.id,
          penanda: 1,
        })
        .then((response) => {
          this.closeModal("#modalAyat");
          this.message = response.data.status.message;
          this.showAlert();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setCatatan() {
      axios
        .put("http://localhost:8000/api/ayat/catatan", {
          id: this.modalAyat.id,
          catatan: this.catatan,
        })
        .then((response) => {
          this.closeModal("#modalCatatan");
          this.message = response.data.status.message;
          this.showAlert();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    salin() {
      let ayat = this.modalAyat.nama_surat + " : " + this.modalAyat.ayat;
      let text = this.modalAyat.text;
      let trans = 'Artinya : "' + this.modalAyat.trans + '"';
      navigator.clipboard.writeText(ayat + "\n" + text + "\n" + trans);
      this.closeModal("#modalAyat");
      this.message = "Ayat disalin";
      this.showAlert();
    },
    next() {
      this.$route.params.id = this.nextSurat.id;
      this.getSurat();
      document.documentElement.scrollTop = 0;
    },
  },
  data() {
    return {
      surat: [],
      ayats: [],
      halaman: "",
      juz: "",
      ayat: "",
      catatan: "",
      modalAyat: [],
      message: "",
      nextSurat: "",
    };
  },
  mounted() {
    this.getSurat();
    window.addEventListener("scroll", this.getPage);

    if (this.$route.query.ayat) {
      this.ayat = this.$route.query.ayat;
      setTimeout(() => {
        this.loncat();
      }, 1000);
    }
  },
};
</script>

<style>
@font-face {
  font-family: "Arab";
  src: url("@/assets/font.ttf");
}

.arab {
  font-family: "Arab";
  font-size: 24px;
}
</style>