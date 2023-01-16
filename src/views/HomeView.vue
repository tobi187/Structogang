<script setup lang="ts">
import ProcessBlock from '@/components/ProcessBlock.vue'
import IfBlock from '@/components/IfBlock.vue'
import LoopBlock from '@/components/LoopBlock.vue'
import { type Component, ref } from 'vue'

const onHover = ref(false)

const doDelete = (index: number) => {
  children.value.splice(index, 1)
}

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
  <main>
    <div class="w-100 p-28 border">
      <div class="flex gap-3 justify-center p-5">
        <div
          draggable="true"
          class="m-2 p-2 border-black border bg-neutral-400"
          @dragstart="(evt: DragEvent) => evt.dataTransfer?.setData('name', 'if_block')"
        >
          if
        </div>
        <div
          draggable="true"
          class="m-2 p-2 border-black border bg-fuchsia-400"
          @dragstart="(evt: DragEvent) => evt.dataTransfer?.setData('name', 'loop')"
        >
          loop
        </div>
        <div
          draggable="true"
          class="m-2 p-2 border-black border bg-orange-400"
          @dragstart="(evt: DragEvent) => evt.dataTransfer?.setData('name', 'process')"
        >
          statement
        </div>
      </div>
      <div
        class="w-100 border border-black p-8"
        :class="{ 'bg-cyan-500': onHover }"
        @dragenter="onHover = true"
        @dragleave="onHover = false"
        @drop="dropper"
        @dragover.prevent
      >
        <i class="text-opacity-60">Drag here to add...</i>
      </div>
      <div>
        <div class="border border-black w-100">
          <component
            v-for="(name, index) in children"
            :key="index"
            :is="name"
            :index="index"
            @delete="(index: number, child: Component[] | null) => doDelete(index)"
          ></component>
        </div>
      </div>
    </div>
  </main>
</template>
