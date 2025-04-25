<template>
  <Disclosure
    as="nav"
    class="bg-gradient-to-r from-indigo-900 to-purple-900 shadow-lg"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-20 items-center justify-between">
        <!-- Mobile menu button -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-full p-2 text-gray-200 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon
              v-if="!open"
              class="block h-8 w-8 transform transition duration-300"
              aria-hidden="true"
            />
            <XMarkIcon
              v-else
              class="block h-8 w-8 transform transition duration-300"
              aria-hidden="true"
            />
          </DisclosureButton>
        </div>

        <!-- Desktop navigation -->
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                @click="navigateTo(item.href)"
                :class="[
                  item.current
                    ? 'bg-indigo-700 text-white'
                    : 'text-gray-200 hover:bg-indigo-600 hover:text-white',
                  'rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition duration-300 ease-in-out transform hover:scale-105'
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>

        <!-- Right side (conditional username badge or login button) -->
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div v-if="useStore.profile?.username">
            <Menu as="div" class="relative">
              <MenuButton
                class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold tracking-wide hover:bg-indigo-700 transition duration-300 ease-in-out"
                :title="useStore.profile?.username"
              >
                <img
                  v-if="useStore.profile?.avatarUrl"
                  :src="useStore.profile?.avatarUrl"
                  alt="User avatar"
                  class="h-full w-full rounded-full object-cover"
                />
                <span
                  v-else
                  class="flex h-full w-full items-center justify-center"
                >
                  {{ useStore.profile?.username.charAt(0).toUpperCase() }}
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="z-[5] absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-indigo-800/90 backdrop-blur-md shadow-lg ring-1 ring-indigo-400 ring-opacity-50 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }">
                    <a
                      @click="navigateTo('/profile')"
                      :class="[
                        active ? 'bg-indigo-700 text-white' : 'text-gray-200',
                        'block px-4 py-2 text-sm font-semibold rounded-t-lg transition duration-200 ease-in-out'
                      ]"
                      >編輯資訊</a
                    >
                  </MenuItem>

                  <MenuItem v-slot="{ active }">
                    <a
                      @click="logout"
                      :class="[
                        active ? 'bg-indigo-700 text-white' : 'text-gray-200',
                        'block px-4 py-2 text-sm font-semibold rounded-b-lg transition duration-200 ease-in-out'
                      ]"
                      >登出</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <button
            v-else
            @click="navigateTo('/authPage')"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold tracking-wide hover:bg-indigo-700 transition duration-300 ease-in-out"
            title="登入"
          >
            登入
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu panel -->
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-2 px-2 pb-4 pt-3 bg-indigo-800/90 backdrop-blur-md">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          @click="navigateTo(item.href)"
          :class="[
            item.current
              ? 'bg-indigo-700 text-white'
              : 'text-gray-200 hover:bg-indigo-600 hover:text-white',
            'block rounded-lg px-4 py-3 text-base font-semibold tracking-wide transition duration-300 ease-in-out transform hover:scale-105'
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import router from '../router'
import store from '../store'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const useStore = store()

const navigation = [
  { name: '首頁', href: '/Home', current: false },
  { name: '戰績輸入', href: '/Record', current: false },
  { name: '歷史戰績', href: '/History', current: false },
  { name: '留言板', href: '/msgboard', current: false }
]

const navigateTo = path => {
  router.push(path)
}

const logout = () => {
  localStorage.removeItem('rayToken')
  useStore.profile = ''
  toast.success('已登出')
  setTimeout(() => {
    router.push(`/authpage`)
  }, 1000)
}
</script>
