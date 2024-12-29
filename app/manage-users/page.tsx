'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  // Cargar usuarios desde la API
  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => console.error("Error al cargar usuarios", error));
  }, []);

  // Filtrar usuarios por categoría
  useEffect(() => {
    let filtered = [...users];

    if (filterCategory !== "all") {
      if (filterCategory === "guest/host") {
        filtered = filtered.filter((user) =>
          user.role === "guest" || user.role === "host"
        );
      } else if (filterCategory === "centro de ayuda") {
        filtered = filtered.filter((user) => user.role === "support");
      } else if (filterCategory === "administradores") {
        filtered = filtered.filter((user) => user.role === "admin");
      }
    }

    // Ordenar usuarios por email
    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    });

    setFilteredUsers(filtered);
  }, [filterCategory, sortOrder, users]);

  // Eliminar usuario
  const deleteUser = (id: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmDelete) {
      axios
        .delete("/api/users", { data: { id } })
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch((error) => console.error("Error al eliminar usuario", error));
    }
  };

  // Amonestar usuario
  const handleAmonestation = (id: string) => {
    axios
      .patch("/api/users", { id })
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, role: "warned" } : user
          )
        );
        alert("Se registró la amonestación para este usuario.");
      })
      .catch((error) => console.error("Error al amonestar usuario", error));
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl text-blue font-bold mb-4">
        Administración de Usuarios
      </h1>

      {/* Controles de filtrado y orden */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <label className="block text-gray-700">Categoría:</label>
          <select
            className="border rounded-lg px-4 py-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="user">Guest/Host</option>
            <option value="centro de ayuda">Centro de Ayuda</option>
            <option value="administradores">Administradores</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Ordenar por email:</label>
          <select
            className="border rounded-lg px-4 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-gray-700 font-medium">Nombre</th>
              <th className="py-3 px-6 text-gray-700 font-medium">Correo</th>
              <th className="py-3 px-6 text-gray-700 font-medium text-center">
                Acciones disponibles
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b">{user.name}</td>
                <td className="py-3 px-6 border-b">{user.email}</td>
                <td className="py-3 px-6 border-b text-center">
                <Button
                    label="Eliminar usuario"
                    onClick={() => deleteUser(user.id)}
                    outline
                    small
                />
                <div className="mt-2">
                    {user.role === "warned" ? (
                    <span className="text-red-500 font-semibold">Amonestado</span>
                    ) : (
                    <Button
                        label="Amonestar"
                        onClick={() => handleAmonestation(user.id)}
                        outline
                        small
                    />
                    )}
                </div>
                </td>

              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
