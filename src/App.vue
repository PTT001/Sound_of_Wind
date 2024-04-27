<script setup>
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <Suspense>
    <HelloWorld msg="Vite + Vue" />
  </Suspense>
</template>

<style>
body {
  background-image: url('/test.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  margin: 0;
}
</style>
