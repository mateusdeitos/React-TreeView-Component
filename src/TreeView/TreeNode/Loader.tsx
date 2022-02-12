import { ITreeNodeProps, TreeNode } from '../../TreeView/TreeNode';

export const TreeNodeLoader: React.FC<ITreeNodeProps & { show: boolean }> = ({
  children,
  show,
  ...props
}) => {
  if (!show) {
    return null;
  }
  return (
    <TreeNode.Container {...props}>
      <p>{children}</p>
    </TreeNode.Container>
  );
};
