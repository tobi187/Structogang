<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ProcessModel } from '@/models/blocks'
import { structureStore } from '@/models/store'

const props = defineProps<{
  index: number
  path: string[]
  isReadonly: true
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const store = structureStore

onMounted(() => {
  if (props.isReadonly ?? false) {
    const model = store.getters.get([
      ...props.path,
      props.index.toString(),
    ]) as ProcessModel
    text.value = model.text
  } else {
    const me: ProcessModel = { text: text.value, component: 'process' }
    store.setters.setObject([...props.path, props.index.toString()], me)
  }
})

const changeTitle = () => {
  const path = [...props.path, props.index.toString(), 'text']
  store.setters.setTitle(path, text.value)
}

const text = ref('')
</script>

<template>
  <div class="w-100 border border-black flex">
    <textarea
      class="text-center p-2 basis-full bg-neutral-400 placeholder-black"
      v-model="text"
      placeholder="var tobi_gewinnt_aoc = !BitConverter.ToBoolean(new byte[] { (byte)(new Random().Next(4)) }, 0);"
      @change="changeTitle"
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
