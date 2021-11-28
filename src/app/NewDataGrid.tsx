import React, { useCallback, useMemo } from "react";

import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import BoolFilter from "@inovua/reactdatagrid-community/BoolFilter";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";

import { get } from "../api";

import { makeStyles } from "@material-ui/styles";
import { CheckRounded, ClearRounded } from "@material-ui/icons";
import moment from "moment";
import { formatTimestampToDate } from "../logic/date";

window.moment = moment;

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
        case "before":
            return "max";
        case "after":
            return "min";
        default:
            return "";
    }
};

const gridStyle = { minHeight: "calc(100vh - 200px)" };
const green = {
    color: "#12AE25",
    width: "100%",
    display: "flex",
    justifyContent: "center ",
    alignItems: "center",
};
const red = { color: "#F53636", width: "100%", display: "flex", justifyContent: "center ", alignItems: "center" };

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

    const cols = useMemo(() => {
        let res: any[] = columns;
        if (res) {
            res = res.map((r) => {
                if (r.type === "boolean") {
                    r = {
                        ...r,
                        minWidth: 50,
                        maxWidth: 80,
                        filterEditor: BoolFilter,
                        render: ({ data }: any) =>
                            data[r.name] ? (
                                <div style={green}>
                                    <CheckRounded />
                                </div>
                            ) : (
                                <div style={red}>
                                    <ClearRounded />
                                </div>
                            ),
                    };
                }
                if (r.type === "number") {
                    r = {
                        ...r,
                        filterEditor: NumberFilter,
                    };
                }
                if (r.type === "date") {
                    r = {
                        ...r,
                        dateFormat: "x",
                        filterEditor: DateFilter,
                        render: ({ value, cellProps: { dateFormat } }: { value: any; cellProps: any }) =>
                            formatTimestampToDate(value),
                    };
                }
                return r;
            });
        }
        return res;
    }, [columns]);

    const defaultFilterValue = useMemo(() => {
        let res = columns.map(({ name, type }) => ({
            name,
            type: type ? type : "string",
            operator: type === "string" ? "startsWith" : "eq",
            value: type === "date" ? "" : undefined,
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
        [url]
    );

    return (
        <ReactDataGrid
            idProperty="id"
            rowHeight={20}
            columns={cols}
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
                number: {
                    type: "number",
                    emptyValue: null,
                    operators: [
                        {
                            name: "eq",
                            fn: ({ value, filterValue }) => value === filterValue,
                        },
                        {
                            name: "lt",
                            fn: ({ value, filterValue }) => value < filterValue,
                        },
                        {
                            name: "gt",
                            fn: ({ value, filterValue }) => value > filterValue,
                        },
                    ],
                },
                date: {
                    type: "date",
                    emptyValue: null,
                    operators: [
                        {
                            name: "eq",
                            fn: ({ value, filterValue }) => value === filterValue,
                        },
                        {
                            name: "before",
                            fn: ({ value, filterValue }) => value < filterValue,
                        },
                        {
                            name: "after",
                            fn: ({ value, filterValue }) => value > filterValue,
                        },
                    ],
                },
            }}
        />
    );
}

export default NewDataGrid;
