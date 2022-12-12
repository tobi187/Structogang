<script setup lang="ts">
import { ref, type Component } from 'vue'
import IfBlock from '@/components/IfBlock.vue'
import ProcessBlock from '@/components/ProcessBlock.vue'
import LoopBlock from '@/components/LoopBlock.vue'

const onHover = ref(false)
const text = ref('for (var i = int.Max; i > int.Min; i--)')

const dropper = (evt: DragEvent) => {
  const component = evt.dataTransfer?.getData('name')
  if (component === 'if_block') children.value.push(IfBlock)
  if (component === 'process') children.value.push(ProcessBlock)
  if (component === 'loop') children.value.push(LoopBlock)
  onHover.value = false
}

const children = ref<Component[]>([])
</script>

<template>
  <div class="w-100 border border-black">
    <div
      class="p-3 flex"
      :class="{ 'bg-cyan-500': onHover }"
      @dragenter="onHover = true"
      @dragleave="onHover = false"
      @drop="dropper"
      @dragover.prevent
    >
      <input class="basis-full text-center" v-model="text" />
    </div>
    <div class="flex">
      <div class="basis-1/5"></div>
      <div class="border border-black basis-4/5">
        <component
          v-for="(name, index) in children"
          :key="index"
          :is="name"
          class="border border-black"
        ></component>
      </div>
    </div>
  </div>
</template>
