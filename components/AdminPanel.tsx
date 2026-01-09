
import React, { useState } from 'react';
import { Block3D, Category, User } from '../types';

interface AdminPanelProps {
  blocks: Block3D[];
  categories: Category[];
  users: User[];
  onAddBlock: (block: Omit<Block3D, 'id'>) => void;
  onDeleteBlock: (id: string) => void;
  onDeleteUser: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  blocks, 
  categories, 
  users,
  onAddBlock, 
  onDeleteBlock,
  onDeleteUser
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'users'>('content');
  const [newBlockName, setNewBlockName] = useState('');
  const [newBlockCat, setNewBlockCat] = useState('');
  const [newBlockDesc, setNewBlockDesc] = useState('');

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlockName && newBlockCat) {
      onAddBlock({
        name: newBlockName,
        categoryId: newBlockCat,
        description: newBlockDesc,
        imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&q=80&w=800`,
        downloadUrl: '#'
      });
      setNewBlockName('');
      setNewBlockDesc('');
      setNewBlockCat('');
      alert('Bloco cadastrado com sucesso!');
    }
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Painel de Controle</h2>
          <p className="text-slate-500 font-medium mt-1">Gerencie a plataforma e os membros ativos.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          <button 
            onClick={() => setActiveTab('content')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'content' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Conteúdo 3D
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'users' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Usuários
          </button>
        </div>
      </div>

      {activeTab === 'content' ? (
        <div className="space-y-10">
          <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Novo Ativo Premium</h3>
            
            <form onSubmit={handleAddBlock} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Nome do Modelo</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium"
                    placeholder="Ex: Poltrona Minimalista 2024"
                    value={newBlockName}
                    onChange={(e) => setNewBlockName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Ambiente (Categoria)</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium"
                    value={newBlockCat}
                    onChange={(e) => setNewBlockCat(e.target.value)}
                    required
                  >
                    <option value="">Selecione o ambiente...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Descrição Detalhada</label>
                  <textarea 
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 h-[142px] resize-none font-medium leading-relaxed"
                    placeholder="Especifique materiais, fidelidade e formatos inclusos..."
                    value={newBlockDesc}
                    onChange={(e) => setNewBlockDesc(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-100 flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Publicar Modelo 3D</span>
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
            <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-slate-900 text-lg">Catálogo Atual</h3>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{blocks.length} Itens</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Produto</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ambiente</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {blocks.map(block => (
                    <tr key={block.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center space-x-6">
                          <div className="h-16 w-20 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                            <img src={block.imageUrl} className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900">{block.name}</span>
                            <span className="text-xs text-slate-400 font-medium mt-1 truncate max-w-[200px]">{block.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl">
                          {categories.find(c => c.id === block.categoryId)?.name}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button 
                          onClick={() => {
                            if(confirm('Tem certeza que deseja remover este modelo permanentemente do catálogo premium?')) {
                              onDeleteBlock(block.id);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm animate-in fade-in duration-500">
          <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-black text-slate-900 text-lg">Usuários Registrados</h3>
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{users.length} Membros</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome / E-mail</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status da Conta</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações de Gestão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{user.name}</span>
                        <span className="text-xs text-slate-400 font-medium">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${
                        user.role === 'admin' 
                        ? 'bg-amber-50 text-amber-600 border-amber-100' 
                        : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {user.role === 'admin' ? 'Administrador' : 'Assinante Premium'}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button 
                        onClick={() => {
                          if(confirm(`Tem certeza que deseja revogar o acesso de ${user.name}?`)) {
                            onDeleteUser(user.id);
                          }
                        }}
                        className="text-slate-400 hover:text-red-600 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
                      >
                        Banir Usuário
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
