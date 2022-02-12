import { useState } from 'react';
import { getCategories } from './data';
import { ITreeNode, TreeView } from './TreeView';

const categorias = getCategories();
export const TreeSemFetch = () => {
  const [selected, setSelected] = useState<ITreeNode[]>([]);
  return (
    <TreeView
      nodes={categorias}
      onSelect={(nodes) => setSelected(nodes)}
      renderNodesAutomatically
    />
  );
};
