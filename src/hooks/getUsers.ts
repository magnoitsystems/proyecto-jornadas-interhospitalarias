import { useState } from "react";

export interface UserData {
  name: string;
  lastname: string;
  email: string;
  password?: string; // si viene del server o quieres generarla aleatoria
  job: string;
  specialty: string;
  age: number;
  gender: string;
}

export default function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const createUser = async (userData: UserData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear usuario");
      }

      setSuccessMessage(data.message);
      return data.user;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, successMessage };
}
