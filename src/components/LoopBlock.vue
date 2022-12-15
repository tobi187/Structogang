<script setup lang="ts">
import { ref, type Component } from 'vue'
import IfBlock from '@/components/IfBlock.vue'
import ProcessBlock from '@/components/ProcessBlock.vue'
import LoopBlock from '@/components/LoopBlock.vue'

const props = defineProps<{
  index: number
}>()

const bg_class = 'bg-lime-400'

const emit = defineEmits<{
  (e: 'delete', id: number, child: Component[]): void
}>()

const doDelete = (index: number, child: Component[] | null) => {
  children.value.splice(index, 1)

  if (child != null) children.value.push(...child)
}

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
      />
      <button
        @click="emit('delete', props.index, children)"
        class="bg-red-600 p-1"
      >
        Del
      </button>
    </div>
    <div class="flex">
      <div class="basis-1/5" :class="bg_class"></div>
      <div class="border border-black basis-4/5">
        <component
          v-for="(name, index) in children"
          :key="index"
          :is="name"
          :index="index"
          @delete="(id: number, child: Component[]) => doDelete(id, child)"
          class="border border-black"
        ></component>
      </div>
    </div>
  </div>
</template>
