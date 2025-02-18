<template>
 <div v-if="message" class="bg-red-500 text-white text-center ">

{{ message.message }}
</div>

  <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white text-center">Criar uma Conta</h1>
      <form @submit.prevent="registerUser" class="space-y-4">
        <div class="relative z-0 w-full mb-5 group">
          <input type="text" v-model="formData.name" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="text" v-model="formData.sobrenome" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sobrenome</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="email" v-model="formData.email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" v-model="formData.password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Senha</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" v-model="formData.password_confirmation" name="floating_password_confirmation" id="floating_password_confirmation" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_password_confirmation" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmar Senha</label>
        </div>
        <button 
          v-if="loading" 
          type="button" 
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg role="status" class="inline mr-2 w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill="currentColor" d="M100 50.241c0-27.393-22.383-49.776-49.776-49.776S.448 22.848.448 50.241c0 27.392 22.383 49.775 49.776 49.775S100 77.633 100 50.241z" opacity=".25"/>
            <path fill="currentFill" d="M93.974 50.241c0-23.664-19.21-42.874-42.874-42.874s-42.874 19.21-42.874 42.874c0 23.663 19.21 42.873 42.874 42.873s42.874-19.21 42.874-42.873z" />
          </svg>
          Carregando...
        </button>
        <button 
          v-else
          type="submit" 
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/axiosInstance';
import router from '@/router';
import { sucessMessage } from '@/store/messagesStore';


 const message = sucessMessage();
const formData = ref({
  name: "",
  sobrenome: "",
  email: "",
  password: "",
  password_confirmation: ""
});


const loading = ref(false); // Estado de carregamento

const registerUser = async () => {
  loading.value = true; // Ativa o carregamento

  try {
    // Concatenar nome e sobrenome antes de enviar
    const fullName = `${formData.value.name} ${formData.value.sobrenome}`;
    formData.value.name = fullName;  // A variável 'name' vai receber o nome completo

    // Requisição para obter o cookie CSRF
    await api.get('/sanctum/csrf-cookie');

    // Enviar o formulário com o nome concatenado
    const response = await api.post("/register", formData.value);
    message.setMessage(response)
    console.log("Usuário registrado com sucesso:", response.data);
    router.push("/");

  } catch (error) {
       
        message.setMessage(error.response.data.message)
        setTimeout(() => {
            message.clearMessage()
        }, 3000);

    console.error("Erro ao registrar usuário:", error.response?.data || error.message);
  } finally {
    loading.value = false; // Desativa o carregamento
  }
};
</script>
