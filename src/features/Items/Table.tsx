import React, { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { CheckRounded, ClearRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

import { splitLevelName } from "../../logic/levels";
import { get } from "../../api";
import { IItem } from "../../api/items";

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
    const [allColumns, setAllColumns] = useState<any[]>([]);
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
                maxWidth: 90,
            },
            {
                name: "engineeringApproved",
                header: "Eng. Ap.",
                type: "boolean",
                render: ({ data }: any) => (data.salesApproved ? <CheckRounded /> : <ClearRounded />),
                maxWidth: 90,
            },
            {
                name: "shippingApproved",
                header: "Ship Ap.",
                type: "boolean",
                render: ({ data }: any) => (data.salesApproved ? <CheckRounded /> : <ClearRounded />),
                maxWidth: 90,
            },
            {
                name: "prefVendor",
                header: "Preferred Vendor",
                render: ({ data }: any) => data?.prefVendor?.name,
                minWidth: 150,
            },
            { name: "vendorPartNumber", header: "V. Part NO.", minWidth: 100 },
            { name: "cost", header: "Cost", minWidth: 80 },
            { name: "location", header: "Location", minWidth: 100 },
            { name: "qtyOnHand", header: "QOH.", minWidth: 80 },
            { name: "qtyRemain", header: " Remain", minWidth: 80 },
            { name: "qtyOnOrder", header: "on Order", minWidth: 80 },
            { name: "qtyAllocated", header: "Allocated", minWidth: 80 },
            { name: "usedInLastQuarter", header: "Used 90", minWidth: 80 },
            { name: "fifo", header: "FIFO Val.", minWidth: 80 },
            {
                name: "qohVal",
                header: "QOH Val.",
                minWidth: 80,
                render: ({ data }: any) => data?.cost * data?.qtyOnHand,
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
                render: ({ data }: any) => (data.salesApproved ? <CheckRounded /> : <ClearRounded />),
                minWidth: 80,
            },
            {
                name: "nonInventoryItem",
                header: "NON Inv.",
                type: "boolean",
                render: ({ data }: any) => (data.salesApproved ? <CheckRounded /> : <ClearRounded />),
                minWidth: 80,
            },
            {
                name: "rndOnly",
                header: "R&D",
                type: "boolean",
                render: ({ data }: any) => (data.salesApproved ? <CheckRounded /> : <ClearRounded />),
                minWidth: 80,
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
                        res.splice(3, 0, { name: f, header: splitLevelName(f), minWidth: 120 });
                    } else {
                        // res.push({ name: f, header: f, defaultVisible: true });
                        spareColumns.push({ name: f, header: f, defaultVisible: true });
                    }
                }
            }
        }

        setAllColumns([...res, ...spareColumns]);
        return res;
    }, [clusters, fields, items]);

    const defaultFilterValue = useMemo(() => {
        let res = allColumns.map(({ name, type }) => ({
            name,
            type: type ? type : "string",
            operator: type === "boolean" ? "eq" : "startsWith",
            value: "",
        }));

        return res;
    }, [allColumns]);

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

    return (
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

export default ItemTable;
