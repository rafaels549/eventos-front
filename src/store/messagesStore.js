
import { defineStore } from 'pinia';
export const  sucessMessage= defineStore('message', {
    state: () => {
     
          message:""
      
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
      setMessage(newMessage){
          this.message = newMessage
      },
      clearMessage(){
         this.message = ''
      }
    },
  })