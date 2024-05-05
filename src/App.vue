<script setup>
import NavBar from './components/NavBar2.vue';
</script>

<template>
  <NavBar />
  <Suspense>
    <router-view> </router-view>
  </Suspense>
</template>

<style></style>
