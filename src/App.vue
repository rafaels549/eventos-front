<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
@import "tailwindcss";
nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

header {
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
