<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  index: number
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const text = ref('')
</script>

<template>
  <div class="w-100 border border-black flex">
    <textarea
      class="text-center p-2 basis-full bg-neutral-400"
      :model="text"
      placeholder="deklariere a als b"
    />
    <button class="p-1 bg-red-600" @click="emit('delete', props.index)">
      Del
    </button>
  </div>
</template>
