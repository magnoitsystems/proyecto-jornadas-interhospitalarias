import { NextRequest, NextResponse } from 'next/server';
import { generateMockUsers } from '@/utils/mockData';
import { MedicalStatsProcessor } from '@/utils/statsProcessor';
import { CSVGenerator } from '@/utils/csvGenerator';

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const {
            reportType = 'complete',
            userCount = 150,
        } = body;

        const validReportTypes = ['profession', 'gender', 'specialty', 'complete'];
        if (!validReportTypes.includes(reportType)) {
            return NextResponse.json({
                message: 'Tipo de reporte inválido',
                validTypes: validReportTypes
            }, { status: 400 });
        }

        if (userCount < 1 || userCount > 1000) {
            return NextResponse.json({
                message: 'Cantidad de usuarios debe estar entre 1 y 1000'
            }, { status: 400 });
        }


        const mockUsers = generateMockUsers(userCount);

        const processor = new MedicalStatsProcessor(mockUsers);

        let csvContent: string;
        let filename: string;

        switch (reportType) {
            case 'profession':
                const professionStats = processor.getStatsByProfession();
                csvContent = CSVGenerator.generateProfessionStats(professionStats);
                filename = `estadisticas-profesion-${new Date().toISOString().split('T')[0]}.csv`;
                break;

            case 'gender':
                const genderStats = processor.getStatsByGender();
                csvContent = CSVGenerator.generateGenderStats(genderStats);
                filename = `estadisticas-genero-${new Date().toISOString().split('T')[0]}.csv`;
                break;

            case 'specialty':
                const specialtyStats = processor.getStatsBySpecialty();
                csvContent = CSVGenerator.generateSpecialtyStats(specialtyStats);
                filename = `estadisticas-especialidad-${new Date().toISOString().split('T')[0]}.csv`;
                break;

            case 'complete':
            default:
                const completeStats = processor.getCompleteStats();
                csvContent = CSVGenerator.generateCompleteReport(completeStats);
                filename = `reporte-completo-medico-${new Date().toISOString().split('T')[0]}.csv`;
                break;
        }

        const BOM = '\uFEFF';
        const finalContent = BOM + csvContent;

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