export interface TreeNode<T> {
  data: T;
  children: TreeNode<T>[];
  expanded?: boolean;
  level: number;
  isDisabled: { [key: string]: boolean; };
  isFixed: { [key: string]: boolean; };
  sequence: number;
  paddingBlock: {[key: string]: boolean};
  hidden?: boolean;
}
