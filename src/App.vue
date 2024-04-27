<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar></NavBar>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<style>
body {
  background-image: url('/test.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
  margin: 0;
}
</style>
./view/HelloWorld.vue
