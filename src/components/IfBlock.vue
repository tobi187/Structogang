<script setup lang="ts">
import ProcessBlock from '@/components/ProcessBlock.vue'
import IfBlock from '@/components/IfBlock.vue'
import LoopBlock from '@/components/LoopBlock.vue'
import { ref, type Component } from 'vue'

const hoverTrue = ref(false)
const hoverFalse = ref(false)

const text = ref('if (groesser < kleiner)')

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
    <div class="w-100">
      <input class="w-full h-full p-2 text-center text-wrap" v-model="text" />
    </div>
    <div class="flex border w-100">
      <div class="w-1/2 border border-black">
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
          :is="name"
        >
        </component>
      </div>
      <div class="w-1/2 border border-black p-2">
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
        >
        </component>
      </div>
    </div>
  </div>
</template>
