'use client';

import React, { useState } from 'react';
import { SafeUser } from '@/app/types'; // Asegúrate de tener este tipo definido para el usuario
import PostsPage from '../manage-posts/PostsPage';
import UsersPage from '../manage-users/UsersPage';

interface TabsViewProps {
  currentUser?: SafeUser | null; // Información del usuario actual
}

const TabsView: React.FC<TabsViewProps> = ({ currentUser }) => {
  // Estado para manejar la pestaña activa
  const [activeTab, setActiveTab] = useState<'users' | 'posts'>('users');

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      {/* Mensaje de bienvenida */}
      <header className="bg-blue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">{currentUser ? `Bienvenido, 
          ${currentUser.name}` : 'Bienvenido, invitado'}</h1>
        </div>
      </header>
      <div className="text-center mb-6 text-xl font-semibold text-blue"/>

      {/* Contenedor de pestañas */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center text-lg font-semibold ${
            activeTab === 'users' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('users')}
        >
          Usuarios
        </button>
        <button
          className={`flex-1 py-3 text-center text-lg font-semibold ${
            activeTab === 'posts' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          Publicaciones
        </button>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="p-6 bg-white shadow-md rounded-md mt-4">
        {activeTab === 'users' && (
          <UsersPage/>
        )}
        {activeTab === 'posts' && (
          <PostsPage/>
        )}
      </div>
    </div>
  );
};

export default TabsView;
