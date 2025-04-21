<script setup>
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { initTWE, Collapse, Ripple, Modal, Input } from 'tw-elements'
import modal from '../components/modal.vue'
import { AddProfile, UpdateProfile, DeleteProfile } from '../api/api'
import { GetGamers, SignInGamers } from '../api/springApi'
import store from '../store'

const useStore = store()

const initAccordion = async () => {
  initTWE({ Collapse, Ripple, Modal, Input })
}

onMounted(async () => {
  const userData = await GetGamers()
  userlist.value = userData
  console.log(userlist.value)
  await initAccordion()
})

const userName = ref('')
const selectedRole = ref('')
const deletedRole = ref('')

const userlist = ref([])
// 直接使用 store 的 CharacterInfo，避免靜態賦值
const CharacterInfo = computed(() => useStore.CharacterInfo)

// 檢查 FinalProfile 的計算邏輯
const FinalProfile = computed(() => {
  return CharacterInfo.value
    .map(item1 => {
      const match = userlist.value.find(
        item2 => item2.roleName === item1.roleName
      )
      return match
        ? {
            name: match.userName,
            gender: item1.gender,
            img: '',
            Role: item1.roleName,
            task: item1.Task,
            skill: item1.skills
          }
        : null
    })
    .filter(item => item !== null)
})

const AddPerson = async e => {
  e.preventDefault()
  if (!userName.value || !selectedRole.value) return // 防止空值提交

  const Info = {
    username: userName.value,
    role: selectedRole.value
  }
  await SignInGamers(Info)

  // 假設 SignInGamers 更新了 store 或後端數據
  // 如果 store.CharacterInfo 會更新，FinalProfile 會自動重新計算
  // 如果需要手動刷新 userlist，重新調用 GetGamers
  const userData = await GetGamers()
  userlist.value = userData
}

const deleteProfile = async e => {
  e.preventDefault()
  const existingRole = FinalProfile.value.find(
    item => item.Role === deletedRole.value
  )

  if (existingRole) {
    await DeleteProfile(deletedRole.value)
    // 重新獲取 userlist 以更新數據
    const userData = await GetGamers()
    userlist.value = userData
  }
}

