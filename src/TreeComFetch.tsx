import { useState } from 'react';
import { getCategories } from './data';
import { ITreeNode, TreeView } from './TreeView';

const categorias = getCategories();
export const TreeComFetch = () => {
  const [selected, setSelected] = useState<ITreeNode[]>([]);
  return (
    <TreeView
      nodes={categorias}
      onSelect={(nodes) => setSelected(nodes)}
      allowMultiSelect
      isSelectable={(categoria, level) => true}
      fetchChildrenNodes={fetchChildrenNodes}
    />
  );
};

const fetchChildrenNodes = (
  node: ITreeNode,
  level: number
): Promise<ITreeNode[]> => {
  console.log({ ...node, level });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(level > 2 ? [] : getCategories(node, level, 2));
    }, 300);
  });
};
