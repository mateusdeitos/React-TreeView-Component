import { useState } from 'react';
import { getCategories } from './data';
import { ITreeNode, TreeView } from './TreeView';
import { TreeNode } from './TreeView/TreeNode';

const categorias = getCategories();
export const TreeComFetch = () => {
  const [selected, setSelected] = useState<ITreeNode[]>([]);
  return (
    <TreeView
      nodes={categorias}
      onSelect={(nodes) => setSelected(nodes)}
      allowMultiSelect
      renderNodesAutomatically
      isSelectable={(categoria, level) => level <= 1}
      fetchChildrenNodes={fetchChildrenNodes}
      CustomLoaderComponent={({ ...props }) => {
        return (
          <TreeNode.Container {...props}>
            <strong>Aguarde, carregando...</strong>
          </TreeNode.Container>
        );
      }}
    />
  );
};

const fetchChildrenNodes = (
  node: ITreeNode,
  level: number
): Promise<ITreeNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(level > 2 ? [] : getCategories(node, level));
    }, 300);
  });
};
