<template>
    <div class="w-full mx-auto mt-10">
      <!-- Barra de progresso -->
      <div class="relative flex items-center justify-between mb-6">
        <div class="absolute top-5 left-0 h-0.5 bg-gray-300"></div>
        <div class="absolute top-5 left-0 h-0.5 bg-blue-500 transition-all duration-300" :style="{ width: progressWidth }"></div>
        <template v-for="(step, index) in steps" :key="step.id">
          <div
            class="relative flex-1 flex flex-col items-center z-10"
            @click="goToStep(index)"
          >
            <div
              class="w-10 h-10 flex items-center justify-center rounded-full border-2 cursor-pointer transition-all duration-300"
              :class="{
                'bg-blue-500 border-blue-500 text-white scale-110': modelValue >= index,
                'border-gray-300 text-gray-500': modelValue < index,
                'border-red-500 text-red-500': stepHasError(index)
              }"
            >
              <CheckIcon v-if="modelValue > index" class="w-5 h-5" />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span
              class="mt-2 text-sm"
              :class="{
                'text-blue-500': modelValue >= index,
                'text-gray-500': modelValue < index,
                'text-red-500': stepHasError(index)
              }"
            >
              {{ step.name }}
            </span>
          </div>
        </template>
      </div>
  
      <!-- Formulário dinâmico -->
      <Transition
        mode="out-in"
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div :key="modelValue" class="p-6 bg-white shadow-md rounded-lg">
          <p class="text-center text-lg font-semibold">{{ steps[modelValue].name }}</p>
  
          <!-- Formulário de cada step -->
          <form>
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12" v-if="modelValue === 0">
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label for="eventName" class="block text-sm font-medium text-gray-900">Nome do Evento</label>
                    <TextInput
                      id="eventName"
                      v-model="eventName"
                      :placeholder="'Nome do evento'"
                      inputType="text"
                      :max="100"
                      :class="{'border-red-500': !isValid.eventName}"
                    />
                    <p v-if="!isValid.eventName" class="text-red-500 text-sm mt-2">O nome do evento é obrigatório.</p>
                  </div>
  
                  <div class="sm:col-span-4">
                    <label for="eventDate" class="block text-sm font-medium text-gray-900">Data do Evento</label>
                    <TextInput
                      id="eventDate"
                      v-model="eventDate"
                      inputType="date"
                      :max="100"
                      :class="{'border-red-500': !isValid.eventDate}"
                    />
                    <p v-if="!isValid.eventDate" class="text-red-500 text-sm mt-2">A data do evento é obrigatória.</p>
                  </div>
                </div>
              </div>
  
              <div class="border-b border-gray-900/10 pb-12" v-if="modelValue === 1">
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label for="eventImage" class="block text-sm font-medium text-gray-900">Escolha uma Imagem</label>
                    <input
                      type="file"
                      id="eventImage"
                      name="eventImage"
                      class="mt-2 p-2 border rounded w-full"
                      :class="{'border-red-500': !isValid.eventImage}"
                      @change="handleImageChange"
                    />
                    <p v-if="!isValid.eventImage" class="text-red-500 text-sm mt-2">A imagem é obrigatória.</p>
                  </div>
                </div>
              </div>
  
              <div class="border-b border-gray-900/10 pb-12" v-if="modelValue === 2">
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label for="cardNumber" class="block text-sm font-medium text-gray-900">Número do Cartão</label>
                    <TextInput
                      id="cardNumber"
                      v-model="cardNumber"
                      :placeholder="'Número do cartão'"
                      inputType="text"
                      :max="19"
                      :class="{'border-red-500': !isValid.cardNumber}"
                    />
                    <p v-if="!isValid.cardNumber" class="text-red-500 text-sm mt-2">O número do cartão é obrigatório.</p>
                  </div>
  
                  <div class="sm:col-span-4">
                    <label for="expiryDate" class="block text-sm font-medium text-gray-900">Data de Validade</label>
                    <TextInput
                      id="expiryDate"
                      v-model="expiryDate"
                      inputType="month"
                      :max="100"
                      :class="{'border-red-500': !isValid.expiryDate}"
                    />
                    <p v-if="!isValid.expiryDate" class="text-red-500 text-sm mt-2">A data de validade é obrigatória.</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Transition>
  
      <!-- Navegação -->
      <div class="flex justify-between mt-6">
        <button @click="prevStep" :disabled="modelValue === 0" class="text-blue-500 disabled:text-gray-300">Anterior</button>
        <button @click="nextStep" :disabled="modelValue === steps.length - 1" class="text-blue-500 disabled:text-gray-300">Próximo</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, computed } from 'vue';
  import TextInput from './TextInput.vue'; // Importando o componente TextInput
  import { CheckIcon } from '@heroicons/vue/24/solid';
  
  const props = defineProps({
    steps: Array,
    modelValue: Number
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const nextStep = () => {
    if (isValidStep()) {
      if (props.modelValue < props.steps.length - 1) {
        emit('update:modelValue', props.modelValue + 1);
      }
    }
  };
  
  const prevStep = () => {
    if (props.modelValue > 0) {
      emit('update:modelValue', props.modelValue - 1);
    }
  };
  
  const goToStep = (index) => {
    emit('update:modelValue', index);
  };
  
  const progressWidth = computed(() => {
    return ((props.modelValue / (props.steps.length - 1)) * 100) + '%';
  });
  
  // Validar os campos do formulário
  const isValid = ref({
    eventName: true,
    eventDate: true,
    eventImage: true,
    cardNumber: true,
    expiryDate: true
  });
  
  const eventName = ref('');
  const eventDate = ref('');
  const cardNumber = ref('');
  const expiryDate = ref('');
  const eventImage = ref(null);
  
  const stepHasError = (index) => {
    switch (index) {
      case 0:
        return !eventName.value || !eventDate.value;
      case 1:
        return !eventImage.value;
      case 2:
        return !cardNumber.value || !expiryDate.value;
      default:
        return false;
    }
  };
  
  const isValidStep = () => {
    const errors = {
      eventName: eventName.value.trim() !== '',
      eventDate: eventDate.value !== '',
      eventImage: eventImage.value !== null,
      cardNumber: cardNumber.value.trim() !== '',
      expiryDate: expiryDate.value !== ''
    };
    
    isValid.value = errors;
    
    return Object.values(errors).every((valid) => valid);
  };
  
  const handleImageChange = (event) => {
    eventImage.value = event.target.files[0];
  };
  </script>
  