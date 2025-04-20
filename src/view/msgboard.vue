<template>
  <main class="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
    <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
      <!-- Messages Section -->
      <div class="space-y-6 mb-10">
        <div
          v-for="item in messageList.data"
          :key="item.id"
          class="bg-gray-50 hover:bg-white transition-colors duration-300 rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div class="flex items-start">
            <img
              src="https://cdn.jsdelivr.net/gh/Ling137/imgbed@main/data/unlimitedTiling.png"
              alt="User avatar"
              class="w-12 h-12 rounded-full mr-4 border border-gray-200"
            />
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <p class="font-semibold text-gray-800">{{ item.name }}</p>
                <span class="text-sm text-gray-400">
                  {{
                    new Date(item.createdAt).toLocaleString('zh-TW', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }}
                </span>
              </div>
              <p class="text-gray-600 leading-relaxed">{{ item.message }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-8 border-gray-300" />

      <!-- Form Section -->
      <form
        @submit.prevent="Create_Message"
        class="space-y-6 animate-fade-in-down"
      >
        <h2 class="text-lg font-bold text-gray-800">我要留言</h2>
        <div>
          <input
            v-model="username"
            placeholder="請輸入你的名字"
            type="text"
            id="email"
            name="email"
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all duration-200 text-gray-800 bg-gray-50 focus:scale-[1.02]"
          />
        </div>
        <div>
          <textarea
            v-model="userinput"
            name="comment"
            id="message"
            placeholder="請輸入你的留言"
            rows="4"
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all duration-200 text-gray-800 bg-gray-50 resize-none focus:scale-[1.02]"
          ></textarea>
        </div>
        <div class="flex space-x-4">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-200"
          >
            送出
          </button>
          <button
            type="reset"
            class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-200 transition-all duration-200"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { Createmessage, getAllmessage } from '../api/api';
import { ref } from 'vue';

const username = ref('');
const userinput = ref('');

const Create_Message = async () => {
  if (username.value !== '' || userinput.value !== '') {
    await Createmessage({
      name: username.value,
      message: userinput.value,
    });

    window.location.reload();
  }
  console.log(1);
};

const messageList = await getAllmessage();
console.log(messageList.data);
</script>
