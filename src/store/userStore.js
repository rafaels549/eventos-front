import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
  state: () => ({
    uuid: localStorage.getItem('userUuid') || null,
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
  }),
  actions: {
    setUser(name, email, id) {
      this.uuid = id;
      this.name = name;
      this.email = email;
      localStorage.setItem('userUuid', id);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
    },
    clearUser() {
      this.uuid = null;
      this.name = '';
      this.email = '';
      localStorage.removeItem('userUuid');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
    },
  },
});
