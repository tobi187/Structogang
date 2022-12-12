<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
</script>

<template>
  <div class="w-100 border border-black flex">
    <textarea class="text-center p-2 basis-full" :model="text" />
  </div>
</template>
