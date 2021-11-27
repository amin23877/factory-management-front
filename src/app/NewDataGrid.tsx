import React, { useCallback, useMemo } from "react";

import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

import { get } from "../api";

import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
    root: {
        "& .InovuaReactDataGrid__column-header": {
            background: "#202731",
            color: "#fff",
        },
    },
});

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

function NewDataGrid({
    onRowSelected,
    columns,
    style,
    url,
}: {
    onRowSelected: (row: any) => void;
    columns: any[];
    style?: any;
    url: string;
}) {
    const classes = useStyle();

    const defaultFilterValue = useMemo(() => {
        let res = columns.map(({ name }) => ({
            name,
            type: "string",
            operator: "startsWith",
            value: undefined,
        }));

        return res;
    }, [columns]);

    const gridStyle = { minHeight: "calc(100vh - 200px)" };

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
                params.sort = sortInfo.name;
                params.order = sortInfo.dir === 1 ? "ASC" : "DESC";
            }

            try {
                const d = await get(url, { params });
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
            style={style ? style : gridStyle}
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

export default NewDataGrid;
