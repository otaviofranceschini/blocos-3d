
import React from 'react';
import { Block3D, Category } from '../types';

interface BlockDetailsProps {
  block: Block3D;
  categories: Category[];
  onBack: () => void;
}

const BlockDetails: React.FC<BlockDetailsProps> = ({ block, categories, onBack }) => {
  const categoryName = categories.find(c => c.id === block.categoryId)?.name || 'Sem categoria';

  const handleDownload = () => {
    alert(`Preparando download premium de: ${block.name}\nO arquivo .OBJ / .MAX será enviado para o seu navegador.`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-600 hover:text-indigo-600 font-medium transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para a Biblioteca
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-square lg:aspect-auto h-full">
          <img 
            src={block.imageUrl} 
            alt={block.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-2">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {categoryName}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{block.name}</h1>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Descrição do Modelo</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {block.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button 
                onClick={handleDownload}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center space-x-3 transform hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download do Arquivo 3D</span>
              </button>
              <p className="text-center text-xs text-slate-400 mt-4 italic">
                Acesso exclusivo para membros. Uso comercial permitido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
