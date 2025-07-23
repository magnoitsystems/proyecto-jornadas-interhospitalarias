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
  premio: boolean;
  premioFile: File | null;
}

const useUploadWork = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const uploadWork = async ({ title, category, description, userId, file, autores, premio, premioFile }: UploadData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('userId', userId.toString());
      formData.append('file', file);
      formData.append('autores', JSON.stringify(autores));
      formData.append('premio', premio.toString());
      if (premioFile) {
        formData.append('premioFile', premioFile);
      }

      const res = await fetch('/api/trabajo', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        let errorMessage = 'Error desconocido';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }

      const result = await res.json();
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
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
