import { useRef, useState } from "react";
import useSWR from "swr";

import { get } from "../../api";
import { useDataGridStyles } from "../../app/BaseDataGrid";
import { generateQuery, ParameterType } from "../../logic/utils";

function useStickyResult(value: any) {
    const val = useRef();
    if (value !== undefined) val.current = value;
    return val.current;
}

export const useDataGridData = ({
    params,
    url,
    limit,
}: {
    params?: ParameterType;
    url: string;
    limit?: number | string;
}) => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const dataGridClasses = useDataGridStyles();

    const paginationQueries = `page=${page + 1}&pageSize=${limit ? limit : 25}`;
    const otherQueries = params && generateQuery(params) ? generateQuery(params) + "&" : "";
    const { data, mutate } = useSWR(`${url}?${otherQueries}${paginationQueries}`, async (url) => {
        try {
            setLoading(true);
            return await get(url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    });
    const rows: any = useStickyResult(data);

    return { page, setPage, rows, mutate, loading, setLoading, dataGridClasses };
};
