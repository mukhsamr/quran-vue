<template>
  <transition class="hidden" name="modal-fade">
    <div
      class="
        backdrop
        fixed
        top-0
        bottom-0
        left-0
        right-0
        flex
        justify-center
        items-center
        bg-black/50
        z-20
      "
      @click="backdrop"
    >
      <div
        class="bg-white shadow-md flex flex-col overflow-x-auto w-96 rounded-md"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="font-semibold text-xl">
          <slot name="header"></slot>
        </header>
        <section class="p-4" id="modalDescription">
          <slot name="body"></slot>
        </section>

        <footer class="flex justify-end space-x-8 p-4">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TheModal",
  methods: {
    backdrop(e) {
      if (e.target.classList[0] === "backdrop") {
        this.$emit("close");
      }
    },
  },
};
</script>

<style>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>