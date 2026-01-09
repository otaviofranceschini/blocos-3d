
export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Category {
  id: string;
  name: string;
}

export interface Block3D {
  id: string;
  name: string;
  categoryId: string;
  imageUrl: string;
  downloadUrl: string;
  description: string;
}

export type AuthMode = 'login' | 'register';
export type AppView = 'dashboard' | 'admin' | 'details';
