import React, { useCallback, useMemo } from "react";

import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

import { get } from "../../../api";

import { makeStyles } from "@material-ui/styles";

import { formatTimestampToDate } from "../../../logic/date";

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

function QuoteDataGrid({ onRowSelected }: { onRowSelected: (row: any) => void }) {
    const classes = useStyle();

    const columns = useMemo(
        () => [
            {
                name: "date",
                header: "Date",
                render: ({ data }: any) => formatTimestampToDate(data?.date),
                minWidth: 110,
            },
            { name: "number", header: "Ticket ID", minWidth: 100 },
            { name: "subject", header: "Subject", minWidth: 100 },
            { name: "company", header: "Company", minWidth: 100 },
            { name: "contactName", header: "Name", minWidth: 100 },
            { name: "contactNumber", header: "Contact No.", minWidth: 110 },
            { name: "contactEmail", header: "Email", minWidth: 150 },
            { name: "state", header: "State", minWidth: 100 },
            { name: "zip", header: "Zip Code", minWidth: 100 },
            {
                name: "Assigned To",
                render: ({ data }: any) => data.AssignedTo?.username,
                minWidth: 110,
            },
            {
                name: "Created By",
                render: ({ data }: any) => data.CreatedBy?.username,
                minWidth: 110,
            },
            {
                name: "Tag",
                render: ({ data }: any) => data.Tags[0]?.name,
                minWidth: 100,
            },
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
                // setSort({ sort: name, order: sort === "desc" ? "DESC" : "ASC" });
                // console.log(sortInfo);
                params.sort = sortInfo.name;
                params.order = sortInfo.dir === 1 ? "ASC" : "DESC";
            }

            try {
                const d = await get("/calls", { params });
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
