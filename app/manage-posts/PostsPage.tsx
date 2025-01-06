'use client';

import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import ImageUpload from "../components/inputs/ImageUpload";
import Button from "../components/Button";

interface Post {
  id: string; // Ajustado para reflejar el campo devuelto por la API
  title: string;
  detail: string;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  authorId: string; // Cambiado: directamente ID del autor
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({
    title: "",
    detail: "",
    category: "",
    image: "",
  });
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleError = (error: unknown, customMessage: string) => {
    console.error(customMessage, error);
    alert(customMessage);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts"); // Ruta de la API
      if (!response.ok) {
        throw new Error("Error al cargar las publicaciones.");
      }
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      handleError(error, "No se pudieron cargar las publicaciones.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredAndSortedPosts = posts
    .filter((post) => (filter ? post.category === filter : true))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, detail, category, image } = form;
    if (!title || !detail || !category || !image) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setIsSubmitting(true);

    try {
      const method = editingPost ? "PUT" : "POST";
      const url = editingPost ? `/api/posts/${editingPost.id}` : "/api/posts";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, detail, category, image }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al procesar la solicitud.");
      }

      await fetchPosts();
      setForm({ title: "", detail: "", category: "", image: "" });
      setIsFormVisible(false);
      setEditingPost(null);
    } catch (error) {
      handleError(error, "Error enviando la publicación.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta publicación?")) return;

    try {
      const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error al eliminar la publicación.");
      }
      await fetchPosts();
    } catch (error) {
      handleError(error, "No tienes permiso para eliminar la publicación.");
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      detail: post.detail,
      category: post.category,
      image: post.image,
    });
    setIsFormVisible(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Publicaciones para el Centro de Ayuda</h1>

      <div className="mb-6 flex gap-4 items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">Todas las categorías</option>
          <option value="host">Anfitrión</option>
          <option value="guest">Huésped</option>
          <option value="Anuncio">Anuncio</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-4 py-2"
        >
          <option value="asc">Ordenar por título (A-Z)</option>
          <option value="desc">Ordenar por título (Z-A)</option>
        </select>

        {!isFormVisible && (
          <Button label="Crear Publicación" onClick={() => setIsFormVisible(true)} />
        )}
      </div>

      {isFormVisible && (
        <div className="relative border p-6 rounded shadow-md bg-white">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={() => {
              setIsFormVisible(false);
              setEditingPost(null);
            }}
          >
            <RxCross1 size={24} />
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingPost ? "Editar Publicación" : "Crear Nueva Publicación"}
            </h2>
            {/* Contenido del formulario */}
            <div>
              <label className="block mb-1 font-medium">Título</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border rounded px-4 py-2 w-full"
                placeholder="Ingresa un título llamativo"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Descripción</label>
              <textarea
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
                className="border rounded px-4 py-2 w-full"
                placeholder="Dale cuerpo a la publicación"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Categoría</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border rounded px-4 py-2 w-full"
              >
                <option value="" disabled>
                  Seleccionar categoría
                </option>
                <option value="Anfitrion">Anfitrión</option>
                <option value="Huesped">Huésped</option>
                <option value="Anuncio">Anuncio</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Imagen</label>
              <ImageUpload
                value={form.image}
                onChange={(value) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    image: value,
                  }))
                }
              />
            </div>

            <Button
              label={isSubmitting ? "Guardando..." : "Guardar Publicación"}
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredAndSortedPosts.map((post) => (
          <div key={post.id} className="border rounded shadow-sm p-4 bg-white">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.detail}</p>
            <p className="text-sm text-gray-500">Categoría: {post.category}</p>
            <div className="flex gap-2 mt-2">
              <Button label="Editar" onClick={() => handleEdit(post)} />
              <Button label="Eliminar" onClick={() => handleDelete(post.id)} outline />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
