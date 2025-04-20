<script setup>
import NavBar from './components/NavBar2.vue';
import store from './store';
import { GetProfile } from './api/springApi';
import { onMounted } from 'vue';

const useStore = store();

onMounted(async () => {
  const Profile = await GetProfile();
  useStore.profile = Profile;
});
</script>

<template>
  <NavBar />
  <Suspense>
    <router-view> </router-view>
  </Suspense>
</template>

<style></style>
