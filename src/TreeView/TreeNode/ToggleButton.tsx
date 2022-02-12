import { HTMLProps } from 'react';
import { ITreeNodeProps } from '../../TreeView/TreeNode';

interface ITreeNodeToggleButtonProps extends ITreeNodeProps {
  toggle: () => void;
  isVisible: boolean;
}

export const TreeNodeToggleButton: React.FC<
  ITreeNodeToggleButtonProps & { htmlProps?: HTMLProps<HTMLButtonElement> }
> = ({ isVisible, children, toggle, htmlProps = {} }) => {
  const { className = '', style = {}, onClick, ...rest } = htmlProps;

  return (
    <button
      {...rest}
      type="button"
      style={{
        ...style,
        visibility: isVisible ? 'initial' : 'hidden',
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
