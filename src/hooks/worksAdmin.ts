'use client';

import { useState } from 'react';

export default function useUploadWork() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const uploadWork = async (
        data: {
            title: string;
            category: string;
            description: string;
            file: File;
            userId: number;
        }
    ) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('file', data.file);
        formData.append('userId', data.userId.toString());


        try {
            const res = await fetch('/api/trabajos', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message || 'Error al subir el trabajo');
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { uploadWork, loading, error, success };
}
