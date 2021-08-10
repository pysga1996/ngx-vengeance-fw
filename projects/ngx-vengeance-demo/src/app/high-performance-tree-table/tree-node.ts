export interface TreeNode<T> {
    data: T;
    children: TreeNode<T>[];
    expanded?: boolean;
    isDisabled: { [key: string]: boolean; };
    isFixed: { [key: string]: boolean; };
    sequence: number;
    level: number;
    paddingBlock: {[key: string]: boolean};
    hidden?: boolean;
}
