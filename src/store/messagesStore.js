import { defineStore } from 'pinia';

export const sucessMessage = defineStore('message', {
  state: () => ({
    message: '',
    isSuccess: false, 
  }),
  actions: {
    
    setMessage(newMessage, isSuccess) {
      this.message = newMessage;
      this.isSuccess = isSuccess; 
    },

    // Limpar a mensagem
    clearMessage() {
      this.message = '';
      this.isSuccess = false; 
    },
  },
});
