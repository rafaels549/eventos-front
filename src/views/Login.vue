<template>
    
    <section class="bg-gray-50 dark:bg-gray-900">
        <div v-if="message" class="bg-green-500 text-white text-center ">

               {{ message.message }}
        </div>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Entre na sua conta
              </h1>
              <form class="space-y-4 md:space-y-6" @submit.prevent="login">
                  <div>
                      <label for="email"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu email</label>
                      <input type="email" v-model="formData.email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nome@empresa.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                      <input type="password" v-model="formData.password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Lembrar-me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Esqueceu a senha?</a>
                  </div>
                  <button type="submit" class="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring focus:ring-primary-300 focus:ring-opacity-50 dark:bg-primary-500 dark:focus:ring-primary-600 cursor-pointer">Entrar</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Não tem uma conta? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Cadastre-se</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import router from '@/router';
import api from '@/axiosInstance';
import { sucessMessage } from '@/store/messagesStore';
import { userStore } from '@/store/userStore';

const message = sucessMessage();


onBeforeMount(() => {
    const userStored= userStore();
     if(userStored.uuid){
        router.push("/home");  
     }
});
setTimeout(() => {
    message.clearMessage()
}, 3000);

const userStored= userStore();

const formData = ref({
  email: '',
  password: ''
});

const login = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');
    const response = await api.post('/login', formData.value);

    const user = await api.get('/api/user');
       
    userStored.setUser(user.data.name, user.data.email,user.data.id);
     
     
    router.push("/home");
  } catch (error) {
    console.error('Erro ao fazer login:', error.response?.data || error.message);
  }
};
</script>