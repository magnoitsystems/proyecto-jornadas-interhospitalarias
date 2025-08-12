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

const useUploadWork = () => {
  console.log("hola useupload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const uploadWork = async ({ title, category, description, file, autores, premio, premioFile }: UploadData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category.toLocaleLowerCase());
      formData.append('description', description);
      formData.append('file', file);
      formData.append('autores', JSON.stringify(autores));
      formData.append('premio', premio.toString());
      if (premioFile) {
        formData.append('premioFile', premioFile);
      }
      console.log("obtuvimos todos los campos");
	  console.log(category);
	  console.log(category.toLocaleLowerCase());

      const res = await fetch('/api/trabajo', {
        method: 'POST',
        body: formData,
      });

      if (res.status != 201) {
        console.log("se rompió en el post");
        console.log("status: " + res.status);
        let errorMessage = 'Error desconocido';
	      try {
		      const errorData = await res.json();
			  console.log("res.json() = " + errorData);
			  console.log(errorData);
			  console.log("errorData.error = " + errorData.error );
		      const actualMessage = errorData.result?.message || errorData.message;
		      console.log("mensaje de error: " + actualMessage);
		      errorMessage = actualMessage || errorMessage;
		      setError(errorMessage);
		      return { success: false, uploadError: true, message: errorMessage };
	      } catch {
		      setError('Error de conexión');
		      return { success: false, uploadError: true, message: 'Error de conexión' };
	      }
      }

      console.log("res status fuera del if: " + res.status);

      const result = await res.json();
      console.log(result);
      setSuccess(true);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
        throw err;
      }
      return null;
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
