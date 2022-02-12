import './App.css';
import { ITreeNodeProps, TreeNode } from './TreeView/TreeNode';
import { TreeSemFetch } from './TreeSemFetch';
import { TreeComFetch } from './TreeComFetch';
import { TreeCustomComponent } from './TreeCustomComponent';

function App() {
  return (
    <div className="App">
      <div className="spacer"></div>
      <h3>Tree sem fetching de filhos</h3>
      <TreeSemFetch />
      <hr />
      <div className="spacer"></div>
      <h3>Tree com fetching de filhos</h3>
      <TreeComFetch />
      <hr />
      <div className="spacer"></div>
      <h3>Tree com componente customizado</h3>
      <TreeCustomComponent />
      <hr />
    </div>
  );
}

export default App;
