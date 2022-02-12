import { ITreeNode } from './TreeView';

const getId = () => Date.now() + Math.ceil(Math.random() * 10000);
const getRandomName = () => {
  const words = [
    'Et',
    'nobis',
    'aspernatur',
    'eum',
    'rerum',
    'internos',
    'et',
    'vitae',
    'quae',
    'aut',
    'porro',
    'inventore',
    'Et',
    'vero',
    'ratione',
    'quo',
    'reprehenderit',
    'magnam',
    'quo',
    'voluptatem',
    'labore',
    'et',
    'architecto',
    'laborum',
    'ea',
    'placeat',
    'modi',
    'et',
    'asperiores',
    'laborum',
    'aspernatur',
    'quos',
    'Et',
    'culpa',
    'magni',
    'et',
    'nihil',
    'consectetur',
    'est',
    'asperiores',
    'quaerat',
    'non',
    'illo',
    'natus',
    'Sit',
    'quia',
    'consequuntur',
    'non',
    'nemo',
    'maxime',
    'in',
    'dolor',
    'iure',
    'et',
    'magnam',
    'accusantium',
    'sed',
    'minima',
    'fugiat',
    'ut',
    'vero',
    'Quis',
    'sit',
    'molestiae',
    'repudiandae',
  ];

  const word1 = words[Math.floor(Math.random() * words.length - 1)];
  const word2 = words[Math.floor(Math.random() * words.length - 1)];

  return `${word1}-${word2}`;
};

export const getCategories = (
  parentNode: ITreeNode | null = null,
  fetchChildren = true
): ITreeNode[] => {
  const length = Math.ceil(Math.random() * 5);
  return Array.from({ length }, () => {
    const node = {
      nodeId: getId(),
      description: getRandomName(),
      parentNode,
      childrenNodes: [],
    };

    return {
      ...node,
      childrenNodes: fetchChildren ? [] : getCategories(node, fetchChildren),
    };
  });
};
export const categorias = getCategories();
