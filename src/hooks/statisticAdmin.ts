import {useEffect, useState} from "react";
import { Statistics } from "@/types";

export function statisticAdmin(){
    const [data, setData] = useState<Statistics[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/estadistica')
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener las estadísticas");
                }
                return res.json();
            })
            .then((stats: Statistics[]) => setData(stats.flat()))
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    return {data, loading, error};
}