<script setup>
import { ref } from 'vue';
import emailjs from 'emailjs-com';

const name = ref('');
const message = ref('');

const SendEmail = async () => {
  const templateParams = {
    user: name.value,
    emailContent: message.value,
  };

  emailjs
    .send(
      'service_6sqkr54',
      'template_u0ojiua',
      templateParams,
      'Tnf9Zx9NDuikOR_ua'
    )
    .then(() => {
      console.log('success');
      name.value = '';
      message.value = '';
    })
    .catch(() => {
      console.log('fauled');
    });
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-cyan-200"
  >
    <div class="container py-24 mx-auto flex">
      <div
        class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
      >
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600"
            >名字</label
          >
          <input
            v-model="name"
            type="email"
            id="email"
            name="email"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="relative mb-4">
          <label for="message" class="leading-7 text-sm text-gray-600"
            >意見</label
          >
          <textarea
            id="message"
            name="message"
            v-model="message"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
        <button
          @click="SendEmail"
          class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          送出
        </button>
      </div>
    </div>
  </div>
</template>
