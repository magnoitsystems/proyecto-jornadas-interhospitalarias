import { useState } from "react";
import { UserView as User } from "@/types/user";

export interface UserData {
  name: string;
  lastname: string;
  email: string;
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
  const [loading, setLoading] = useState(false); // Cambiado de true a false
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // POST - Crear usuario
  const createUser = async (userData: UserData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Construir URL completa
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    const fullUrl = `${baseUrl}/api/usuario`;

    console.log('🚀 Enviando datos del usuario:', userData);
    console.log('🔗 URL completa:', fullUrl);

    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
      });

      console.log('📡 Respuesta del servidor:', response.status, response.statusText);

      const data = await response.json();
      console.log('📊 Datos de respuesta:', data);

      if (!response.ok) {
        console.error('❌ Error en la respuesta:', data);
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      setSuccessMessage(data.message);
      return data.user;

    } catch (err) {
      console.error('💥 Error en createUser:', err);

      if (err instanceof Error) {
        setError(err.message);
        console.error('💥 Error message:', err.message);
      } else {
        setError("Error desconocido");
        console.error('💥 Error desconocido:', err);
      }
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
      const genderArray = Array.isArray(filters.gender) ? filters.gender : filters.gender ? [filters.gender] : [];
      const jobArray = Array.isArray(filters.job) ? filters.job : filters.job ? [filters.job] : [];

      genderArray.forEach(g => params.append("gender", g));
      jobArray.forEach(j => params.append("job", j));

      const query = params.toString();
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
          (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

      const url = query ? `${baseUrl}/api/usuario?${query}` : `${baseUrl}/api/usuario`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) throw new Error("Error al obtener usuarios");

      const data = await response.json();
      setUsers(data.responseUser || []);
      return data.responseUser || [];

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
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