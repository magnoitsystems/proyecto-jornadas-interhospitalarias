import {useEffect, useState} from "react";
import { Statistics } from "@/types";

export function statisticAdmin(){
    const [data, setData] = useState<Statistics[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/estadistica').then((res) => {
            if(!res.ok) throw new Error("Error al obetener las estadísticas");
            return res.json()
        })
            .then((stats: Statistics[]) => setData(stats.flat()))
            .catch((err) => setError(err.messages))
            .finally( () => setLoading(false));
    }, []);

    return {data, loading, error};
}