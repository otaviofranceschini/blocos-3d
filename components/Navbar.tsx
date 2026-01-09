
import React from 'react';
import { User, Category } from '../types';

interface NavbarProps {
  user: User;
  categories: Category[];
  onLogout: () => void;
  onSelectCategory: (id: string | null) => void;
  setView: (view: 'dashboard' | 'admin') => void;
  currentView: 'dashboard' | 'admin' | 'details';
  currentCategory: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  categories, 
  onLogout, 
  onSelectCategory, 
  setView, 
  currentView,
  currentCategory 
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-12">
            <span 
              className="text-2xl font-black text-indigo-600 cursor-pointer tracking-tighter" 
              onClick={() => {
                onSelectCategory(null);
                setView('dashboard');
              }}
            >
              BLOCOSTUDIO
            </span>
            
            {/* Menu de Categorias Principal */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button 
                onClick={() => onSelectCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  currentCategory === null && currentView === 'dashboard' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Início
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    currentCategory === cat.id 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-slate-900">{user.name}</span>
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none">
                Membro {user.role === 'admin' ? 'Premium Admin' : 'Premium'}
              </span>
            </div>
            
            <div className="flex items-center border-l border-slate-200 pl-4 space-x-2">
              {user.role === 'admin' && (
                <button 
                  onClick={() => setView('admin')}
                  title="Painel Administrativo"
                  className={`p-2.5 rounded-xl transition-all ${
                    currentView === 'admin' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
              
              <button 
                onClick={onLogout}
                className="p-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                title="Sair da Conta"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Submenu for Categories */}
      <div className="lg:hidden bg-slate-50 border-t border-slate-200 overflow-x-auto">
        <div className="flex px-4 py-3 space-x-2 scrollbar-hide">
          <button 
            onClick={() => onSelectCategory(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
              currentCategory === null ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Tudo
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                currentCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
