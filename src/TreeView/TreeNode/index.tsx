import { useState } from 'react';
import './styles.css';
import { ITreeNode, useTreeView } from '../../TreeView';
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
  const { fetchChildrenNodes } = useTreeView();
  const [buttonState, setButtonState] = useState({
    isOpen: false,
    isVisible: !!fetchChildrenNodes || !!node.childrenNodes.length,
  });

  const { data: childrenNodes, isLoading } = useQuery<ITreeNode[]>(
    ['nodes', node.nodeId],
    () =>
      !!fetchChildrenNodes
        ? fetchChildrenNodes(node, level)
        : Promise.resolve(node.childrenNodes),
    {
      enabled: buttonState.isOpen,
      onSettled: (data) => {
        if (!data || !data?.length) {
          setButtonState((state) => ({
            ...state,
            isOpen: false,
            isVisible: false,
          }));
        }
      },
    }
  );

  const renderChildren = buttonState.isOpen && !isLoading && !!childrenNodes;

  return (
    <>
      <TreeNode.Container {...props}>
        <span>
          <TreeNode.ToggleButton
            {...props}
            isVisible={buttonState.isVisible}
            toggle={() =>
              setButtonState((state) => ({ ...state, isOpen: !state.isOpen }))
            }
          >
            {buttonState.isOpen ? '-' : '+'}
          </TreeNode.ToggleButton>
          {nodeId} - {description}
        </span>
      </TreeNode.Container>

      <div>
        <TreeNode.Loader
          {...props}
          show={buttonState.isOpen && isLoading && !!fetchChildrenNodes}
        >
          Carregando...
        </TreeNode.Loader>

        {renderChildren &&
          childrenNodes?.map((node) => (
            <TreeNode key={node.nodeId} level={level + 1} node={node} />
          ))}
      </div>
    </>
  );
};

TreeNode.Container = TreeNodeContainer;
TreeNode.ToggleButton = TreeNodeToggleButton;
TreeNode.Loader = TreeNodeLoader;
