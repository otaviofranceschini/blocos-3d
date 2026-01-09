
import { Category, Block3D } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'sala', name: 'Sala' },
  { id: 'cozinha', name: 'Cozinha' },
  { id: 'banheiro', name: 'Banheiro' },
  { id: 'externa', name: 'Área Externa' },
  { id: 'quartos', name: 'Quartos' },
  { id: 'escritorio', name: 'Escritório' }
];

export const INITIAL_BLOCKS: Block3D[] = [
  {
    id: 'b1',
    name: 'Sofá Curvo Contemporâneo',
    categoryId: 'sala',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    downloadUrl: '#',
    description: 'Um sofá elegante com linhas orgânicas, ideal para salas de estar modernas de alto padrão. Texturas em bouclé cinza claro inclusas.'
  },
  {
    id: 'b2',
    name: 'Ilha de Cozinha em Mármore',
    categoryId: 'cozinha',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    downloadUrl: '#',
    description: 'Bancada gourmet completa com acabamento em mármore Carrara e detalhes em madeira freijó. Inclui fogão cooktop embutido.'
  },
  {
    id: 'b3',
    name: 'Conjunto Lounge Externo',
    categoryId: 'externa',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    downloadUrl: '#',
    description: 'Poltronas e mesa de centro para varandas e áreas de piscina. Resistente a intempéries com proteção UV nas texturas.'
  },
  {
    id: 'b4',
    name: 'Cama King Estofada',
    categoryId: 'quartos',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800',
    downloadUrl: '#',
    description: 'Estrutura robusta com cabeceira capitonê em linho cru. Design atemporal para projetos de dormitórios master.'
  },
  {
    id: 'b5',
    name: 'Mesa de Escritório Industrial',
    categoryId: 'escritorio',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800',
    downloadUrl: '#',
    description: 'Mesa com cavaletes metálicos e tampo de madeira maciça escura. Perfeita para home offices contemporâneos.'
  }
];
