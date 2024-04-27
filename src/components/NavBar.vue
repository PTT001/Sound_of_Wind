<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const GoToHome = () => {
  router.push(`Home`);
};

const GoToRecord = () => {
  router.push(`record`);
};

const GoToLoginRecord = () => {
  router.push(`LoginRecord`);
};

const GoToEmailBox = () => {
  router.push(`EmailBox`);
};
</script>

<template>
  <!-- Second navbar -->
  <!-- Main navigation container -->
  <nav
    class="fixed-top relative flex w-full flex-nowrap items-center justify-between bg-[#332D2D] py-2 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-4"
    data-twe-navbar-ref
  >
    <div class="flex w-full flex-wrap items-center justify-between px-3">
      <div class="mx-2"></div>
      <!-- Hamburger button for mobile view -->
      <button
        class="block border-0 bg-transparent px-2 text-neutral-300 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
        type="button"
        data-twe-collapse-init
        data-twe-target="#navbarSupportedContent10"
        aria-controls="navbarSupportedContent10"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <!-- Hamburger icon -->
        <span
          class="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <!-- Collapsible navbar container -->
      <div
        class="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
        id="navbarSupportedContent10"
        data-twe-collapse-item
      >
        <!-- Left links -->
        <ul
          class="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
          data-twe-navbar-nav-ref
        >
          <!-- Home link -->
          <li class="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
            <a
              class="text-neutral-300 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 active:text-black/80 motion-reduce:transition-none lg:px-2"
              aria-current="page"
              href="#"
              data-twe-nav-link-ref
              >首頁</a
            >
          </li>
          <!-- Features link -->
          <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a
              class="p-0 text-neutral-300 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 active:text-black/80 motion-reduce:transition-none lg:px-2"
              href="#"
              data-twe-nav-link-ref
              >戰績登記</a
            >
          </li>
          <!-- Pricing link -->
          <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a
              class="p-0 text-neutral-300 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 active:text-black/80 motion-reduce:transition-none lg:px-2"
              href="#"
              data-twe-nav-link-ref
              @click.prevent="GoToRecord"
              >戰績歷史</a
            >
          </li>
          <!-- About link -->
          <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
            <a
              class="p-0 text-neutral-300 transition duration-200 hover:text-neutral-200 hover:ease-in-out focus:text-neutral-200 active:text-black/80 motion-reduce:transition-none lg:px-2"
              href="#"
              data-twe-nav-link-ref
              >意見箱</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
