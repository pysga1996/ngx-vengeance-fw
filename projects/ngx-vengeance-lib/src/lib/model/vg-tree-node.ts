export interface VgTreeNode<T> {
  data: T;
  children: VgTreeNode<T>[];
  expanded?: boolean;
  level: number;
  isDisabled: { [key: string]: boolean; };
  isFixed: { [key: string]: boolean; };
  sequence: number;
  paddingBlock: {[key: string]: boolean};
  hidden?: boolean;
}
