import { useState } from 'react';

interface UploadData {
  title: string;
  category: string;
  description: string;
  userId: number;
  file: File;
}

const useUploadWork = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const uploadWork = async ({ title, category, description, userId, file }: UploadData) => {
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

      const res = await fetch('/api/trabajo', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Error al subir el trabajo');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadWork, loading, error, success };
};

export default useUploadWork;
