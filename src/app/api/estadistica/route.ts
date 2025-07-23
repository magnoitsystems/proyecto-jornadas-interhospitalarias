import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { GetStatistic } from "@/services/statisticService";
import { generateMockUsers } from '@/utils/mockData';
import { MedicalStatsProcessor } from '@/utils/MedicalStatsProcessor';
import { CSVGenerator } from '@/utils/csvGenerator';

const statisticService = new GetStatistic();

export async function GET(){
    try {
        const allStats = await statisticService.getAllStatistics();

        if(!allStats){
            return NextResponse.json(
                { message: "Error al traer las estadísticas" },
                { status: 404 }
            )
        }
        return NextResponse.json(allStats);
    }
    catch (e){
        console.log(e);
        NextResponse.json(
            { message: "" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userCount } = body;

        if (userCount < 1 || userCount > 1000) {
            return NextResponse.json({
                message: 'Cantidad de usuarios debe estar entre 1 y 1000'
            }, { status: 400 });
        }

        // Procesar datos con la nueva configuración
        const mockUsers = generateMockUsers(userCount);
        const processor = new MedicalStatsProcessor(mockUsers);
        const processedData = processor.getStatsWithConfig(body);

        // Generar CSV con configuración
        const csvContent = CSVGenerator.generateWithConfig(processedData, body);

        const BOM = '\uFEFF';
        const finalContent = BOM + csvContent;

        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `estadisticas-medicas-${body.format}-${timestamp}.csv`;

        return new NextResponse(finalContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Cache-Control': 'no-cache'
            }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Error desconocido'
        }, { status: 500 });
    }
}