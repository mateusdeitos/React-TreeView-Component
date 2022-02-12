import './App.css';
import { ITreeNodeProps, TreeNode } from './TreeView/TreeNode';
import { useState } from 'react';
import { TreeSemFetch } from './TreeSemFetch';
import { TreeComFetch } from './TreeComFetch';

function App() {
  return (
    <div className="App">
      <div className="spacer"></div>
      <h3>Tree sem fetching de filhos</h3>
      <TreeSemFetch />
      <hr />
      <div className="spacer"></div>
      <h3>Tree com fetching de filhos</h3>
      <TreeComFetch />
      <hr />
    </div>
  );
}

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
