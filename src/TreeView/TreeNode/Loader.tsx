import { ITreeNodeProps, TreeNode } from '../../TreeView/TreeNode';

export interface ITreeLoaderProps extends ITreeNodeProps {}

export const TreeNodeLoader: React.FC<ITreeLoaderProps> = ({
  children,
  ...props
}) => {
  return (
    <TreeNode.Container {...props}>
      <span>{children}</span>
    </TreeNode.Container>
  );
};
