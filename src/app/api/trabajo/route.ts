import { NextRequest, NextResponse } from 'next/server';
// import cloudinary from '@/libs/cloudinary';
import { prisma } from '@/libs/prisma';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import {GetWorkForFilter} from "@/services/workFilterService";
import { supabase } from '@/libs/supabase';

const userService = new GetWorkForFilter();

export async function POST(request: NextRequest) {
    console.log("fuckin post");
    try {
        console.log("HOLA POST");
        
        // Obtener la sesión del usuario
        const session = await auth();
        
        // Verificar si el usuario está autenticado
        if (!session || !session?.user?.id) {
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
        const normalUploadResult = await subirAGoogleDrive(file, title, false);
        const workCode = uuidv4();

        // Crear trabajo principal con userId
        const normalWork = await prisma.works.create({
            data: {
                title,
                category,
                description,
                work_code: workCode,
                file: normalUploadResult,
                prize: false,
                user_id: Number(userId),
            },
        });

        // Si hay premio y archivo de premio
        if (premio && premioFile && premioFile instanceof Blob) {
            const premioUploadUrl = await subirAGoogleDrive(premioFile, `${title}-premio`, true);
            await prisma.works.create({
                data: {
                    title,
                    category,
                    description,
                    work_code: uuidv4(),
                    file: premioUploadUrl,
                    prize: true,
                    user_id: Number(userId)
                },
            });
        }

        await prisma.author.createMany({
            data: autoresParsed.map((a: any) => ({
                name: a.nombre,
                affiliation: a.afiliacion,
                work_id: normalWork.id_work
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

async function subirAGoogleDrive(fileBlob: Blob, filename: string, isPremio: boolean): Promise<string> {
    const arrayBuffer = await fileBlob.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString('base64');
    const response = await fetch('https://script.google.com/macros/s/AKfycbxcSNjmgBq8m5SiL3R4CdqeWOQFgFUm_-TVc_QNrYxKTtvsWqViOYHgVq0WgRanzmXFZw/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fileName: filename,
            fileContent: base64File,
            isPremio: isPremio
        }),
    });

    const result = await response.json();

    if (!result.success) {
        console.error('Error al subir a Google Drive:', result.message);
        throw new Error('No se pudo subir el archivo a Google Drive');
    }

    return result.url; // La URL pública
}


export async function GET(){
    const usersFilter = await userService.getAllStatistics();

    try {
        if(!usersFilter){
            return NextResponse.json(
                {message: "Error al filtrar"},
                {status: 400}
            )
        }

        return NextResponse.json(usersFilter);
    }
    catch (e){
        return NextResponse.json(
            { message: "Error del servidor" },
            { status: 500 }
        )
    }
}