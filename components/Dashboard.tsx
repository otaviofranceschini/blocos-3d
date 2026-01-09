
import React, { useState, useEffect } from 'react';
import { Block3D, Category } from '../types';

interface DashboardProps {
  blocks: Block3D[];
  categories: Category[];
  currentCategory: string | null;
  onSelectBlock: (block: Block3D) => void;
  onSetCategory: (id: string | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  blocks, 
  categories, 
  currentCategory, 
  onSelectBlock, 
  onSetCategory 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlocks = blocks.filter(block => {
    const matchesCategory = currentCategory ? block.categoryId === currentCategory : true;
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || 'Sem categoria';
  };

  const categoryTitle = currentCategory 
    ? categories.find(c => c.id === currentCategory)?.name 
    : 'Biblioteca Completa';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Seção de Título */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav className="flex mb-3 text-xs font-bold text-slate-400 uppercase tracking-widest space-x-2">
            <button onClick={() => onSetCategory(null)} className="hover:text-indigo-600">Premium</button>
            <span>/</span>
            <span className="text-indigo-500">{categoryTitle}</span>
          </nav>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            {categoryTitle}
          </h2>
          <p className="text-slate-500 text-lg mt-3 max-w-xl">
            {currentCategory 
              ? `Modelos 3D exclusivos para transformar sua ${categoryTitle?.toLowerCase()}.` 
              : 'Navegue pela coleção premium de ativos 3D selecionados para profissionais.'}
          </p>
        </div>
        
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Pesquisar modelo..."
            className="pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-80 bg-white shadow-sm transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="h-px bg-slate-200 w-full"></div>

      {/* Grid de Blocos */}
      {filteredBlocks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBlocks.map(block => (
            <div 
              key={block.id} 
              onClick={() => onSelectBlock(block)}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col h-full transform hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={block.imageUrl} 
                  alt={block.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                   <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 w-full border border-white/30 text-center">
                      <span className="text-white text-xs font-bold uppercase tracking-widest">Ver Detalhes Premium</span>
                   </div>
                </div>
                <div className="absolute top-5 left-5">
                  <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm border border-slate-100">
                    {getCategoryName(block.categoryId)}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-xl leading-tight group-hover:text-indigo-600 transition-colors">
                    {block.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-3 line-clamp-2 font-medium leading-relaxed">
                    {block.description}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center space-x-2 text-indigo-600 text-xs font-black uppercase tracking-widest">
                      <span>Explorar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                   </div>
                   <div className="text-[10px] font-bold text-slate-400">ID: #{block.id.toUpperCase()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] py-32 border-2 border-dashed border-slate-200 text-center flex flex-col items-center">
          <div className="bg-indigo-50 p-6 rounded-3xl mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h4 className="text-xl font-black text-slate-900">Nenhum modelo encontrado</h4>
          <p className="text-slate-500 font-medium mt-2 max-w-xs">Tente ajustar sua pesquisa ou explore outras categorias premium.</p>
          <button 
            onClick={() => {setSearchTerm(''); onSetCategory(null);}}
            className="mt-8 text-indigo-600 font-bold text-sm underline underline-offset-4"
          >
            Limpar Filtros e Ver Tudo
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
