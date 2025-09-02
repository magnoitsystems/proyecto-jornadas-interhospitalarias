import { auth } from '@/auth';
import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';
import type { works, author } from '@prisma/client';

type WorkWithAuthors = works & { 
  author: author[];
  created_at?: string | Date;
};


type GoogleSheetsResponse = {
  success: boolean;
  message?: string;
  sheetUrl?: string;
};

export async function POST() {
  try {
    const session = await auth();

    if (!session || !session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    const worksWithAuthors: WorkWithAuthors[] = await prisma.works.findMany({
      include: { author: true },
      orderBy: { id_work: 'desc' }
    });

    if (worksWithAuthors.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No hay trabajos para exportar'
      }, { status: 404 });
    }

    const formattedData = formatDataForSheets(worksWithAuthors);
    const exportResult = await sendToGoogleSheets(formattedData);

    if (exportResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Datos exportados exitosamente',
        sheetUrl: exportResult.sheetUrl,
        recordCount: worksWithAuthors.length
      });
    } else {
      return NextResponse.json({
        success: false,
        message: exportResult.message || 'Error al exportar'
      }, { status: 500 });
    }

  } catch (error: unknown) {
    let message = 'Error desconocido en la exportación';
    if (error instanceof Error) message = error.message;

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

function formatDataForSheets(works: WorkWithAuthors[]): string[][] {
  const headers = [
    'ID', 'Título', 'Categoría', 'Descripción',
    'Código de Trabajo', 'Archivo Principal', 'A Premio',
    'Texto Adicional', 'ID Usuario', 'Autores',
    'Afiliaciones', 'Fecha Creación'
  ];

  const rows = works.map(work => {
    const autores = work.author?.map(a => a.name).join('; ') || 'Sin autores';
    const afiliaciones = work.author?.map(a => a.affiliation).join('; ') || 'Sin afiliaciones';

    return [
      String(work.id_work),
      work.title ?? 'Sin título',
      work.category ?? 'Sin categoría',
      work.description ?? 'Sin descripción',
      work.work_code ?? 'No disponible',
      work.file ?? 'No disponible',
      work.prize ? 'Sí' : 'No',
      work.additional_text ?? 'No disponible',
      String(work.user_id),
      autores,
      afiliaciones,
      work.created_at
        ? new Date(work.created_at).toLocaleString('es-AR')
        : 'No disponible'
    ];
  });

  return [headers, ...rows];
}

async function sendToGoogleSheets(data: string[][]): Promise<GoogleSheetsResponse> {
  try {
    const payload = {
      action: 'exportWorks',
      data,
      sheetName: `Trabajos_${new Date().toISOString().split('T')[0]}`
    };

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbxTmXuXM__bkTnkJGB3l_yGzUGZVs-Pk8QitQBE0D1COeqhS5dkzV5x6sCVFJM-4m3KmA/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      return {
        success: false,
        message: `Error HTTP ${response.status}: ${await response.text()}`
      };
    }

    const result: GoogleSheetsResponse = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}
