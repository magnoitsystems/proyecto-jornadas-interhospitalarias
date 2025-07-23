import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/libs/cloudinary';
import { prisma } from '@/libs/prisma';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
    try {
        console.log("HOLA POST");
        
        // Obtener la sesión del usuario
        const session = await auth();
        
        // Verificar si el usuario está autenticado
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { message: 'Usuario no autenticado' }, 
                { status: 401 }
            );
        }
        
        const userId = session.user.id;
        console.log(userId);
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const autoresRaw = formData.get('autores') as string;
        const premioRaw = formData.get('premio') as string;
        const premioFile = formData.get('premioFile');
        const premio = premioRaw === 'true';

        if (!autoresRaw) return NextResponse.json({ message: 'Faltan autores' }, { status: 400 });
        const autoresParsed = JSON.parse(autoresRaw);

        const file = formData.get('file');
        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ message: 'Archivo inválido' }, { status: 400 });
        }

        // Subir archivo principal
        const normalUploadResult = await subirACloudinary(file, title);
        const workCode = uuidv4();

        // Crear trabajo principal con userId
        const normalWork = await prisma.works.create({
            data: {
                title,
                category,
                description,
                work_code: workCode,
                file: normalUploadResult.secure_url,
                prize: false,
                user_id: Number(userId),
            },
        });

        // Si hay premio y archivo de premio
        if (premio && premioFile && premioFile instanceof Blob) {
            const premioUploadResult = await subirACloudinary(premioFile, `${title}-premio`);
            await prisma.works.create({
                data: {
                    title,
                    category,
                    description,
                    work_code: uuidv4(),
                    file: premioUploadResult.secure_url,
                    prize: true,
                    user_id: Number(userId)
                },
            });
        }

        await prisma.author.createMany({
            data: autoresParsed.map((a: any) => ({
                name: a.name,
                affiliation: a.afiliacion,
                work_id: normalWork.id_work,
            })),
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('ERROR EN /api/trabajo:', error);
        return NextResponse.json(
            { success: false, message: (error as any)?.message ?? 'Error desconocido' },
            { status: 500 }
        );
    }
}

async function subirACloudinary(fileBlob: Blob, title: string) {
    console.log("subiendo a cloudinary");
    const buffer = Buffer.from(await fileBlob.arrayBuffer());
    return await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: 'trabajos',
                resource_type: 'raw',
                public_id: `${title}-${Date.now()}`,
            },
            (error: any, result: any) => {
                if (error) return reject(error);
                resolve(result);
            }
        ).end(buffer);
    });
}