<script setup lang="ts">
import { ref, onMounted, type Component } from 'vue'
import type { Loop } from '@/models/blocks'
import IfBlock from '@/components/IfBlock.vue'
import ProcessBlock from '@/components/ProcessBlock.vue'
import LoopBlock from '@/components/LoopBlock.vue'
import { structureStore } from '@/models/store'

const props = defineProps<{
  index: number
  path: string[]
}>()

const bg_class = 'bg-lime-400'
const pathInternal = [...props.path, props.index.toString(), 'kids']

const store = structureStore

onMounted(() => {
  const me: Loop = { text: text.value, kids: [], component: 'loop' }
  store.setters.setObject([...props.path, props.index.toString()], me)
})

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const doDelete = (index: number) => {
  store.setters.removeObj([...pathInternal, index.toString()])
  children.value.splice(index, 1)
}

const onHover = ref(false)
const text = ref('')

const dropper = (evt: DragEvent) => {
  const component = evt.dataTransfer?.getData('name')
  if (component === 'if_block') children.value.push(IfBlock)
  if (component === 'process') children.value.push(ProcessBlock)
  if (component === 'loop') children.value.push(LoopBlock)
  onHover.value = false
}

const changeTitle = () => {
  const path = [...props.path, props.index.toString(), 'text']
  store.setters.setTitle(path, text.value)
}

const children = ref<Component[]>([])
</script>

<template>
  <div class="w-100 border border-black">
    <div
      class="p-5 flex"
      :class="[onHover ? 'bg-cyan-500' : bg_class]"
      @dragenter="onHover = true"
      @dragleave="onHover = false"
      @drop="dropper"
      @dragover.prevent
      @dragover="onHover = true"
    >
      <input
        class="basis-full text-center"
        :class="bg_class"
        placeholder="for (var i = int.Max; i > int.Min; i--)"
        v-model="text"
        @change="changeTitle"
      />
      <div class="flex align-middle">
        <div class="items-center flex">
          <font-awesome-icon
            size="lg"
            icon="fa-solid-xl fa-trash"
            class="rounded-full p-2 bg-red-600 hover:scale-125 hover:cursor-pointer"
            @click="emit('delete', props.index)"
          />
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="basis-1/5" :class="bg_class"></div>
      <div class="border border-black basis-4/5">
        <component
          v-for="(name, index) in children"
          :key="index"
          :is="name"
          :index="index"
          :path="pathInternal"
          @delete="(id: number) => doDelete(id)"
          class="border border-black"
        ></component>
      </div>
    </div>
  </div>
</template>
