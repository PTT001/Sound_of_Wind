<script setup>
import NavBar from './components/NavBar2.vue'
import store from './store'
import { GetProfile, GetCharacterInfo } from './api/springApi'
import { onMounted } from 'vue'

const useStore = store()

onMounted(async () => {
  useStore.profile = await GetProfile()
  useStore.CharacterInfo = await GetCharacterInfo()
})
</script>

<template>
  <NavBar />
  <Suspense>
    <router-view> </router-view>
  </Suspense>
</template>

<style></style>
