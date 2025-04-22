<template>
  <div class="flex items-center justify-center">
    <div class="relative w-14 h-14">
      <div
        class="absolute inset-0 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"
      ></div>
      <div
        class="absolute inset-0 border-4 border-t-transparent border-blue-300 rounded-full animate-spin-slow"
      ></div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this simple component
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-slow {
  to {
    transform: rotate(-360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-spin-slow {
  animation: spin-slow 1.5s linear infinite;
}
</style>
