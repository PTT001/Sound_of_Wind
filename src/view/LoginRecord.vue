<template>
  <div
    class="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-300 to-slate-700"
  >
    <div class="mt-10">
      <h1 class="text-orange-600 font-[900]">誰贏</h1>
      <SingleChoice @win-click="WinGroup" :Win="Win" />
      <span v-for="item in WinG" class="text-violet-700">{{ item }}</span>
    </div>

    <div class="mt-10">
      <h1 class="text-red-500 font-[900]">潛伏</h1>
      <choice @child-click="red" :people="people" />
      <span v-for="item in RedPeople" class="text-violet-700">{{ item }}/</span>
    </div>

    <div class="mt-10">
      <h1 class="text-blue-600 font-[900]">軍情</h1>
      <choice @child-click="blue" :people="people" />
      <span v-for="item in BluePeople" class="text-violet-700"
        >{{ item }}/</span
      >
    </div>

    <div class="mt-10">
      <h1 class="text-green-700 font-[900]">醬油</h1>
      <choice @child-click="green" :people="people" />
      <span v-for="item in GreenPeople" class="text-violet-700"
        >{{ item }}/</span
      >
    </div>

    <button
      class="my-20 bg-[#02F78E] p-3 text-white rounded-lg text-lg font-[900] border"
      @click="SendRecord"
    >
      送出
    </button>
  </div>
</template>

<script setup>
import choice from '../components/Choice.vue';
import SingleChoice from '../components/SingleChoice.vue';
import { ref } from 'vue';
import { CreateRecord } from '../api/api';

const RedPeople = ref('');
const BluePeople = ref('');
const GreenPeople = ref('');
const WinG = ref('');
const WinGroup = x => {
  WinG.value = x.name;
};

const people = [
  { id: 1, name: 'Ray' },
  { id: 2, name: 'Bael' },
  { id: 3, name: '啟鈞' },
  { id: 4, name: '趙哥' },
  { id: 5, name: '小捷' },
  { id: 6, name: 'Damina' },
  { id: 7, name: 'Emma' },
  { id: 8, name: 'Dora' },
  { id: 9, name: '禹珺' },
  { id: 10, name: 'Danny' },
  { id: 11, name: '小澤' },
  { id: 12, name: '得育' },
  { id: 13, name: '朱' },
  { id: 14, name: '柏宇' },
  { id: 15, name: 'Olivia' },
];

const Win = [
  { id: 1, name: '潛伏' },
  { id: 2, name: '軍情' },
  { id: 3, name: '醬油' },
];

const red = value => {
  RedPeople.value = value.map(item => item.name);
  console.log(RedPeople.value);
};
const blue = value => {
  BluePeople.value = value.map(item => item.name);
};
const green = value => {
  GreenPeople.value = value.map(item => item.name);
};

const SendRecord = async () => {
  await CreateRecord({
    Red: RedPeople.value,
    Blue: BluePeople.value,
    Green: GreenPeople.value,
  });
  window.location.reload();
};
</script>
