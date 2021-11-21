import React, { useCallback, useMemo, useState } from "react";
// import { Box } from "@material-ui/core";
// import { DataGrid, GridColumns, GridFilterModelParams, GridSortModelParams, GridToolbar } from "@material-ui/data-grid";
import useSWR from "swr";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

// import { BasePaper } from "../../app/Paper";

import { splitLevelName } from "../../logic/levels";
// import { useDataGridData } from "../../components/Datagrid/hooks";
import { get } from "../../api";
import { IItem } from "../../api/items";
import { CheckRounded, ClearRounded } from "@material-ui/icons";

import { makeStyles } from "@material-ui/styles";
const useStyle = makeStyles({
    root: {
        "& .InovuaReactDataGrid__column-header": {
            background: "#202731",
            color: "#fff",
        },
    },
});

// function ItemTable({ onRowSelected }: { onRowSelected: (r: any) => void }) {
//     const [filters, setFilters] = useState<{ [key: string]: any }>({});
//     const [sorts, setSort] = useState<{ [key: string]: string }>({});
//     const [limit, setLimit] = useState<string | number>();
//     const {
//         dataGridClasses,
//         loading,
//         page,
//         rows: items,
//         setPage,
//     } = useDataGridData({ url: "/item", params: { ...filters, ...sorts }, limit });

// const { data: fields } = useSWR("/field");
// const { data: clusters } = useSWR("/filter");

//     const gridColumns = useMemo<GridColumns>(() => {
//         let res: GridColumns = [
//             { field: "no", headerName: "Number", width: 100 },
//             { field: "name", headerName: "Name", width: 180 },
//             { field: "description", headerName: "Description", width: 200 },
//             //filter ha dynamic hast
//             {
//                 field: "salesApproved",
//                 headerName: "Sales Ap.",
//                 type: "boolean",
//                 width: 80,
//                 disableColumnMenu: true,
//             },
//             {
//                 field: "engineeringApproved",
//                 headerName: "Eng. Ap.",
//                 type: "boolean",
//                 width: 80,
//                 disableColumnMenu: true,
//             },
//             {
//                 field: "shippingApproved",
//                 headerName: "Ship Ap.",
//                 type: "boolean",
//                 width: 80,
//                 disableColumnMenu: true,
//             },
//             {
//                 field: "prefVendor",
//                 headerName: "Preferred Vendor",
//                 valueFormatter: (params) => params.row?.prefVendor?.name,
//                 disableColumnMenu: true,
//                 width: 150,
//             },
//             { field: "vendorPartNumber", headerName: "V. Part NO.", width: 100 },
//             { field: "cost", headerName: "Cost", width: 80 },
//             { field: "location", headerName: "Location", width: 100 },
//             { field: "qtyOnHand", headerName: "QOH.", width: 80 },
//             { field: "qtyRemain", headerName: " Remain", width: 80 },
//             { field: "qtyOnOrder", headerName: "on Order", width: 80 },
//             { field: "qtyAllocated", headerName: "Allocated", width: 80 },
//             { field: "usedInLastQuarter", headerName: "Used 90", width: 80 },
//             { field: "fifo", headerName: "FIFO Val.", width: 80 },
//             {
//                 field: "qohVal",
//                 headerName: "QOH Val.",
//                 width: 80,
//                 valueFormatter: (params) => params.row?.cost * params.row?.qtyOnHand,
//                 // disableColumnMenu: true,
//             },
//             { field: "uom", headerName: "UOM", width: 100, disableColumnMenu: true },
//             {
//                 field: "obsolete",
//                 headerName: "Obsolete",
//                 type: "boolean",
//                 width: 80,
//                 // disableColumnMenu: true,
//             },
//             {
//                 field: "nonInventoryItem",
//                 headerName: "NON Inv.",
//                 type: "boolean",
//                 width: 80,
//                 // disableColumnMenu: true,
//             },
//             {
//                 field: "rndOnly",
//                 headerName: "R&D",
//                 type: "boolean",
//                 width: 80,
//                 // disableColumnMenu: true,
//             },
//         ];

