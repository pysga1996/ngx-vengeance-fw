import { VgTreeNode } from '../model/vg-tree-node';

export class VgTreeUtil {
  public static createTreeFromFlatList<T>(
    // eslint-disable-next-line
    dataList: any[],
    idKey = 'id',
    parentIdKey = 'parent_id',
    // eslint-disable-next-line
    expanded = true,
    // eslint-disable-next-line
    mapFunc: (data: any) => T = (data) => data,
    rootId?: string
  ): {
    tree: VgTreeNode<T>[];
    map: { [key: string]: VgTreeNode<T> };
    root?: VgTreeNode<T>;
  } {
    const tree: VgTreeNode<T>[] = [];
    const map: { [key: string]: VgTreeNode<T> } = {};
    dataList.forEach((data) => {
      map[data[idKey]] = {
        data: mapFunc(data),
        children: [],
        level: 0,
        sequence: 0,
        isDisabled: {},
        isFixed: {},
        paddingBlock: {},
      };
    });
    Object.values(tree).forEach((node) => {
      // eslint-disable-next-line
      const parentNode: VgTreeNode<T> = map[(node.data as any)[parentIdKey]];
      if (parentNode) {
        parentNode.children.push(node);
      } else {
        tree.push(node);
      }
    });
    if (rootId) {
      const rootNode: VgTreeNode<T> = {
        data: { [idKey]: 'root', [parentIdKey]: null } as unknown as T,
        children: tree,
        level: -1,
        sequence: -1,
        isDisabled: {},
        isFixed: {},
        paddingBlock: {},
      };
      map[rootId] = rootNode;
      return { tree, map, root: rootNode };
    }
    return { tree, map };
  }
}
