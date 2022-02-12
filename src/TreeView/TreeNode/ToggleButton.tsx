import { HTMLProps } from 'react';
import { ITreeNodeProps } from '../../TreeView/TreeNode';

interface ITreeNodeToggleButtonProps extends ITreeNodeProps {
  toggle: () => void;
}

export const TreeNodeToggleButton: React.FC<
  ITreeNodeToggleButtonProps & { htmlProps?: HTMLProps<HTMLButtonElement> }
> = ({ node: { childrenNodes }, children, toggle, htmlProps = {} }) => {
  const { className = '', style = {}, onClick, ...rest } = htmlProps;

  return (
    <button
      {...rest}
      type="button"
      style={{
        ...style,
        visibility: childrenNodes.length > 0 ? 'initial' : 'hidden',
      }}
      className={`toggle ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        !!onClick ? onClick(e) : toggle();
      }}
    >
      {children}
    </button>
  );
};
