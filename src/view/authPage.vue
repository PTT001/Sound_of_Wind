<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-6"
  >
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
      <div class="flex justify-center mb-6">
        <button
          @click="isLogin = true"
          :class="[
            'px-4 py-2 rounded-l-xl',
            isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'
          ]"
        >
          登入
        </button>
        <button
          @click="isLogin = false"
          :class="[
            'px-4 py-2 rounded-r-xl',
            !isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'
          ]"
        >
          註冊
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >暱稱</label
          >
          <input
            type="text"
            v-model="form.username"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >密碼</label
          >
          <input
            type="password"
            v-model="form.password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div v-if="!isLogin" class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >確認密碼</label
          >
          <input
            type="password"
            v-model="form.confirmPassword"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
        >
          {{ isLogin ? '登入' : '註冊' }}
        </button>
      </form>

      <p class="text-red-500 text-sm mt-4" v-if="errorMsg">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Register, Login, GetProfile } from '../api/springApi'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import router from '../router'
import store from '../store'

const isLogin = ref(true)

const useStore = store()

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: 'test@gmail.com'
})

const errorMsg = ref('')

const handleSubmit = async () => {
  errorMsg.value = ''

  if (!isLogin.value) {
    if (form.password !== form.confirmPassword) {
      errorMsg.value = '密碼不一致'
      return
    }
    // 註冊邏輯
    await Register(form)
    toast.success(`註冊成功：${form.username}`)
  } else {
    // 登入邏輯
    try {
      const res = await Login(form)

      console.log(res)

      toast.success(`登入成功：${form.username}`, {
        autoClose: 1000
      })

      const Profile = await GetProfile()
      useStore.profile = Profile

      setTimeout(() => {
        router.replace(`/Home`)
      }, 1000)
    } catch (error) {
      toast.error(`帳號密碼錯誤`, {
        autoClose: 1000
      })
    }
  }

  // 重置表單
  form.username = ''
  form.password = ''
  form.confirmPassword = ''
}
</script>
