import {TreeNode} from "./tree-node";

export type TreeNodeCheckboxEvent = {
  key: string;
  checked: boolean;
  node: TreeNode<unknown>
}
