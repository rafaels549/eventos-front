<template>
    <v-stepper v-model="step" :items="['Informações', 'Foto', 'Pagamento']" hide-actions>      <template v-slot:item.1>
        <v-form ref="formStep1">
          <v-text-field 
            v-model="eventName" 
            label="Nome do evento" 
            :rules="[rules.required]" 
            required
            class="w-full"
          ></v-text-field>
  
          <div class="flex flex-wrap gap-6 justify-center mt-4">
            <div class="flex flex-col items-center">
              <v-date-picker v-model="eventDate" required></v-date-picker>
              <span v-if="!eventDate && showErrors" class="text-red-500 text-xs mt-1">Campo obrigatório</span>
            </div>
  
            <div class="flex flex-col items-center">
              <v-time-picker v-model="eventTime" required></v-time-picker>
              <span v-if="!eventTime && showErrors" class="text-red-500 text-xs mt-1">Campo obrigatório</span>
            </div>
          </div>
  
          <div class="flex justify-end mt-6">
            <v-btn @click="validateStep1" color="primary">Próximo</v-btn>
          </div>
        </v-form>
      </template>
  
      <!-- Segunda Etapa -->
      <template v-slot:item.2>
        <v-file-input
    accept="image/*"
    label="File input"
    @change="handleFileChange"
  ></v-file-input>
  <v-img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Pré-visualização"
      contain
      max-width="300"
      class="mt-4"
    ></v-img>
        <div class="flex justify-between mt-4">
          <v-btn @click="step--" color="secondary">Voltar</v-btn>
          <v-btn @click="step++" color="primary">Próximo</v-btn>
        </div>
      </template>
  
      <!-- Terceira Etapa -->
      <template v-slot:item.3>
        <v-card title="Step Three" flat>...</v-card>
        <div class="flex justify-between mt-4">
          <v-btn @click="step--" color="secondary">Voltar</v-btn>
          <v-btn color="success">Finalizar</v-btn>
        </div>
      </template>
  
    </v-stepper>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { VTimePicker } from 'vuetify/lib/labs/components.mjs'; 
  
  // Estado do formulário
  const step = ref(1);
  const eventName = ref('');
  const eventDate = ref(null);
  const eventTime = ref(null);
  const formStep1 = ref(null);
  const showErrors = ref(false); 
  const imageUrl = ref(null);
  

  const rules = {
    required: value => !!value || 'Campo obrigatório',
  };
  const validateStep1 = async () => {
    showErrors.value = true; 
    const { valid } = await formStep1.value.validate();
    if (valid && eventDate.value && eventTime.value) {
      step.value = 2;
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
     imageUrl.value = URL.createObjectURL(file);
  };
  </script>
  