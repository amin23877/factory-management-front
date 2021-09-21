import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { get } from "../../api";
import { useDataGridStyles } from "../../app/BaseDataGrid";
import { generateQuery, ParameterType } from "../../logic/utils";

function useStickyResult(value: any) {
    const val = useRef();
    if (value !== undefined) val.current = value;
    return val.current;
}

export const useDataGridData = ({ params, url }: { params?: ParameterType; url: string }) => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const dataGridClasses = useDataGridStyles();

    const { data, mutate } = useSWR(
        params ? `${url}?${generateQuery(params)}&page=${page + 1}` : `${url}?page=${page + 1}`
    );
    const rows: any = useStickyResult(data);

    return { page, setPage, rows, mutate, loading, setLoading, dataGridClasses };
};

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
