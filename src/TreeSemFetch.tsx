import { useState } from 'react';
import { categorias } from './data';
import { ITreeNode, TreeView } from './TreeView';

export const TreeSemFetch = () => {
  const [selected, setSelected] = useState<ITreeNode[]>([]);
  return (
    <TreeView
      nodes={categorias}
      onSelect={(nodes) => setSelected(nodes)}
      allowMultiSelect
      isSelectable={(categoria, level) =>
        level === 0 || categoria.childrenNodes.length === 0
      }
    />
  );
};
