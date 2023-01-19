<script setup lang="ts">
import type { BlockBase } from '@/models/blocks'
import { structureStore } from '@/models/store'
import { ref, onMounted, type Component } from 'vue'
import ProcessBlock from '@/components/ProcessBlock.vue'
import IfBlock from '@/components/IfBlock.vue'
import LoopBlock from '@/components/LoopBlock.vue'

const readOnlyView = ref(false)
const path = ['/']

const store = structureStore

onMounted(() => {
  const data = store.getters.dump() as BlockBase[]
  data.forEach((el) => {
    if (el.component === 'if_block') children.value.push(IfBlock)
    if (el.component === 'process') children.value.push(ProcessBlock)
    if (el.component === 'loop') children.value.push(LoopBlock)
  })
})

const children = ref<Component[]>([])
</script>

<template>
  <main>
    <div class="w-100 p-20 border">
      <div class="flex justify-center">
        <h1>Sketch Hochladen</h1>
      </div>
      <div></div>

      <div>
        <div class="border border-black w-100">
          <component
            v-for="(name, index) in children"
            :key="index"
            :is="name"
            :index="index"
            :path="path"
            :isReadonly="readOnlyView"
          ></component>
        </div>
      </div>
    </div>
  </main>
</template>
