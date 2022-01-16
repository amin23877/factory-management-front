import { GridColumns } from "@material-ui/data-grid";
import { IMatrix } from "../api/matrix";

import { splitLevelName } from "./levels";

export const splitColumnNames = (columns: GridColumns) => {
    const temp = [...columns];
    temp.map((c) => (c.headerName = splitLevelName(c.headerName ? c.headerName : c.field)));
    return temp;
};

export const generateRows = ({ levels, tableData }: { tableData: IMatrix; levels: string[] }) => {
    return tableData.map((td, i) => {
        let tdLevels: any = {},
            tdParts: any = [],
            parts: any = [];
        levels.forEach((l) => {
            tdLevels[l] = td[l];
        });
        parts = td.device?.recs ? td.device.recs.map((rec, j) => ({ ...rec, name: `Part-${j}` })) : [];
        parts.forEach((p: any) => {
            tdParts[p.name] = p;
        });

        return { id: i, ...tdLevels, ...tdParts, "Device Number": td.device?.no };
    });
};

export const generateDataGridColumns = (columns: string[]) => {
    const dtCols: any = [];

    columns.forEach((c) => {
        if (c.search("Part") > -1) {
            dtCols.push({
                name: c,
                render: ({ data }: any) => data[c]?.ItemId.no,
                minWidth: 100,
                editable: false,
                disableColumnMenu: true,
            });
        } else {
            dtCols.push({
                name: c,
                minWidth: 150,
                editable: false,
                disableColumnMenu: true,
            });
        }
    });

    return dtCols;
};

export const extractColumns = ({ tableData, levels }: { tableData: IMatrix; levels?: string[] }) => {
    const cols = new Set<string>();
    cols.add("Device Number");
    if (levels) {
        levels.forEach((l) => cols.add(l));
    }
    const hasDevice = tableData.filter((td) => td.device);
    hasDevice.forEach((td) => {
        td.device?.recs?.forEach((rec, i) => {
            cols.add(`Part-${i}`);
        });
    });

    return Array.from(cols);
};

export const extractLevels = (tableData: IMatrix) => {
    const levels = new Set<string>();
    Object.keys(tableData[0]).forEach((k) => k !== "device" && levels.add(k));

    return Array.from(levels);
};

export const extractPartNames = (tableData: any[]) => {
    const parts = new Set<string>();

    const datas = tableData.map((item) => ({ ...item.recs }));
    // const datas = tableData.map((item) => ({ ...item.data }));

    datas.forEach((data: any) => Object.keys(data).forEach((r: any) => parts.add(data[r].name)));
    return Array.from(parts);
};
