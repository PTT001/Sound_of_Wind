<script setup>
import { ref, computed, onMounted } from 'vue'
import { getGameRecord } from '../api/springApi'
import loading from '../components/loading.vue'

const responseData = ref([])
const isLoading = ref(true)

onMounted(async () => {
  const { data } = await getGameRecord()
  responseData.value = data
  isLoading.value = false
})

const shouldShowRedIcon = computed(() => {
  return item => {
    return item.winner === 'Red'
  }
})

const shouldShowBlueIcon = computed(() => {
  return item => {
    return item.winner === 'Blue'
  }
})

const shouldShowGreenIcon = computed(() => {
  return item => {
    return item.winner === 'Green'
  }
})
</script>

<template>
  <div
    class="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-white p-6 py-8"
  >
    <div class="w-full max-w-3xl space-y-6">
      <loading v-if="isLoading" />

      <div
        v-for="item in responseData"
        :key="item.createdAt"
        class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <table class="w-full font-sans text-gray-700 table-fixed">
          <tbody>
            <!-- Date Row -->
            <tr class="bg-gray-100">
              <td class="w-12 py-3 pl-4 border-b border-gray-200"></td>
              <td
                class="py-3 px-4 border-b border-gray-200 text-sm font-medium text-gray-500"
              >
                {{ new Date(item.createdAt).toLocaleString() }}
              </td>
            </tr>
            <!-- Red Row -->
            <tr
              class="bg-red-50 hover:bg-red-100 transition-colors duration-200"
            >
              <td class="w-12 py-3 pl-4 border-b border-gray-200 text-red-500">
                <svg
                  v-if="shouldShowRedIcon(item)"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span v-else></span>
              </td>
              <td
                class="py-3 px-4 border-b border-gray-200 text-red-600 font-medium"
              >
                {{ item.red.join(' / ') }}
              </td>
            </tr>
            <!-- Blue Row -->
            <tr
              class="bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
            >
              <td class="w-12 py-3 pl-4 border-b border-gray-200 text-blue-500">
                <svg
                  v-if="shouldShowBlueIcon(item)"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span v-else></span>
              </td>
              <td
                class="py-3 px-4 border-b border-gray-200 text-blue-600 font-medium"
              >
                {{ item.blue.join(' / ') }}
              </td>
            </tr>
            <!-- Green Row -->
            <tr
              class="bg-green-50 hover:bg-green-100 transition-colors duration-200"
            >
              <td
                class="w-12 py-3 pl-4 border-b border-gray-200 text-green-500"
              >
                <svg
                  v-if="shouldShowGreenIcon(item)"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span v-else></span>
              </td>
              <td
                class="py-3 px-4 border-b border-gray-200 text-green-600 font-medium"
              >
                {{ item.green.join(' / ') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
