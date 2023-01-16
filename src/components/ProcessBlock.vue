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
      class="text-center p-2 basis-full bg-neutral-400 placeholder-black"
      v-model="text"
      placeholder="var tobi_gewinnt_aoc = !BitConverter.ToBoolean(new byte[] { (byte)(new Random().Next(4)) }, 0);"
    />
    <div class="flex bg-neutral-400 align-middle h-100">
      <div class="items-center flex">
        <font-awesome-icon
          size="lg"
          icon="fa-solid-xl fa-trash"
          class="rounded-full p-2 m-3 bg-red-600 hover:scale-125 hover:cursor-pointer"
          @click="emit('delete', props.index)"
        />
      </div>
    </div>
  </div>
</template>
