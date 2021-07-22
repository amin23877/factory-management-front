import { GridColumns } from "@material-ui/data-grid";

import { splitLevelName } from "./levels";

export const splitColumnNames = (columns: GridColumns) => {
    const temp = [...columns];
    temp.map((c) => (c.headerName = splitLevelName(c.headerName ? c.headerName : c.field)));
    return temp;
};
export const generateRows = (tableData: any[], productFamily: string) => {
    return tableData.map((item, i) => {
        const levels = item.row;

        const parts = item.data.reduce((obj: any, part: any) => {
            return { ...obj, [part.name || ""]: part.partNumber } as any;
        }, {});

        return { id: i, ...levels, ...parts, "Product family": productFamily };
    });
};

export const generateDatagridColumns = (tableData: any[], productFamily: string) => {
    const dtCols: any[] = [];
    const cols = extractColumns(tableData, productFamily);

    cols.forEach((c: any) => c !== "Product family" && dtCols.push({ field: c, flex: 1, sortable: false }));

    dtCols[0].hide = true;
    dtCols.unshift({ field: "Product family", flex: 1, sortable: false });
    dtCols.unshift({ field: "name", flex: 1, sortable: false });

    return dtCols;
};

export const extractColumns = (tableData: any[], productFamily: string) => {
    const rows = generateRows(tableData, productFamily);

    const cols = new Set();
    rows.forEach((r) => Object.keys(r).map((k) => cols.add(k)));

    return cols;
};

export const extractLevels = (tableData: any[]) => {
    const levels = new Set<string>();

    const rows = tableData.map((item) => ({ ...item.row }));

    rows.map((r) => Object.keys(r).map((k) => levels.add(k)));
    return Array.from(levels);
};

export const extractPartNames = (tableData: any[]) => {
    const parts = new Set<string>();

    const datas = tableData.map((item) => ({ ...item.data }));
    
    datas.map((r) => Object.keys(r).map((k) => parts.add(k)));
    return Array.from(parts);    
}