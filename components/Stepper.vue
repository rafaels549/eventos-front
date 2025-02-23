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
              'border-gray-300 text-gray-500': modelValue < index
            }"
          >
            <CheckIcon v-if="modelValue > index" class="w-5 h-5" />
            <span v-else>{{ index + 1 }}</span>
          </div>
          <span
            class="mt-2 text-sm"
            :class="{
              'text-blue-500': modelValue >= index,
              'text-gray-500': modelValue < index
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
        <form @submit.prevent>
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12" v-if="modelValue === 0">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <label for="eventName" class="block text-sm font-medium text-gray-900">Nome do Evento</label>
                  <input
                   id="eventName"
                   v-model="form.eventName"
                   type="text"
                    placeholder="Nome do evento"
                   class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                 
                </div>

                <div class="sm:col-span-4">
                  <label for="eventDate" class="block text-sm font-medium text-gray-900">Data do Evento</label>
                  <input
  id="eventDate"
  v-model="form.eventDate"
  type="date"
  class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>
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
import { ref, defineProps, defineEmits } from 'vue';
import { CheckIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  steps: Array,
  modelValue: Number
});
const form = ref({
  eventName: '',
  eventDate: ''
});

const emit = defineEmits(['update:modelValue']);

const nextStep = () => {
  if(props.modelValue === 0) {
    console.log(form.value);
    if (!eventName.value || !eventDate.value) {
      alert('Preencha todos os campos');
      return;
    }
  }

  if(props.modelValue==1){
    
  }
  if (props.modelValue < props.steps.length - 1) {
    emit('update:modelValue', props.modelValue + 1);
  }
};

const prevStep = () => {
  if (props.modelValue > 0) {
    emit('update:modelValue', props.modelValue - 1);
  }
};


</script>
