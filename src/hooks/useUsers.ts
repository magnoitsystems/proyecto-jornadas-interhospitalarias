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

export interface UserFilters {
  gender?: string[];
  job?: string[];
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

  // GET - Obtener todos los usuarios o por filtros
  const getUsers = async (filters: UserFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      const genderArray = Array.isArray(filters.gender)
        ? filters.gender
        : filters.gender
          ? [filters.gender]
          : [];

      const jobArray = Array.isArray(filters.job)
        ? filters.job
        : filters.job
          ? [filters.job]
          : [];

      genderArray.forEach(g => params.append("gender", g));
      jobArray.forEach(j => params.append("job", j));


      const query = params.toString();
      const url = query ? `/api/usuario?${query}` : `/api/usuario`;

      const response = await fetch(url, {
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
    getUsers,
    users,
    loading,
    error,
    successMessage,
  };
}
