<script setup>
import { ref } from 'vue';
import Stepper from '@/components/Stepper.vue';

const steps = [
  { id: 1, name: 'Dados do Evento' },
  { id: 2, name: 'Imagem' },
  { id: 3, name: 'Pagamento' }
];

const currentStep = ref(0);

</script>

<template>
  <Stepper v-model="currentStep" :steps="steps" />
 
</template>
