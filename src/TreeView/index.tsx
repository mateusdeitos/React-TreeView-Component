import { createContext, ReactElement, useContext, useState } from 'react';
import { ITreeNodeProps, TreeNode } from '../TreeView/TreeNode';

export interface ITreeNode {
  nodeId: string | number;
  description: string;
  parentNode: ITreeNode | null;
  childrenNodes: ITreeNode[];
}

interface IContext {
  nodes: ITreeNode[];
  selected: ITreeNode[];
  select: (node: ITreeNode) => void;
  unselect: (node: ITreeNode) => void;
  toggle: (node: ITreeNode) => void;
  isSelectable: (node: ITreeNode, level: number) => boolean;
  isNodeSelected: (node: ITreeNode) => boolean;
  fetchChildrenNodes: (node: ITreeNode, level: number) => Promise<ITreeNode[]>;
}

const Context = createContext<IContext>({} as IContext);

export const useTreeView = () => useContext(Context);

interface ITreeViewProviderProps {
  nodes: ITreeNode[];
  isSelectable: IContext['isSelectable'];
  onSelect: (nodes: ITreeNode[]) => void;
  CustomTreeNodeComponent?: React.FC<ITreeNodeProps>;
  allowMultiSelect?: boolean;
  fetchChildrenNodes?: (node: ITreeNode, level: number) => Promise<ITreeNode[]>;
}

export const TreeView: React.FC<ITreeViewProviderProps> = ({
  children,
  nodes,
  isSelectable,
  onSelect,
  allowMultiSelect = false,
  CustomTreeNodeComponent = TreeNode,
  fetchChildrenNodes = (node: ITreeNode) => Promise.resolve(node.childrenNodes),
}) => {
  const [selected, setSelected] = useState<IContext['nodes']>([]);

  const isNodeSelected = (node: ITreeNode) =>
    selected.some((n) => n.nodeId === node.nodeId);

  const unselect = (node: ITreeNode) => {
    setSelected((nodesSelected) =>
      nodesSelected.filter((n) => n.nodeId !== node.nodeId)
    );
  };

  const select = (node: ITreeNode) => {
    const selectedNodes = allowMultiSelect ? [...selected, node] : [node];
    setSelected(selectedNodes);
    onSelect(selectedNodes);
  };

  const toggle = (node: ITreeNode) => {
    if (isNodeSelected(node)) {
      unselect(node);
    } else {
      select(node);
    }
  };

  return (
    <Context.Provider
      value={{
        isSelectable,
        nodes,
        selected,
        select,
        isNodeSelected,
        toggle,
        unselect,
        fetchChildrenNodes,
      }}
    >
      {children}
      {nodes.map((node) => {
        return (
          <CustomTreeNodeComponent key={node.nodeId} level={0} node={node} />
        );
      })}
    </Context.Provider>
  );
};
