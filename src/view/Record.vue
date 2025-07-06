<template>
  <div
    class="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-white text-white"
  >
    <!-- Main Content -->
    <main class="flex flex-col items-center w-full max-w-3xl px-4 py-8">
      <!-- 誰贏 Section -->
      <section
        class="w-full rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <h2 class="text-2xl font-bold text-orange-400 mb-4">誰贏</h2>
        <SingleChoice @win-click="WinGroup" :Win="Win" />
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="item in WinG"
            class="text-black bg-orange-500/20 px-3 border-orange-300 py-1 rounded-full"
          >
            {{ item }}
          </span>
        </div>
      </section>

      <!-- 潛伏 Section -->
      <section
        class="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8"
      >
        <h2 class="text-2xl font-bold text-red-500 mb-4">潛伏</h2>
        <choice @child-click="red" :people="AllUser" />
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="item in RedPeople"
            class="text-red-700 bg-red-500/20 border-red-300 px-3 py-1 rounded-full"
          >
            {{ item }}
          </span>
        </div>
      </section>

      <!-- 軍情 Section -->
      <section
        class="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8"
      >
        <h2 class="text-2xl font-bold text-blue-500 mb-4">軍情</h2>
        <choice @child-click="blue" :people="AllUser" />
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="item in BluePeople"
            class="text-sm text-blue-700 bg-blue-500/20 border-blue-300 px-4 py-1 rounded-full mr-2"
          >
            {{ item }}
          </span>
        </div>
      </section>

      <!-- 醬油 Section -->
      <section
        class="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8"
      >
        <h2 class="text-2xl font-bold text-green-500 mb-4">醬油</h2>
        <choice @child-click="green" :people="AllUser" />
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="item in GreenPeople"
            class="text-green-700 bg-green-500/20 border-green-300 px-3 py-1 rounded-full"
          >
            {{ item }}
          </span>
        </div>
      </section>

      <!-- Submit Button -->
      <button
        class="my-12 px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-bold rounded-xl shadow-lg hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
        @click="SendRecord"
      >
        送出
      </button>
    </main>
  </div>
</template>

<script setup>
import choice from '../components/Choice.vue'
import SingleChoice from '../components/SingleChoice.vue'
import { ref, onMounted } from 'vue'
import { GetAllUser, createGameRecord } from '../api/springApi'

const AllUser = ref([])
const RedPeople = ref([])
const BluePeople = ref([])
const GreenPeople = ref([])
const WinG = ref('')
const WinGroup = x => {
  WinG.value = x.name
}

onMounted(async () => {
  AllUser.value = await GetAllUser()
})

const Win = [
  { id: 1, name: 'red' },
  { id: 2, name: 'blue' },
  { id: 3, name: 'green' }
]

const red = value => {
  RedPeople.value = value.map(item => item.username)
}
const blue = value => {
  BluePeople.value = value.map(item => item.username)
}
const green = value => {
  GreenPeople.value = value.map(item => item.username)
}

const SendRecord = async () => {
  const res = await createGameRecord({
    winner: WinG.value,
    red: RedPeople.value,
    blue: BluePeople.value,
    green: GreenPeople.value
  })
}
</script>
