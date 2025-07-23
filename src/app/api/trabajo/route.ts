import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/libs/cloudinary';
import { prisma } from '@/libs/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const userId = parseInt(formData.get('userId') as string);
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

    const normalUploadResult = await subirACloudinary(file, title);
    const workCode = uuidv4();

    const normalWork = await prisma.works.create({
      data: {
        title,
        category,
        description,
        work_code: workCode,
        user_id: userId,
        file: normalUploadResult.secure_url,
        prize: false,
      },
    });

    if (premio && premioFile && premioFile instanceof Blob) {
      const premioUploadResult = await subirACloudinary(premioFile, `${title}-premio`);
      await prisma.works.create({
        data: {
          title,
          category,
          description,
          work_code: uuidv4(),
          user_id: userId,
          file: premioUploadResult.secure_url,
          prize: true,
        },
      });
    }

    await prisma.author.createMany({
      data: autoresParsed.map((a: any) => ({
        name: a.nombre.split(' ').slice(1).join(' ') || '',
        lastname: a.nombre.split(' ')[0],
        affiliation: a.afiliacion,
        work_id: normalWork.id_work
      }))
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
