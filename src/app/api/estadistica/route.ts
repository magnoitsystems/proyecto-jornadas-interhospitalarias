import { NextResponse } from "next/server";
import { GetStatistic } from "@/services/statisticService";

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