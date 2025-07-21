import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/libs/cloudinary';
import { prisma } from '@/libs/prisma';
import { v4 as uuidv4 } from 'uuid';

console.log("hola route")
export async function POST(request: NextRequest) {
    try {
        console.log("hola post");
        const formData = await request.formData();
        console.log("hola form data");

        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const userId = parseInt(formData.get('userId') as string);
        const autoresRaw = formData.get('autores') as string;
        console.log("obtuvimos todo");

        if (!autoresRaw) {
            return NextResponse.json({ message: 'Faltan autores' }, { status: 400 });
        }

        const autoresParsed = JSON.parse(autoresRaw) as { nombre: string, afiliacion: string }[];

        if (!Array.isArray(autoresParsed) || autoresParsed.length === 0) {
            return NextResponse.json({ message: 'Formato de autores inválido' }, { status: 400 });
        }



        const file = formData.get('file');

        console.log("sobrevivimos al file");

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ message: 'Archivo inválido' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
            console.log("entramos al subir a cloudinary");
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

        // Generar código único
        const workCode = uuidv4();

        const newWork = await prisma.works.create({
            data: {
                title,
                category,
                description,
                work_code: workCode,
                user_id: userId,
                file: uploadResult.secure_url,
            },
        });

        console.log("creado trabajos");

        const autoresToCreate = autoresParsed.map((a) => ({
            name: a.nombre.split(' ').slice(1).join(' ') || '', // nombre = segundo/s
            lastname: a.nombre.split(' ')[0],                   // apellido = primero
            affiliation: a.afiliacion,
            work_id: newWork.id_work,
        }));

        await prisma.author.createMany({
            data: autoresToCreate,
        });

        console.log("creado autores");


        return NextResponse.json(newWork, { status: 201 });
    } catch (error) {
    console.error('ERROR EN /api/trabajo:', error);
    console.log(error);
    return NextResponse.json(
      { success: false, message: (error as any)?.message ?? 'Error desconocido al entrar al post' },
      { status: 500 }
    );
  }
}
