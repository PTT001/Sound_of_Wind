<template>
  <main class="p-4 bg-gray-50 min-h-screen">
    <div class="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
      <form action="" class="grid">
        <label for="email" class="leading-7 text-sm text-gray-600">名字</label>
        <input
          v-model="username"
          placeholder="請輸入你的名字"
          type="email"
          id="email"
          name="email"
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <label for="message" class="leading-7 text-sm text-gray-600"
          >想說的話</label
        >
        <textarea
          name="comment"
          id=""
          placeholder="請輸入你的留言"
          class="bg-gray-50 p-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          v-model="userinput"
        ></textarea>
        <fieldset class="py-4">
          <input
            type="submit"
            value="送出"
            class="px-4 py-1 bg-blue-600 rounded text-white"
            @click="Create_Message"
          />
          <input
            type="reset"
            value="取消"
            class="px-4 py-1 bg-white rounded border ml-3"
          />
        </fieldset>
      </form>

      <div class="border-b border-gray-300 my-2 mb-4"></div>

      <div v-for="item in messageList.data">
        <div class="flex">
          <img
            src="https://cdn.jsdelivr.net/gh/Ling137/imgbed@main/data/unlimitedTiling.png"
            alt=""
            class="w-12 h-12 mr-4 rounded-full"
          />
          <div>
            <p>{{ item.name }}</p>
            <p class="text-gray-600 text-sm">
              {{ new Date(item.createdAt).toLocaleString() }}
            </p>
          </div>
        </div>
        <p class="text-gray-600 py-4">
          {{ item.message }}
        </p>
        <div class="border-b border-gray-300 my-2 mb-4"></div>
      </div>
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
