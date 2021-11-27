import React, { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { CheckRounded, ClearRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

import { splitLevelName } from "../../logic/levels";
import { get } from "../../api";
import { IItem } from "../../api/items";
import { LinearProgress } from "@material-ui/core";

import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import BoolFilter from "@inovua/reactdatagrid-community/BoolFilter";

const useStyle = makeStyles({
    root: {
        "& .InovuaReactDataGrid__column-header": {
            background: "#202731",
            color: "#fff",
        },
    },
});

const gridStyle = { minHeight: 600 };

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

function ItemTable({ onRowSelected }: { onRowSelected: (r: any) => void }) {
    const { data: fields } = useSWR("/field");
    const { data: clusters } = useSWR("/filter");
    const [items, setItems] = useState<IItem[]>([]);

    const classes = useStyle();

    const columns = useMemo(() => {
        let res: any[] = [
            { name: "no", header: "Number", minWidth: 100 },
            { name: "name", header: "Name", minWidth: 180 },
            { name: "description", header: "Description", minWidth: 200 },
            {
                name: "salesApproved",
                header: "Sales Ap.",
                type: "boolean",
                render: ({ data }: any) => (data.salesApproved ? <CheckRounded /> : <ClearRounded />),
                // maxWidth: 90,
            },
            {
                name: "engineeringApproved",
                header: "Eng. Ap.",
                type: "boolean",
                render: ({ data }: any) => (data.engineeringApproved ? <CheckRounded /> : <ClearRounded />),
                // maxWidth: 90,
            },
            {
                name: "shippingApproved",
                header: "Ship Ap.",
                type: "boolean",
                render: ({ data }: any) => (data.shippingApproved ? <CheckRounded /> : <ClearRounded />),
                // maxWidth: 90,
            },
            {
                name: "prefVendor",
                header: "Preferred Vendor",
                render: ({ data }: any) => data?.prefVendor?.name,
                minWidth: 150,
            },
            { name: "vendorPartNumber", header: "V. Part NO.", minWidth: 100 },
            { name: "cost", header: "Cost", minWidth: 80, type: "number" },
            { name: "location", header: "Location", minWidth: 100 },
            { name: "qtyOnHand", header: "QOH.", minWidth: 80, type: "number" },
            { name: "qtyRemain", header: " Remain", minWidth: 80, type: "number" },
            { name: "qtyOnOrder", header: "on Order", minWidth: 80, type: "number" },
            { name: "qtyAllocated", header: "Allocated", minWidth: 80, type: "number" },
            { name: "usedInLastQuarter", header: "Used 90", minWidth: 80, type: "number" },
            { name: "fifo", header: "FIFO Val.", minWidth: 80, type: "number" },
            {
                name: "qohVal",
                header: "QOH Val.",
                minWidth: 80,
                render: ({ data }: any) => data?.cost * data?.qtyOnHand,
                type: "number",
            },
            {
                name: "uom",
                header: "UOM",
                minWidth: 100,
            },
            {
                name: "obsolete",
                header: "Obsolete",
                type: "boolean",
                // minWidth: 80,
            },
            {
                name: "nonInventoryItem",
                header: "NON Inv.",
                type: "boolean",
                render: ({ data }: any) => (data.nonInventoryItem ? <CheckRounded /> : <ClearRounded />),
                // minWidth: 80,
            },
            {
                name: "rndOnly",
                header: "R&D",
                type: "boolean",
                render: ({ data }: any) => (data.rndOnly ? <CheckRounded /> : <ClearRounded />),
                // minWidth: 80,
            },
        ];
        const spareColumns: any[] = [];

        const exceptions = [
            "__v",
            "id",
            "no",
            "name",
            "description",
            "cost",
            "salesApproved",
            "engineeringApproved",
            "totalQoh",
            "usedInLastQuarter",
            "resellCost",
            "filters",
            "fields",
            "prefVendor",
            "location",
            "rndOnly",
            "nonInventoryItem",
            "obsolete",
            "uom",
            "qohVal",
            "fifo",
            "qtyAllocated",
            "qtyRemain",
            "qtyOnOrder",
            "vendorPartNumber",
        ];
        if (items && items.length > 0) {
            const fieldNames = fields ? fields.map((f: any) => f.name) : [];
            const filterNames = clusters ? clusters.map((f: any) => f.name) : [];
            for (let f of Object.keys(items[0])) {
                if (!exceptions.includes(f)) {
                    if (filterNames.includes(f)) {
                        res.splice(3, 0, { name: f, header: f, minWidth: 120 });
                    } else if (fieldNames.includes(f)) {
                        res.splice(3, 0, {
                            name: f,
                            header: splitLevelName(f),
                            minWidth: 120,
                        });
                    } else {
                        spareColumns.push({ name: f, header: f, defaultVisible: true });
                    }
                }
            }
        }
        if (res) {
            res = res.map((r) => {
                if (r.type === "boolean") {
                    r = {
                        ...r,
                        minWidth: 50,
                        maxWidth: 80,
                        filterEditor: BoolFilter,
                    };
                }
                if (r.type === "number") {
                    r = {
                        ...r,
                        // minWidth: 70,
                        filterEditor: NumberFilter,
                    };
                }
                return r;
            });
        }

        return res;
    }, [clusters, fields, items]);

    const defaultFilterValue = useMemo(() => {
        let res = columns.map(({ name, type }) => ({
            name,
            type: type ? type : "string",
            operator: type === "boolean" ? "eq" : type === "number" ? "eq" : "startsWith",
            value: "",
        }));
        console.log(columns);
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
                const d = await get("/item", { params });
                setItems(d.result);
                return { data: d.result, count: d.total };
            } catch (e) {
                console.log(e);
                return { data: [], count: 0 };
            }
        },
        []
    );

    useEffect(() => {
        fetchData({ filterValue: [], limit: 50, sortInfo: {} });
    }, []);

    // if (!items || items.length < 1) {
    //     return (
    //         <ReactDataGrid
    //             columns={columns}
    //             dataSource={async ({ filterValue, limit, sortInfo, skip }) => ({ data: [], count: 0 })}
    //             defaultFilterValue={defaultFilterValue}
    //             style={gridStyle}
    //             className={classes.root}
    //         />
    //     );
    // }

    return (
        <>
            {/* {columns[3]?.name === "Type" ? ( */}
            {(items && items.length < 1) || columns.length > 21 ? (
                <ReactDataGrid
                    idProperty="id"
                    columns={columns}
                    rowHeight={20}
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
                                // {
                                //     name: "neq",
                                //     fn: ({ value, filterValue }) => value !== filterValue,
                                // },
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
            ) : (
                items.length === 0 && <LinearProgress />
            )}
        </>
    );
}

export default ItemTable;
