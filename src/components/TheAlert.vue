<template>
  <div
    id="alert"
    class="
      bg-red-600
      p-4
      fixed
      bottom-0
      z-10
      text-white
      translate-y-full
      transition-transform
    "
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TheAlert",
};
</script>

<style>
</style>