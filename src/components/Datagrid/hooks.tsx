import { useEffect, useState } from "react";

import { useDataGridStyles } from "../../app/BaseDataGrid";
import { get } from "../../api";

function usePaginatedData({ params, url }: { params?: string; url: string }) {
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<{ result: any[]; total: number; totalPages: number }>();
    const [loading, setLoading] = useState(false);
    const dataGridClasses = useDataGridStyles();

    useEffect(() => {
        setLoading(true);
        get(params ? `${url}?${params}&page=${page + 1}` : `${url}?page=${page + 1}`)
            .then((resp) => {
                // if (resp && resp.result) {
                if (resp) {
                    setRows(resp);
                }
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, [url, page, params]);

    return { page, setPage, rows, setRows, loading, setLoading, dataGridClasses };
}

export default usePaginatedData;
