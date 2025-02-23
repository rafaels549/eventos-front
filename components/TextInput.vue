<template>
    <div>
      <input 
      :id="`input-${placeholder}`"
      :placeholder="placeholder"
      :type="inputType"
      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      v-model="inputComputed"
      autcomplete="off"
      :maxlength="max"
      >

      <span v-if="error" class="text-red-500 text-[14px] font-semibold">
         {{ error }}
      </span>
    </div>
</template>

<script setup>
const emit = defineEmits(['update:input'])
const props = defineProps(['input', 'placeholder', 'inputType', 'max', 'autoFocus', 'error'])
const { input, placeholder, inputType, max, autoFocus, error } = toRefs(props)
onMounted(() => {
    if(autoFocus.value) {
        document.getElementById(`input-${placeholder.value}`).focus()
    }
})

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})
</script>

