import { createRouter, createWebHistory } from 'vue-router';

// Importar as páginas/componentes
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Home from './views/Home.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  {path:'/home', component:Home}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
