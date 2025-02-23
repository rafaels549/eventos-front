<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
          <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Faça Login
          </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit="submitForm">
              <div>
                  <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
                  <div class="mt-2">
                      <TextInput 
                          v-model:input="formData.email"
                          placeholder="Email address"
                          inputType="email"
                          :max="50"
                          :error="errors && errors.email ? errors.email[0] : ''"
                      />
                  </div>
              </div>

              <div>
                  <div class="flex items-center justify-between">
                      <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
                      <div class="text-sm">
                          <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                      </div>
                  </div>
                  <div class="mt-2">
                      <TextInput 
                          v-model:input="formData.password"
                          placeholder="Password"
                          inputType="password"
                          :max="50"
                          
                      />
                  </div>
              </div>

              <div>
                  <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Sign in
                  </button>
              </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14-day free trial</a>
          </p>
      </div>
  </div>
</template>

<script setup>


import { axiosInstance } from '~/axiosInstance';
import TextInput from '@/components/TextInput.vue';
const { $userStore } = useNuxtApp()
let errors = ref(null);
const router = useRouter();
const formData = ref({
  email: '',
  password: ''
});


const submitForm = async (e) => {
  e.preventDefault();
  errors.value = null; // Resetar erros antes da tentativa de login


  try {
    await $userStore.getTokens()
    await $userStore.login(formData.value.email, formData.value.password)
    await $userStore.getUser()
    router.push('/home');
  } catch (error) {
    console.log(error)
      if (error.response && error.response.data.errors) {
          errors.value = error.response.data.errors; // Exibir erros do backend
      } else {
          console.log(error.response?.data?.message || 'An error occurred');
      }
  }
};
</script>
