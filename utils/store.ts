import jsonPointer from 'json-pointer'
import type { BlockBase } from '@/types/block'
const { remove, set, get } = jsonPointer

class StructureStore {
  private state: BlockBase[] = []
  public static Instance: StructureStore

  private constructor() {}

  public static getInstance() {
    if (!StructureStore.Instance) {
      StructureStore.Instance = new StructureStore()
    }
    return StructureStore.Instance
  }

  public dump() {
    return this.state
  }

  public setObject(path: string[], obj: BlockBase) {
    set(this.state, path, obj)
  }

  public removeObj(path: string[]) {
    remove(this.state, path)
  }

  public setTitle(path: string[], text: string) {
    set(this.state, path, text)
  }
}

export { structureStore }

const structureStore = {
  state: [] as BlockBase[],
  getters: {
    dump() {
      return structureStore.state
    },
    get(path: string[]) {
      return get(structureStore.state, path)
    },
  },
  setters: {
    setObject(path: string[], obj: BlockBase) {
      set(structureStore.state, path, obj)
    },
    setTitle(path: string[], text: string) {
      set(structureStore.state, path, text)
    },
    removeObj(path: string[]) {
      remove(structureStore.state, path)
    },
  },
}
