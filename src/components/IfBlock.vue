<script setup lang="ts">
import ProcessBlock from '@/components/ProcessBlock.vue'
import IfBlock from '@/components/IfBlock.vue'
import LoopBlock from '@/components/LoopBlock.vue'
import { ref, type Component } from 'vue'

const props = defineProps<{
  index: number
}>()

const buildChild = () => {
  if (childrenFalse.value.length > childrenTrue.value.length)
    return childrenFalse.value.concat(childrenTrue.value)
  else return childrenTrue.value.concat(...childrenFalse.value)
}

const emit = defineEmits<{
  (e: 'delete', id: number, child: Component[]): void
}>()

const doTrueDelete = (index: number, child: Component[] | null) => {
  childrenTrue.value.splice(index, 1)
  if (child != null) childrenTrue.value.push(...child)
}

const doFalseDelete = (index: number, child: Component[] | null) => {
  childrenFalse.value.splice(index, 1)
  if (child != null) childrenFalse.value.push(...child)
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

const childrenTrue = ref<Component[]>([])
const childrenFalse = ref<Component[]>([])
</script>

<template>
  <div class="border border-black">
    <div class="w-100 flex">
      <input
        class="w-full h-full p-3 text-center text-wrap bg-orange-300"
        v-model="text"
        placeholder="if (groesser < kleiner)"
      />
      <button
        class="bg-red-600 p-1"
        @click="emit('delete', props.index, buildChild())"
      >
        Del
      </button>
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
          @delete="(index: number, child: Component[]) => doTrueDelete(index, child)"
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
          @delete="(index: number, child: Component[]) => doFalseDelete(index, child)"
        >
        </component>
      </div>
    </div>
  </div>
</template>
