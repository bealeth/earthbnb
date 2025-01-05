'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaEquals, FaTimesCircle } from "react-icons/fa";
import Button from "../components/Button";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        const filteredAdmins = response.data.filter((user: User) => user.role !== "admin");
        setUsers(filteredAdmins);
        setFilteredUsers(filteredAdmins);
      })
      .catch((error) => console.error("Error al cargar usuarios", error));
  }, []);

  useEffect(() => {
    let filtered = [...users];
    if (filterCategory !== "all") {
      if (filterCategory === "user") {
        filtered = filtered.filter((user) => user.role === "user");
      } else if (filterCategory === "centro de ayuda") {
        filtered = filtered.filter((user) => user.role === "center-help");
      }
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    });
    setFilteredUsers(filtered);
  }, [filterCategory, sortOrder, searchQuery, users]);

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

  const renderStatusIcon = (status: string) => {
    if (status === "Verde" || null) {
      return <FaCheckCircle className="text-green-500" />;
    } else if (status === "Amarillo") {
      return <FaEquals className="text-yellow-500" />;
    } else if (status === "Rojo") {
      return <FaTimesCircle className="text-red-500" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">
        Administración de Usuarios
      </h1>

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

        <div className="flex-1">
          <label className="block text-gray-700">Buscar:</label>
          <input
            type="text"
            placeholder="Buscar por nombre o correo"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-gray-700 font-medium">Nombre</th>
              <th className="py-3 px-6 text-gray-700 font-medium">Correo</th>
              <th className="py-3 px-6 text-gray-700 font-medium text-center">Eliminar</th>
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
