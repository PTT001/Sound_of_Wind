```vue
<!-- 檔案名: ProfileEdit.vue -->
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-6"
  >
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <!-- 第一行：使用者大頭貼 -->
      <div class="flex justify-center mb-6">
        <img
          :src="userStore.profile.avatarUrl"
          alt=""
          class="w-24 h-24 rounded-full object-cover border-2 border-blue-200"
        />
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

const userStore = store();

// 定義使用者資料
const userAvatar = ref(''); // 預設大頭貼
const password = ref(''); // 新密碼

// 修改密碼的函數
const updatePassword = () => {
  if (password.value) {
    // 這裡可以加入後端 API 調用邏輯
    alert(`密碼已更新為: ${password.value}`);
    password.value = ''; // 清空密碼欄位
  } else {
    alert('請輸入新密碼');
  }
};
</script>
