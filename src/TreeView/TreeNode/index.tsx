import { useEffect, useState } from 'react';
import './styles.css';
import { ITreeNode, TreeView, useTreeView } from '../../TreeView';
import { TreeNodeContainer } from '../../TreeView/TreeNode/Container';
import { TreeNodeToggleButton } from '../../TreeView/TreeNode/ToggleButton';
import { useQuery } from 'react-query';
import { TreeNodeLoader } from '../../TreeView/TreeNode/Loader';

export interface ITreeNodeProps {
  level: number;
  node: ITreeNode;
}

export const TreeNode = ({ ...props }: ITreeNodeProps) => {
  const { node, level } = props;
  const { nodeId, description } = node;
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    childrenNodes: [] as ITreeNode[],
    isLoading: false,
  });
  const { fetchChildrenNodes } = useTreeView();

  useEffect(() => {
    if (isOpen) {
      setState((state) => ({ ...state, isLoading: true }));
      fetchChildrenNodes(node, level)
        .then((childrenNodes) => {
          console.log(childrenNodes);
          setState((state) => ({
            ...state,
            childrenNodes,
          }));

          if (!childrenNodes.length) {
            setIsOpen(false);
          }
        })
        .finally(() => setState((state) => ({ ...state, isLoading: false })));
    }
  }, [isOpen]);

  return (
    <>
      <TreeNode.Container {...props}>
        <span>
          <TreeNode.ToggleButton {...props} toggle={() => setIsOpen(!isOpen)}>
            {isOpen ? '-' : '+'}
          </TreeNode.ToggleButton>
          {nodeId} - {description}
        </span>
      </TreeNode.Container>

      <div>
        <TreeNode.Loader {...props} show={isOpen && state.isLoading}>
          Carregando...
        </TreeNode.Loader>

        {isOpen &&
          !state.isLoading &&
          !!state.childrenNodes.length &&
          state.childrenNodes.map((node) => (
            <TreeNode key={node.nodeId} level={level + 1} node={node} />
          ))}
      </div>
    </>
  );
};

TreeNode.Container = TreeNodeContainer;
TreeNode.ToggleButton = TreeNodeToggleButton;
TreeNode.Loader = TreeNodeLoader;
