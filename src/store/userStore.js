import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
  state: () => ({
    uuid: localStorage.getItem('userUuid') || null,
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    isAdmin: localStorage.getItem('isAdmin') || false,
  }),
  actions: {
    setUser(name, email, id, isAdmin) {
      this.uuid = id;
      this.name = name;
      this.email = email;
      localStorage.setItem('userUuid', id);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isAdmin', isAdmin);
    },
    clearUser() {
      this.uuid = null;
      this.name = '';
      this.email = '';
      localStorage.removeItem('userUuid');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('isAdmin');
    },
  },
});
