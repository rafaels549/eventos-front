<template>
  <div>
    <h1>Página Inicial</h1>
    <p>Bem-vindo à página inicial!</p>
    <button @click="logout">Sair</button>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import router from '@/router';
import api from '@/axiosInstance';
import { userStore } from '@/store/userStore';


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