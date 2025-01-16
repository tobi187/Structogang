export type { IfModel, ProcessModel, BlockBase, Loop }

type BlockBase = {
  text: string
  component: string
}

interface ProcessModel extends BlockBase {
  text: string
}

interface IfModel extends BlockBase {
  text: string
  trueKids: BlockBase[]
  falseKids: BlockBase[]
}

interface Loop extends BlockBase {
  text: string
  kids: BlockBase[]
}