watch(
  () => FinalProfile.value,
  async newVal => {
    if (newVal.length > 0) {
      await nextTick()
      initAccordion()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-white"
  >
    <!-- accordion -->
    <div id="accordionExample" class="w-11/12">
      <div
        v-for="(item, index) in FinalProfile"
        :key="index"
        class="rounded border bg-white dark:border-neutral-600 dark:bg-gray-800"
      >
        <h2 class="mb-0" id="headingOne">
          <button
            class="group relative flex w-full items-center rounded-t-lg border-0 bg-white px-2 py-1 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:bg-blue-200 focus:bg-blue-200 focus:z-[3] focus:outline-none dark:bg-gray-800 dark:text-white [&:not([data-twe-collapse-collapsed])]:bg-blue-50 [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-gray-800 dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 font-black"
            type="button"
            data-twe-collapse-init
            data-twe-collapse-collapsed
            :data-twe-target="`#collapse${index}`"
            aria-expanded="false"
            :aria-controls="`collapse${index}`"
            :style="{
              color:
                item.gender === 1 ? 'blue' : item.gender === 2 ? 'green' : 'red'
            }"
          >
            <img
              :src="item.img"
              alt=""
              class="max-w-11 max-h-11 rounded-full mr-3 p-1"
            />
            {{ item.name }} — {{ item.Role }}
          </button>
        </h2>
        <div
          :id="`collapse${index}`"
          class="!visible hidden"
          data-twe-collapse-item
          aria-labelledby="headingOne"
          data-twe-parent="#accordionExample"
        >
          <div class="px-5 py-4 font-black">
            <div class="text-emerald-500 mb-7">機密任務：{{ item.task }}</div>
            <div v-if="item.skill?.技能一" class="mb-7">
              <span class="font-semibold">技能一：</span
              >{{ item.skill?.技能一 }}
            </div>
            <div v-if="item.skill?.技能二" class="mb-7">
              <span class="font-semibold">技能二：</span
              >{{ item.skill?.技能二 }}
            </div>
            <div v-if="item.skill?.技能三" class="mb-7">
              <span class="font-semibold">技能三：</span
              >{{ item.skill?.技能三 }}
            </div>
            <div class="text-yellow-600">
              <span class="font-semibold">大招：</span>{{ item.skill?.大招 }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Button trigger modal -->

    <button
      type="button"
      class="mt-7 inline-block rounded bg-info-800 px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
      data-twe-toggle="modal"
      data-twe-target="#exampleModalFullscreen"
      data-twe-ripple-init
      data-twe-ripple-color="light"
    >
      登記
    </button>

    <modal />

    <!-- Modal -->
    <div
      data-twe-modal-init
      class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="exampleModalFullscreen"
      tabindex="-1"
      aria-labelledby="exampleModalFullscreenLabel"
      aria-hidden="true"
    >
      <div
        data-twe-modal-dialog-ref
        class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[0px]:m-0 min-[0px]:h-full min-[0px]:max-w-none"
      >
        <div
          class="pointer-events-auto relative flex w-full flex-col rounded-md bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark min-[0px]:h-full min-[0px]:rounded-none min-[0px]:border-0"
        >
          <div
            class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10 min-[0px]:rounded-none"
          >
            <!-- Modal title -->
            <h5
              class="text-xl font-medium leading-normal text-surface dark:text-white"
              id="exampleModalFullscreenLabel"
            ></h5>
            <!-- Close button -->
            <button
              type="button"
              class="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
              data-twe-modal-dismiss
              aria-label="Close"
            >
              <span class="[&>svg]:h-6 [&>svg]:w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>

          <!-- Modal body -->
          <div class="relative p-4 my-auto">
            <div
              class="mx-auto max-w-sm mb-9 rounded-lg bg-white p-4 shadow-4 dark:bg-surface-dark"
            >
              <form>
                <!--名字-->
                <div class="relative mb-4" data-twe-input-wrapper-init>
                  <input
                    placeholder="輸入你的名字"
                    type="text"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="userName"
                    required
                  />
                </div>

                <!--角色-->
                <div class="mb-4">
                  <div class="relative">
                    <select
                      required
                      v-model="selectedRole"
                      id="country"
                      name="country"
                      class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="" disabled selected>請選擇角色</option>
                      <option
                        v-for="option in CharacterInfo"
                        :value="option.roleName"
                        :key="option.roleName"
                      >
                        {{ option.roleName }}
                      </option>
                    </select>
                  </div>
                </div>
                <!--Submit button-->
                <div class="flex justify-center">
                  <button
                    type="submit"
                    class="w-full inline-block rounded bg-success-600 px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-info-accent-500 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    @click="AddPerson"
                  >
                    新增
                  </button>
                </div>
              </form>
            </div>

            <div
              class="mx-auto max-w-sm rounded-lg bg-white p-4 shadow-4 dark:bg-surface-dark"
            >
              <form>
                <!--角色-->
                <div class="mb-4">
                  <div class="relative">
                    <select
                      required
                      v-model="deletedRole"
                      id="country"
                      name="country"
                      class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="" disabled selected>請選擇角色</option>
                      <option
                        v-for="option in CharacterInfo"
                        :value="option.roleName"
                        :key="option.roleName"
                      >
                        {{ option.roleName }}
                      </option>
                    </select>
                  </div>
                </div>
                <!--Submit button-->
                <div class="flex justify-center">
                  <button
                    type="submit"
                    class="w-full inline-block rounded bg-danger-600 px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-info-accent-500 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    @click="deleteProfile"
                  >
                    刪除
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
}
</style>
