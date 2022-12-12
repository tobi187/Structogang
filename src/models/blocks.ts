export type { IfModel, ProcessModel, BlockBase }

type BlockBase = {
  text: string
}

interface ProcessModel extends BlockBase {}

interface IfModel extends BlockBase {
  onTrue: string
  onFalse: string
}
