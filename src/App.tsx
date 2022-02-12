import { categorias, getCategories } from './data';
import './App.css';
import { ITreeNode, TreeView } from './TreeView';
import { ITreeNodeProps, TreeNode } from './TreeView/TreeNode';
import { useState } from 'react';

function App() {
  const [selected, setSelected] = useState<ITreeNode[]>([]);
  return (
    <div className="App">
      <TreeView
        nodes={categorias}
        onSelect={(nodes) => setSelected(nodes)}
        allowMultiSelect
        isSelectable={(categoria, level) =>
          level === 0 || categoria.childrenNodes.length === 0
        }
        fetchChildrenNodes={fetchChildrenNodes}
        // CustomTreeNodeComponent={CustomTreeNodeComponent}
      />
    </div>
  );
}

const fetchChildrenNodes = (
  node: ITreeNode,
  level: number
): Promise<ITreeNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getCategories(node, level));
    }, 2000);
  });
};

const CustomTreeNodeComponent: React.FC<ITreeNodeProps> = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { level, node } = props;
  const toggle = () => setIsOpen(!isOpen);
  return (
    <TreeNode.Container {...props}>
      <TreeNode.ToggleButton toggle={toggle} {...props}>
        {isOpen ? 'close' : 'open'}
      </TreeNode.ToggleButton>
      {isOpen && (
        <div>
          <p>Level: {level}</p>
          <p>Id: {node.nodeId}</p>
          <p>descrição: {node.description}</p>
          <p>parentNodeID: {node.parentNode?.nodeId || 0}</p>
          <p>Filhos: {node.childrenNodes.length}</p>
        </div>
      )}
    </TreeNode.Container>
  );
};

export default App;
