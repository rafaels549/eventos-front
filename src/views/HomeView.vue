<template>
  <HeaderComponent />
  
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 p-10">
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          class="rounded-t-lg w-full h-48 object-cover"
          src="https://www.bing.com/images/blob?bcid=sg4ej-W.Bh4I6g"
          alt=""
        >
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import router from '@/router';
import api from '@/axiosInstance';
import { userStore } from '@/store/userStore';
import HeaderComponent from '@/components/HeaderComponent.vue';


const user = userStore(); 

onBeforeMount(() => {
  if (!user.uuid) {
    router.push('/');
  }
});
 
const logout = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');
     api.post('/logout');
    user.clearUser();

    router.push('/');
  } catch (error) {
    
    console.error('Erro ao fazer logout:', error.response?.data || error.message);
  }
};
</script>