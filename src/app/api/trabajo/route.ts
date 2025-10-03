import { NextRequest, NextResponse } from 'next/server';
import { isValidMedicalPdf } from "@/services/pdfValidationService";
import { prisma } from '@/libs/prisma';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import { GetWorkForFilter } from "@/services/workFilterService";
import { EmailService } from "@/services/emailService";

const userService = new GetWorkForFilter();

interface AuthorParsed {
    nombre: string;
    afiliacion: string;
}

interface DriveUploadResponse {
    success: boolean;
    message?: string;
    url?: string;
}

export async function POST(request: NextRequest) {
    try {
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

        if (!autoresRaw) {
            return NextResponse.json({ message: 'Faltan autores' }, { status: 400 });
        }

        const autoresParsed: AuthorParsed[] = JSON.parse(autoresRaw);

        const file = formData.get('file');
        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ message: 'Archivo inválido' }, { status: 400 });
        }

        console.log("Antes del validador")

        // const validationPDF = await isValidMedicalPdf(file);

        // console.log("Resultado: ", validationPDF);

        // if (!validationPDF.accept) {
        //     return NextResponse.json(
        //         { success: false, message: validationPDF.message },
        //         { status: 400 }
        //     );
        // }

        // console.log("Este mensaje no debería mostrase, si el archivo no es valido");

        // if (validationPDF.details?.length !== undefined) {
        //     console.warn('PDF subido con advertencias', validationPDF.details);
        // }

        const workCode = uuidv4();
        
        console.log("Subiendo archivo principal a drive");
        const mainFileUrl = await subirAGoogleDrive(file, `${title}-${workCode}`, premio);
        console.log("workcode: " + workCode);
        console.log("url archivo principal: " + mainFileUrl);

        let additionalTextUrl: string | null = null;

        if (premio && premioFile && premioFile instanceof Blob) {
            console.log("Subiendo archivo adicional (texto completo) a drive");
            additionalTextUrl = await subirAGoogleDrive(premioFile, `${title}-${workCode}-adicional`, true);
            console.log("url archivo adicional: " + additionalTextUrl);
        }

        const work = await prisma.works.create({
            data: {
                title,
                category,
                description,
                work_code: workCode,
                file: mainFileUrl,
                prize: premio,
                additional_text: additionalTextUrl, 
                user_id: Number(userId),
            },
        });

        console.log("Trabajo guardado en base de datos con ID:", work.id_work);

        if (work.id_work != null) {
            console.log("Creando autores para el trabajo");
            await prisma.author.createMany({
                data: autoresParsed.map((a: AuthorParsed) => ({
                    name: a.nombre,
                    affiliation: a.afiliacion,
                    id_work: work.id_work
                })),
            });
            console.log("Autores creados");
        }

        const name = session.user.name;
        const email = session.user.email;

        if (!email)
            return NextResponse.json({ message: 'sesión sin un mail' }, { status: 400 });

        console.log("email: " + email);
        const send = await EmailService.sendWorkSubmissionConfirmation(
            email,
            name,
            title,
            category,
            premio
        );
        console.log("Resultado de enviar mail: " + send);

        return NextResponse.json({ success: true }, { status: 201 });

    } catch (error: unknown) {
        console.error('ERROR EN /api/trabajo:', error);

        let message = 'Error desconocido';
        if (error instanceof Error) {
            message = error.message;
        }

        return NextResponse.json(
            { success: false, message },
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
            isPremio
        }),
    });

    const result: DriveUploadResponse = await response.json();

    if (!result.success || !result.url) {
        console.error('Error al subir a Google Drive:', result.message);
        throw new Error('No se pudo subir el archivo a Google Drive');
    }

    return result.url;
}

export async function GET() {
    const usersFilter = await userService.getAllStatistics();

    try {
        if (!usersFilter) {
            return NextResponse.json(
                { message: "Error al filtrar" },
                { status: 400 }
            );
        }

        return NextResponse.json(usersFilter);
    } catch (error: unknown) {
        console.error('ERROR EN /api/trabajo:', error);

        let message = 'Error desconocido';
        if (error instanceof Error) {
            message = error.message;
        }

        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }
}
