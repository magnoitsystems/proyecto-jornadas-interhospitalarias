import { useState } from 'react';

interface AutorInput {
  nombre: string;
  afiliacion: string;
}

interface UploadData {
  title: string;
  category: string;
  description: string;
  file: File;
  autores: AutorInput[];
  premio: boolean;
  premioFile: File | null;
}

// Interfaz para la respuesta consistente
interface UploadResponse {
  success: boolean;
  message?: string;
  data?: any;
}

const useUploadWork = () => {
  console.log("hola useupload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const uploadWork = async ({ title, category, description, file, autores, premio, premioFile }: UploadData): Promise<UploadResponse> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('autores', JSON.stringify(autores));
      formData.append('premio', premio.toString());
      if (premioFile) {
        formData.append('premioFile', premioFile);
      }
      console.log("obtuvimos todos los campos");

      const res = await fetch('/api/trabajo', {
        method: 'POST',
        body: formData,
      });

      const responseData = await res.json();

      if (res.status !== 201) {
        console.log("se rompió en el post");
        console.log("status: " + res.status);
        
        const errorMessage = responseData.message || 'Error desconocido';
        setError(errorMessage);
        
        // Retornar formato consistente para error
        return {
          success: false,
          message: errorMessage,
          data: responseData
        };
      }

      console.log("res status fuera del if: " + res.status);
      console.log(responseData);
      setSuccess(true);
      
      // Retornar formato consistente para éxito
      return {
        success: true,
        message: 'Trabajo subido exitosamente',
        data: responseData
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      
      // Retornar formato consistente para excepción
      return {
        success: false,
        message: errorMessage
      };
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