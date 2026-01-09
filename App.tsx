
import React, { useState } from 'react';
import { User, Category, Block3D, AppView } from './types';
import { INITIAL_CATEGORIES, INITIAL_BLOCKS } from './constants';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import BlockDetails from './components/BlockDetails';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [blocks, setBlocks] = useState<Block3D[]>(INITIAL_BLOCKS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [view, setView] = useState<AppView>('dashboard');
  const [selectedBlock, setSelectedBlock] = useState<Block3D | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  
  // Lista de usuários simulada para o painel admin
  const [systemUsers, setSystemUsers] = useState<User[]>([
    { id: 'admin1', name: 'Administrador Master', email: 'admin@blocostudio.com', role: 'admin' },
    { id: 'user1', name: 'João Silva', email: 'joao@exemplo.com', role: 'user' },
    { id: 'user2', name: 'Maria Santos', email: 'maria@exemplo.com', role: 'user' }
  ]);

  const handleLogin = (email: string) => {
    const existingUser = systemUsers.find(u => u.email === email);
    if (existingUser) {
      setUser(existingUser);
    } else if (email.startsWith('admin')) {
      const newUser: User = { id: Date.now().toString(), name: 'Novo Admin', email, role: 'admin' };
      setSystemUsers(prev => [...prev, newUser]);
      setUser(newUser);
    } else {
      const newUser: User = { id: Date.now().toString(), name: 'Membro Premium', email, role: 'user' };
      setSystemUsers(prev => [...prev, newUser]);
      setUser(newUser);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('dashboard');
    setSelectedBlock(null);
    setCurrentCategory(null);
  };

  const navigateToDetails = (block: Block3D) => {
    setSelectedBlock(block);
    setView('details');
  };

  const handleAddBlock = (block: Omit<Block3D, 'id'>) => {
    const newBlock = { ...block, id: Math.random().toString(36).substr(2, 9) };
    setBlocks(prev => [...prev, newBlock]);
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleDeleteUser = (id: string) => {
    if (id === user?.id) return alert("Você não pode excluir a si mesmo!");
    setSystemUsers(prev => prev.filter(u => u.id !== id));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <AuthForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        user={user} 
        categories={categories}
        onLogout={handleLogout} 
        onSelectCategory={(id) => {
          setCurrentCategory(id);
          setView('dashboard');
          setSelectedBlock(null);
        }}
        setView={(v) => {
          setView(v);
          setSelectedBlock(null);
        }} 
        currentView={view} 
        currentCategory={currentCategory}
      />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {view === 'dashboard' && (
          <Dashboard 
            blocks={blocks} 
            categories={categories} 
            currentCategory={currentCategory}
            onSelectBlock={navigateToDetails}
            onSetCategory={setCurrentCategory}
          />
        )}
        
        {view === 'details' && selectedBlock && (
          <BlockDetails 
            block={selectedBlock} 
            categories={categories}
            onBack={() => setView('dashboard')}
          />
        )}

        {view === 'admin' && user.role === 'admin' && (
          <AdminPanel 
            blocks={blocks} 
            categories={categories} 
            users={systemUsers}
            onAddBlock={handleAddBlock}
            onDeleteBlock={handleDeleteBlock}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-bold text-indigo-600 mb-4">BlocoStudio</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sua fonte definitiva de ativos 3D de alta qualidade para arquitetura e design de interiores.
            </p>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">Links Úteis</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li><button onClick={() => setView('dashboard')} className="hover:text-indigo-600">Biblioteca</button></li>
              <li><a href="#" className="hover:text-indigo-600">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-indigo-600">Suporte</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">Copyright</h4>
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} BlocoStudio Premium. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
