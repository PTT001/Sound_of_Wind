<script setup>
import { onMounted, ref } from 'vue';
import { initTWE, Collapse, Ripple, Modal, Input } from 'tw-elements';
import { RoleData, AddProfile, GetAllUser } from '../api/api';

onMounted(async () => {
  initTWE({ Collapse, Ripple, Modal, Input });
});

const userName = ref('');
const selectedRole = ref('');

const userlist = ref([]);
const roledata = ref([]);
const FinalProfile = ref([]);

const getroledata = await RoleData();
const getuserdata = await GetAllUser();

roledata.value = getroledata.data;
userlist.value = getuserdata.data;

FinalProfile.value = roledata.value
  .map(item1 => {
    const match = userlist.value.find(item2 => item2.Role === item1.Role);

    return match
      ? {
          name: match.name,
          gender: item1.gender,
          Role: item1.Role,
          task: item1.Task,
          skill: item1.skill,
        }
      : null;
  })
  .filter(item => item !== null);

const AddPerson = () => {
  AddProfile({ name: 'ray2', role: '刀鋒' });
};

const submitForm = event => {
  if (selectedRole.value === '') {
    event.preventDefault(); // 防止默認的表單提交行為
    alert('請選擇一個角色');
  } else {
    // 如果選擇了角色，則進行表單提交或其他操作
    // ...
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div id="accordionExample" class="w-11/12">
      <div
        v-for="(item, index) in FinalProfile"
        :key="index"
        class="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark"
      >
        <h2 class="mb-0" id="headingOne">
          <button
            class="group relative flex w-full items-center rounded-t-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white [&:not([data-twe-collapse-collapsed])]:bg-white [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 font-black"
            type="button"
            data-twe-collapse-init
            data-twe-collapse-collapsed
            :data-twe-target="`#collapse${index}`"
            aria-expanded="false"
            :aria-controls="`collapse${index}`"
            :style="{ color: item.gender === 1 ? 'blue' : 'red' }"
          >
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
            <div class="text-emerald-500 mb-2">機密任務：{{ item.task }}</div>
            <div v-if="item.skill?.技能一" class="mb-2">
              <span class="font-semibold">技能一：</span
              >{{ item.skill?.技能一 }}
            </div>
            <div v-if="item.skill?.技能二" class="mb-2">
              <span class="font-semibold">技能二：</span
              >{{ item.skill?.技能二 }}
            </div>
            <div v-if="item.skill?.技能三" class="mb-2">
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
      class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
      data-twe-toggle="modal"
      data-twe-target="#exampleModalFullscreen"
      data-twe-ripple-init
      data-twe-ripple-color="light"
    >
      Launch demo modal full screen
    </button>

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
          <div class="relative p-4 min-[0px]:overflow-y-auto my-auto">
            <div
              class="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark"
            >
              <h1>{{ userName }}</h1>
              <h1>{{ selectedRole }}</h1>
              <form>
                <!--名字-->
                <div class="relative mb-4" data-twe-input-wrapper-init>
                  <input
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    v-model="userName"
                  />
                  <label
                    for="exampleInputEmail1"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary"
                    >名字</label
                  >
                </div>

                <!--角色-->
                <div class="mb-4">
                  <div class="relative">
                    <select
                      v-model="selectedRole"
                      id="country"
                      name="country"
                      class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">選擇角色</option>
                      <option value="cn">中國</option>
                      <option value="us">美國</option>
                      <option value="jp">日本</option>
                      <option value="kr">韓國</option>
                    </select>
                  </div>
                </div>
                <!--Submit button-->
                <div class="flex justify-center">
                  <button
                    type="submit"
                    class="w-full inline-block rounded bg-info px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-info-accent-500 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    @click="submitForm"
                  >
                    送出
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

<style scoped></style>
