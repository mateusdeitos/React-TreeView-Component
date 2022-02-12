import { ITreeNodeProps, TreeNode } from '../../TreeView/TreeNode';

export interface ITreeLoaderProps extends ITreeNodeProps {
  show: boolean;
}

export const TreeNodeLoader: React.FC<ITreeLoaderProps> = ({
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
