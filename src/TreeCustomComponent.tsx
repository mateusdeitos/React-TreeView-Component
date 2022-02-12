import { useState } from 'react';
import { getCategories } from './data';
import { ITreeNode, TreeViewConsumer, TreeViewProvider } from './TreeView';
import { ITreeNodeProps, TreeNode } from './TreeView/TreeNode';

const categorias = getCategories();
export const TreeCustomComponent = () => {
  const [selected, setSelected] = useState<ITreeNode[]>([]);
  return (
    <TreeViewProvider
      nodes={categorias}
      onSelect={(nodes) => setSelected(nodes)}
      allowMultiSelect
    >
      <TreeViewConsumer>
        {({ nodes }) =>
          nodes.map((node) => (
            <CustomTreeNodeComponent key={node.nodeId} node={node} />
          ))
        }
      </TreeViewConsumer>
    </TreeViewProvider>
  );
};

const CustomTreeNodeComponent: React.FC<ITreeNodeProps> = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { level = 0, node, Loader } = props;
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <TreeNode.Container {...props}>
        <TreeNode.ToggleButton
          isVisible={node.childrenNodes.length > 0}
          toggle={toggle}
          {...props}
        >
          {isOpen ? 'close' : 'open'}
        </TreeNode.ToggleButton>
        {node.description} ({node.nodeId})
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
      {isOpen &&
        node.childrenNodes.map((child) => (
          <CustomTreeNodeComponent
            key={child.nodeId}
            node={child}
            level={level + 1}
            Loader={Loader}
          />
        ))}
    </>
  );
};
