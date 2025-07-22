import { useState } from 'react';

interface AutorInput {
  nombre: string;
  afiliacion: string;
}

interface UploadData {
  title: string;
  category: string;
  description: string;
  userId: number;
  file: File;
  autores: AutorInput[];
}


const useUploadWork = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

       console.log("hola hook");

  const uploadWork = async ({ title, category, description, userId, file, autores }: UploadData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("en el try del hook");
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('userId', userId.toString());
      formData.append('file', file);
      formData.append('autores', JSON.stringify(autores));


      console.log("antes de la llamad a api/trabajo");
      const res = await fetch('/api/trabajo', {
        method: 'POST',
        body: formData,
      });

     if (!res.ok) {
      console.log("salió mal la llamada, no res");
  let errorMessage = 'Error desconocido';
  try {
    const errorData = await res.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
  }
  throw new Error(errorMessage);
}

      const result = await res.json();
      setSuccess(true);
      return result; // Retornar el resultado para poder usarlo
    } catch (err: any) {
      setError(err.message);
      throw err; // Re-lanzar el error para manejarlo en el componente
    } finally {
      setLoading(false);
    }
  };

  const resetStates = () => {
    setError(null);
    setSuccess(false);
  };

  return { uploadWork, loading, error, success, resetStates };
};

export default useUploadWork;