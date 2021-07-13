import Axios from "axios";

export interface IRow {
    [key: string]: string;
}

export interface IPart {
    usage: number;
    fixedQty: boolean;
    id?: string;
    row: IRow;
    partNumber: number;
    name: string;
}

export type IMatriceRow = { row: IRow; data: IPart[] };

export type IMatrice = IMatriceRow[];

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

    return dtCols;
}

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

export const getMatrice = async (productFamily: string, levels?: string[]) => {
    try {
        const resp = await Axios.get(`/matrice?productfamily=${productFamily}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const postMatriceData = async (productFamily: string, lines: any) => {
    try {
        const resp = await Axios.post(`/matrice?productfamily=${productFamily}`, lines);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const renameMatricePart = async (formerName: string, newName: string) => {
    try {
        const resp = await Axios.patch("/matrice/rename", { formerName, newName });
        return resp.data;
    } catch (error) {
        throw error;
    }
};
