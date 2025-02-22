import { createRouter, createWebHistory } from 'vue-router';

// Importar as páginas/componentes
import Login from './views/LoginView.vue';
import Register from './views/RegisterView.vue';
import Home from './views/HomeView.vue';
import CriarEvento from './views/CriarEvento.vue';
const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  {path:'/home', component:Home},
  {path:'/criarEvento', component:CriarEvento}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
