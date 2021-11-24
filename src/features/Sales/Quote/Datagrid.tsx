import React, { useCallback, useMemo, useState } from "react";

import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

import { get } from "../../../api";

import { makeStyles } from "@material-ui/styles";

import { formatTimestampToDate } from "../../../logic/date";

import { ParameterType } from "../../../logic/utils";
import { IQuote } from "../../../api/quote";

const useStyle = makeStyles({
    root: {
        "& .InovuaReactDataGrid__column-header": {
            background: "#202731",
            color: "#fff",
        },
    },
});

const gridStyle = { minHeight: 520 };

const getOperator = (op: string) => {
    switch (op) {
        case "contains":
            return "contain";
        case "startsWith":
            return "startsWith";
        case "endsWith":
            return "endsWith";
        case "lt":
            return "max";
        case "gt":
            return "min";
        default:
            return "";
    }
};

function QuoteDataGrid({
    onRowSelected,
    params,
    url,
}: {
    params?: ParameterType;
    url?: string;
    onRowSelected: (row: any) => void;
}) {
    // const { dataGridClasses, loading, page, rows, setPage } = useDataGridData({ params, url: "/quote" });
    const [quotes, setQuotes] = useState<IQuote[]>([]);

    const classes = useStyle();

    const columns = useMemo(
        () => [
            {
                name: "Date",
                render: ({ data }: any) => formatTimestampToDate(data.date),
                minWidth: 100,
            },
            { name: "number", header: "Quote ID", minWidth: 100 },
            {
                name: "client",
                header: "Client",
                minWidth: 100,
                render: ({ data }: any) => data.client?.name,
            },
            { name: "rep", header: "Rep", minWidth: 100, render: ({ data }: any) => data.repOrAgency?.name },
            {
                name: "state",
                header: "State",
                minWidth: 100,
                render: ({ data }: any) => data.repOrAgency?.state,
            },
            { name: "requesterName", header: "Requester", minWidth: 100 },
            {
                name: "project",
                header: "Project Name",
                minWidth: 100,
                render: ({ data }: any) => data.ProjectId?.name,
            },
            {
                name: "quotedBy",
                header: "Quoted By",
                minWidth: 100,
                render: ({ data }: any) => data.salesperson?.username,
            },
            { name: "so", header: "SO", minWidth: 100, render: ({ data }) => data.SOId?.number },
            { name: "status", header: "Status", minWidth: 100 },
            { name: "total", header: "Total Amount", flex: 1 },
        ],
        []
    );

    const defaultFilterValue = useMemo(() => {
        let res = columns.map(({ name }) => ({
            name,
            type: "string",
            operator: "startsWith",
            value: undefined,
        }));

        return res;
    }, [columns]);

    const fetchData = useCallback(
        async ({
            filterValue,
            limit,
            sortInfo,
            skip,
        }): Promise<{
            data: any[];
            count: number;
        }> => {
            let params: any = {};
            for (const fv of filterValue) {
                if (fv.value) {
                    params[getOperator(fv.operator) + fv.name] = fv.value;
                }
            }
            if (limit) {
                params.pageSize = limit;
            }
            if (skip) {
                params.page = skip / limit + 1;
            }
            if (sortInfo) {
                // setSort({ sort: field, order: sort === "desc" ? "DESC" : "ASC" });
                // console.log(sortInfo);
                params.sort = sortInfo.name;
                params.order = sortInfo.dir === 1 ? "ASC" : "DESC";
            }

            try {
                const d = await get("/quote", { params });
                setQuotes(d.result);
                return { data: d.result, count: d.total };
            } catch (e) {
                console.log(e);
                return { data: [], count: 0 };
            }
        },
        []
    );

    return (
        <ReactDataGrid
            idProperty="id"
            rowHeight={20}
            columns={columns}
            dataSource={fetchData}
            style={gridStyle}
            defaultFilterValue={defaultFilterValue}
            onRowClick={({ data }) => onRowSelected(data)}
            showColumnMenuTool={false}
            pagination
            className={classes.root}
            filterTypes={{
                boolean: {
                    type: "boolean",
                    emptyValue: false,
                    operators: [
                        {
                            name: "neq",
                            fn: ({ value, filterValue }) => value !== filterValue,
                        },
                        {
                            name: "eq",
                            fn: ({ value, filterValue }) => value === filterValue,
                        },
                    ],
                },
                string: {
                    type: "string",
                    emptyValue: "",
                    operators: [
                        {
                            name: "startsWith",
                            fn: ({ value, filterValue }) => {
                                return !filterValue ? true : Boolean(value.startsWith(filterValue));
                            },
                        },
                        {
                            name: "contains",
                            fn: ({ value, filterValue }) => {
                                return !filterValue ? true : value.indexOf(filterValue) !== -1;
                            },
                        },
                        {
                            name: "eq",
                            fn: ({ value, filterValue }) => value === filterValue,
                        },
                    ],
                },
            }}
        />
    );
}

export default QuoteDataGrid;
