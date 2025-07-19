import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/libs/cloudinary';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth'; 

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        }

        const formData = await request.formData();

        const file = formData.get('file') as File;
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const work_code = parseInt(formData.get('work_code') as string);

        if (!file || !title || !category || !description || isNaN(work_code)) {
            return NextResponse.json({ message: 'Faltan datos' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'trabajos',
                    resource_type: 'raw',
                    public_id: `${title}-${Date.now()}`,
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            ).end(buffer);
        });

        const newWork = await prisma.work.create({
            data: {
                title,
                category,
                description,
                work_code,
                userId: parseInt(session.user.id), // obtenemos el ID de la sesión
                file: uploadResult.secure_url,
            },
        });

        return NextResponse.json(newWork, { status: 201 });

    } catch (error) {
        console.error('Error al subir el trabajo:', error);
        return NextResponse.json({ message: 'Error interno' }, { status: 500 });
    }
}
