<template>
  <div class="w-72">
    <Listbox v-model="selectedGroup">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-gray-900 border border-gray-300 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-400 sm:text-sm"
        >
          <span class="block truncate">選擇勝利陣營</span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base text-gray-900 shadow-lg ring-1 ring-black/10 focus:outline-none hover:bg-gray-100 sm:text-sm z-20"
            @click="winG"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="Group in Win"
              :key="Group.name"
              :value="Group"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ Group.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/20/solid';

const selectedGroup = ref('');

const emit = defineEmits(['Win-click']);

const winG = () => {
  emit('Win-click', selectedGroup.value);
};

const props = defineProps({
  Win: {
    type: Array,
  },
});
</script>
