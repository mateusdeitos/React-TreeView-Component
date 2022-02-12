import { CSSProperties, HTMLProps, PropsWithChildren } from 'react';
import { useTreeView } from '../../TreeView';
import { ITreeNodeProps, TreeNode } from '../../TreeView/TreeNode';

export const TreeNodeContainer = ({
  children,
  node,
  htmlProps = {},
  ...props
}: PropsWithChildren<
  ITreeNodeProps & { htmlProps?: HTMLProps<HTMLDivElement> }
>) => {
  const { level = 0 } = props;
  const { toggle, isSelectable, isNodeSelected } = useTreeView();
  const isSelected = isNodeSelected(node);
  const { className = '', style = {}, ...rest } = htmlProps;

  const handleSelect = () => {
    if (!isSelectable(node, level)) {
      return;
    }

    toggle(node);
  };

  return (
    <div
      {...rest}
      className={`tree-node-container ${
        isSelected ? 'active' : ''
      } ${className}`}
      style={{ ...style, marginLeft: 20 * (level + 1) }}
      onClick={handleSelect}
    >
      {children}
    </div>
  );
};
