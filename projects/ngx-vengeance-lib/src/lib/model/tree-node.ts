export interface TreeNode<T> {
  data: T;
  children: TreeNode<T>[];
  expanded?: boolean;
  level: number;
  isSelected?: boolean;
}
