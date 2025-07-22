import {getWorkForFilter} from "@/services/workFilterService";

// Opción 1: Objeto con propiedades claras
async function testFilter() {
    const filter = new getWorkForFilter();
    const result = await filter.getAllStatistics();
    console.log(result);
}

testFilter();
