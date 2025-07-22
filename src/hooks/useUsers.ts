import { useState } from "react";

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  job: string;
  specialty?: string | null;
  admin: boolean;
  age: number;
  gender: string;
  // works?: Work[]; // si querés agregar
}

export interface UserData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  job: string;
  specialty?: string | null;
  age: number;
  gender: string;
  admin: boolean;
}

export default function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // POST - Crear usuario
  const createUser = async (userData: UserData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al crear usuario");

      setSuccessMessage(data.message);
      return data.user;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // GET - Obtener todos los usuarios
  const getAllUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/usuario", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Error al obtener usuarios");

      const data = await response.json();
      setUsers(data.users || []);
      return data.users || [];
    } catch (err: any) {
      setError(err.message);
      setUsers([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    getAllUsers,
    users,
    loading,
    error,
    successMessage,
  };
}
