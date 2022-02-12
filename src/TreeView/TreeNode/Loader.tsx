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
      <span>{children}</span>
    </TreeNode.Container>
  );
};
