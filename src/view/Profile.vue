<template>
  <div
    class="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-100 to-white p-6"
  >
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <!-- 第一行：使用者大頭貼 -->
      <div class="flex justify-center mb-6 relative">
        <img
          :src="userStore.profile.avatarUrl"
          alt=""
          class="w-24 h-24 rounded-full object-cover border-2 border-blue-200 cursor-pointer"
        />

        <!-- 加號疊層 -->
        <div
          v-if="!userStore.profile.avatarUrl"
          class="absolute w-24 h-24 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
          @click="triggerFileUpload"
        >
          <span class="text-white text-3xl">+</span>
        </div>
        <!-- 加號疊層 -->
        <div
          class="absolute w-24 h-24 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          @click="triggerFileUpload"
        >
          <span class="text-white text-3xl">+</span>
        </div>
      </div>

      <!-- 第二行：使用者姓名（僅顯示） -->
      <div class="mb-6">
        <label class="block text-gray-700 font-semibold mb-2">使用者姓名</label>
        <div
          class="w-full px-4 py-2 bg-gray-100 border rounded-lg text-gray-800"
        >
          {{ userStore.profile.username }}
        </div>
      </div>

      <!-- 第三行：修改密碼 -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">修改密碼</label>
        <input
          v-model="password"
          type="password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="輸入新密碼"
        />
        <button
          @click="updatePassword"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          確認修改密碼
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../store';
import { uploadAvatar, changePassword } from '../api/springApi';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from '../router';

const userStore = store();
const password = ref(''); // 新密碼

const triggerFileUpload = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file); // 必須與後端的 @RequestParam("file") 匹配

      try {
        const res = await uploadAvatar(formData);
        toast.success('上傳成功');

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  input.click();
};

// 修改密碼的函數
const updatePassword = async () => {
  if (password.value) {
    // 這裡可以加入後端 API 調用邏輯
    await changePassword({ password: password.value });
    toast.success(`密碼已更新`);
    setTimeout(() => {
      localStorage.removeItem('rayToken');
      router.push(`authpage`);
      window.location.reload();
    }, 1500);
    password.value = ''; // 清空密碼欄位
  } else {
    toast.error('請輸入新密碼');
  }
};
</script>
