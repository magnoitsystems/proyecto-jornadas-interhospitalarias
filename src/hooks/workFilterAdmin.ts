import { Work } from "@/types";
import {useEffect, useState} from "react";

type work = {
    withPrize: Work[],
    withoutPrize: Work[],
    allWorks: Work[]
}

export function useWorkFilter() {
    const [data, setData] = useState<work | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/trabajo')
            .then(async (res) => {
                if (!res.ok) throw new Error("Error al obtener los trabajos");
                return res.json();
            })
            .then((wks: work) => setData(wks))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
