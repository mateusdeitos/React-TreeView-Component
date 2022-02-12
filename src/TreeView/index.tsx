import { createContext, ReactElement, useContext, useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { TreeNode } from '../TreeView/TreeNode';
import { ITreeLoaderProps } from '../TreeView/TreeNode/Loader';

export interface ITreeNode {
  nodeId: string | number;
  description: string;
  parentNode: ITreeNode | null;
  childrenNodes: ITreeNode[];
}

interface IContext {
  /**
   * Os nós da árvore
   */
  nodes: ITreeNode[];
  /**
   * Os nós que foram selecionados, sempre será um array, independente se a seleção múltipla está ativa
   */
  selected: ITreeNode[];
  /**
   * Seleciona um nó
   */
  select: (node: ITreeNode) => void;
  /**
   * Remove um nó dos nós selecionados
   */
  unselect: (node: ITreeNode) => void;
  /**
   * Remove um nó dos selecionados caso esteja selecionado ou seleciona caso não esteja selecionado
   */
  toggle: (node: ITreeNode) => void;
  /**
   * callback para decidir se um nó pode ou não ser selecionado na árvore
   */
  isSelectable?: (node: ITreeNode, level: number) => boolean;
  /**
   * callback para verificar se um nó está selecionado
   */
  isNodeSelected: (node: ITreeNode) => boolean;
  /**
   * callback para obter os filhos de um nó, caso passado será exibido um loader antes de carregar os filhos
   */
  fetchChildrenNodes?: (node: ITreeNode, level: number) => Promise<ITreeNode[]>;
}

const Context = createContext<IContext>({} as IContext);

export const useTreeView = () => useContext(Context);

interface ITreeViewProviderProps {
  /**
   * Os nós que serão renderizados e estarão disponíveis no Context
   */
  nodes: ITreeNode[];
  /**
   * Callback necessária para definir se um nó pode ser selecionado
   */
  isSelectable?: IContext['isSelectable'];
  /**
   * Callback executada quando um nós entra ou sai dos selecionados
   */
  onSelect: (nodes: ITreeNode[]) => void;
  /**
   * Componente customizado de loading quando existir 'fetchChildrenNodes'
   */
  CustomLoaderComponent?: React.FC<ITreeLoaderProps>;
  /**
   * Permite seleção de mais de um nó
   * default = false
   */
  allowMultiSelect?: boolean;
  /**
   * Renderizar automaticamente os nós dentro do ContextProvider utilizando o componente padrão 'TreeNode'
   * default = false
   */
  renderNodesAutomatically?: boolean;
  /**
   * Callback utilizada para buscar os nós filhos do nó atual
   */
  fetchChildrenNodes?: (node: ITreeNode, level: number) => Promise<ITreeNode[]>;
}

const client = new QueryClient();

export const TreeViewConsumer = Context.Consumer;

export const TreeView: React.FC<ITreeViewProviderProps> = ({
  children,
  nodes,
  isSelectable = (node, level) => true,
  onSelect,
  renderNodesAutomatically = false,
  allowMultiSelect = false,
  CustomLoaderComponent = TreeNode.Loader,
  fetchChildrenNodes,
}) => {
  const [selected, setSelected] = useState<IContext['nodes']>([]);

  const isNodeSelected = (node: ITreeNode) =>
    selected.some((n) => n.nodeId === node.nodeId);

  const unselect = (node: ITreeNode) => {
    const selectedNodes = selected.filter((n) => n.nodeId !== node.nodeId);
    setSelected(selectedNodes);
    onSelect(selectedNodes);
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
    <QueryClientProvider client={client}>
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
        {renderNodesAutomatically &&
          nodes.map((node) => {
            return (
              <TreeNode
                key={node.nodeId}
                node={node}
                level={0}
                Loader={CustomLoaderComponent}
              />
            );
          })}
      </Context.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
