<script setup lang="ts">
import ProcessBlock from '@/components/ProcessBlock.vue'
import IfBlock from '@/components/IfBlock.vue'
import LoopBlock from '@/components/LoopBlock.vue'
import type { IfModel } from '@/models/blocks'
import { ref, onMounted, type Component } from 'vue'
import { structureStore } from '@/models/store'

const props = defineProps<{
  index: number
  path: string[]
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const store = structureStore

const trueInternal = [...props.path, props.index.toString(), 'trueKids']
const falseInternal = [...props.path, props.index.toString(), 'falseKids']

onMounted(() => {
  const me: IfModel = {
    text: text.value,
    trueKids: [],
    falseKids: [],
    component: 'if_block',
  }
  store.setters.setObject([...props.path, props.index.toString()], me)
})

const doTrueDelete = (index: number) => {
  store.setters.removeObj([...trueInternal, index.toString()])
  childrenTrue.value.splice(index, 1)
}

const doFalseDelete = (index: number) => {
  store.setters.removeObj([...falseInternal, index.toString()])
  childrenFalse.value.splice(index, 1)
}

const hoverTrue = ref(false)
const hoverFalse = ref(false)

const text = ref('')

const onFalseDrop = (evt: DragEvent) => {
  const component = evt.dataTransfer?.getData('name')
  if (component === 'process') childrenFalse.value.push(ProcessBlock)
  if (component === 'if_block') childrenFalse.value.push(IfBlock)
  if (component === 'loop') childrenFalse.value.push(LoopBlock)
  hoverFalse.value = false
}

const onTrueDrop = (evt: DragEvent) => {
  const component = evt.dataTransfer?.getData('name')
  if (component === 'process') childrenTrue.value.push(ProcessBlock)
  if (component === 'if_block') childrenTrue.value.push(IfBlock)
  if (component === 'loop') childrenTrue.value.push(LoopBlock)
  hoverTrue.value = false
}

const changeTitle = () => {
  const path = [...props.path, props.index.toString(), 'title']
  store.setters.setTitle(path, text.value)
}

const childrenTrue = ref<Component[]>([])
const childrenFalse = ref<Component[]>([])
</script>

<template>
  <div class="border border-black">
    <div class="w-100 flex bg-orange-300 items-center">
      <input
        class="w-full h-full p-3 text-center text-wrap bg-orange-300"
        v-model="text"
        placeholder="if (groesser < kleiner)"
        @change="changeTitle"
      />
      <div class="flex align-middle">
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
    <div class="flex border w-100">
      <div class="w-1/2 border border-black p-2 py-4">
        <div
          class="w-100 h-100 text-center"
          :class="{ 'bg-cyan-500': hoverTrue }"
          @dragenter="hoverTrue = true"
          @dragleave="hoverTrue = false"
          @drop="onTrueDrop"
          @dragover.prevent
        >
          True
        </div>
        <component
          v-for="(name, index) in childrenTrue"
          :key="index"
          :index="index"
          :is="name"
          :path="trueInternal"
          @delete="(index: number) => doTrueDelete(index)"
        >
        </component>
      </div>
      <div class="w-1/2 border border-black p-2 py-4">
        <div
          class="w-100 h-100 text-center drop-zone"
          :class="{ 'bg-cyan-500': hoverFalse }"
          @dragenter="hoverFalse = true"
          @dragleave="hoverFalse = false"
          @drop="onFalseDrop"
          @dragover.prevent
        >
          False
        </div>
        <component
          v-for="(name, index) in childrenFalse"
          :key="index"
          :is="name"
          :index="index"
          :path="falseInternal"
          @delete="(index: number) => doFalseDelete(index)"
        >
        </component>
      </div>
    </div>
  </div>
</template>
