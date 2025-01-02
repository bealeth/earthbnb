'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './Posts';
import { SafePost } from '../types'; // SafePost ya corresponde con los datos que devuelve la API

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [posts, setPosts] = useState<SafePost[]>([]); // Cambiado a `SafePost[]`
  const [filteredPosts, setFilteredPosts] = useState<SafePost[]>([]);

  // Obtener datos iniciales desde el servidor
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<SafePost[]>('/api/posts'); // Esperamos SafePost[]
        setPosts(response.data);
        setFilteredPosts(response.data); // Mostrar todas las publicaciones al inicio
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };

    fetchPosts();
  }, []);

  // Filtrar publicaciones
  const handleSearchAndFilter = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filtered = posts.filter((post) => {
      const matchesSearchQuery =
        post.title.toLowerCase().includes(lowerCaseQuery);
      const matchesCategory = categoryFilter
        ? post.category === categoryFilter
        : true;

      return matchesSearchQuery && matchesCategory;
    });

    setFilteredPosts(filtered);
  };

  // Disparar búsqueda cada vez que cambien los criterios
  useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, categoryFilter]);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Encabezado */}
      <header className="bg-blue text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Centro de Ayuda</h1>
          <p className="mt-2 text-lg text-white">
            Encuentra respuestas a las preguntas más frecuentes, ¡tenemos respuesta a cada una de tus preguntas!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {/* Buscador */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-blue">
              ¿En qué podemos ayudarte?
            </h2>
            <p className="text-lg text-gray2 mt-2">
              Escribe tu consulta en la barra de búsqueda para encontrar respuestas rápidamente.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <input
              type="text"
              placeholder="Buscar publicaciones..."
              className="w-full max-w-lg p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="host">Anfitrión</option>
              <option value="guest">Huésped</option>
              <option value="Anuncio">Anuncio</option>
            </select>
            <button
              className="ml-4 bg-blue text-white px-6 py-3 rounded-md hover:bg-blue-dark focus:ring-2 focus:ring-blue-dark"
              onClick={handleSearchAndFilter}
            >
              Buscar
            </button>
          </div>
        </section>

        {/* Listado de publicaciones */}
        <Posts posts={filteredPosts} />
      </main>
    </div>
  );
};

export default HelpCenterPage;