//         const exceptions = [
//             "__v",
//             "id",
//             "no",
//             "name",
//             "description",
//             "cost",
//             "salesApproved",
//             "engineeringApproved",
//             "totalQoh",
//             "usedInLastQuarter",
//             "resellCost",
//             "filters",
//             "fields",
//             "prefVendor",
//             "location",
//             "rndOnly",
//             "nonInventoryItem",
//             "obsolete",
//             "uom",
//             "qohVal",
//             "fifo",
//             "qtyAllocated",
//             "qtyRemain",
//             "qtyOnOrder",
//             "vendorPartNumber",
//         ];
//         if (items && items.result && items.result.length > 0) {
//             const fieldNames = fields ? fields.map((f: any) => f.name) : [];
//             const filterNames = clusters ? clusters.map((f: any) => f.name) : [];
//             for (let f of Object.keys(items.result[0])) {
//                 if (!exceptions.includes(f)) {
//                     if (filterNames.includes(f)) {
//                         res.splice(3, 0, { field: f, headerName: f, width: 120 });
//                     } else if (fieldNames.includes(f)) {
//                         res.splice(3, 0, { field: f, headerName: splitLevelName(f), width: 120 });
//                     } else {
//                         res.push({ field: f, headerName: f, hide: true });
//                     }
//                 }
//             }
//         }

//         res = res.map((r) => ({ ...r, disableColumnMenu: true }));

//         return res;
//     }, [items, fields, clusters]);

//     const handleChangeFilter = (f: GridFilterModelParams) => {
//         const { columnField, value, operatorValue } = f.filterModel.items[0];

//         if (columnField) {
//             setFilters({
//                 [`${operatorValue === "contains" ? "contain" : ""}${columnField}`]: value,
//             });
//         } else if (columnField && !value) {
//             setFilters({});
//         }
//     };

//     const handleSortChange = (s: GridSortModelParams): void => {
//         if (s.sortModel[0]) {
//             const { field, sort } = s.sortModel[0];
//             if (!field || !sort) {
//                 return;
//             }

//             setSort({ sort: field, order: sort === "desc" ? "DESC" : "ASC" });
//         } else {
//             setSort({});
//         }
//     };

//     return (
//         <Box height="77vh" flex={1}>
//             <DataGrid
//                 density="compact"
//                 loading={loading}
//                 className={dataGridClasses.root}
//                 onRowSelected={onRowSelected}
//                 pagination
//                 page={page}
//                 pageSize={25}
//                 rowCount={items ? items.total : 0}
//                 filterMode="server"
//                 paginationMode="server"
//                 sortingMode="server"
//                 onSortModelChange={handleSortChange}
//                 onPageChange={(p) => setPage(p.page)}
//                 onPageSizeChange={(ps) => setLimit(ps.pageSize)}
//                 onFilterModelChange={handleChangeFilter}
//                 rows={items ? items.result : []}
//                 columns={gridColumns}
//                 components={{ Toolbar: GridToolbar }}
//             />
//         </Box>
//     );
// }
// const columns = [
//     { name: "name", header: "Name", minWidth: 50, defaultFlex: 2 },
//     { name: "no", header: "NO.", maxWidth: 1000, defaultFlex: 1 },
// ];

// const defaultFilterValue = [
//     { name: "name", type: "string", operator: "startsWith", value: undefined },
//     { name: "no", type: "string", operator: "startsWith", value: undefined },
//     {
//         name: "description",
//         type: "string",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "salesApproved",
//         type: "boolean",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "engineeringApproved",
//         type: "boolean",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "shippingApproved",
//         type: "boolean",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "prefVendor",
//         type: "boolean",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "vendorPartNumber",
//         type: "string",
//         operator: "contains",
//         value: undefined,
//     },
//     { name: "cost", type: "string", operator: "contains", value: undefined },
//     { name: "location", type: "string", operator: "contains", value: undefined },
//     { name: "qtyOnHand", type: "string", operator: "contains", value: undefined },
//     { name: "qtyRemain", type: "string", operator: "contains", value: undefined },
//     {
//         name: "qtyOnOrder",
//         type: "string",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "qtyAllocated",
//         type: "string",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "usedInLastQuarter",
//         type: "string",
//         operator: "contains",
//         value: undefined,
//     },
//     { name: "fifo", type: "string", operator: "contains", value: undefined },
//     {
//         name: "qohVal",
//         type: "number",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "uom",
//         type: "string",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "obsolete",
//         type: "boolean",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "nonInventoryItem",
//         type: "boolean",
//         operator: "contains",
//         value: undefined,
//     },
//     {
//         name: "rndOnly",
//         type: "boolean",
//         operator: "contains",
//         value: undefined,
//     },
// ];

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
        let res = columns.map(({ name, type }) => ({
            name,
            type: type ? type : "string",
            operator: type === "boolean" ? "eq" : "startsWith",
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
            let params: any = { device: false };
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
