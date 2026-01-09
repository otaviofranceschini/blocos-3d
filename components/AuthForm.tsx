
import React, { useState } from 'react';
import { AuthMode } from '../types';

interface AuthFormProps {
  onLogin: (email: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">BlocoStudio</h1>
        <p className="text-slate-500 mt-2">
          {mode === 'login' ? 'Acesse sua área exclusiva' : 'Crie sua conta premium'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="Ex: João Silva"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="email@exemplo.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-indigo-200"
        >
          {mode === 'login' ? 'Entrar' : 'Cadastrar agora'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          {mode === 'login' ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre aqui'}
        </button>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-xs text-slate-400 text-center">
          Dica: Use um e-mail começando com "admin" para acessar o painel administrativo.
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
