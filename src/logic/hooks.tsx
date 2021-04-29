import { useEffect, useState } from "react";

export const useQuery = async (request: (arg?: any) => Promise<any>) => {
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshData = async () => {
        setIsLoading(true);
        try {
            const resp = await request();
            if (resp) {
                setData(resp);
                setIsLoading(false);
            }
        } catch (error) {
            setError(error);
            setData(null);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return { data, isLoading, error, refreshData };
};
