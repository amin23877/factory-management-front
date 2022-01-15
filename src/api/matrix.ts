import { get, patch, post } from ".";
import { IItem } from "./items";

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

export type IMatrixRow = {
    device?: IItem;
    [key: string]: string | number | boolean | IItem | undefined;
};

export type IMatrix = IMatrixRow[];

export const getMatrix = (productFamily: string, levels?: string[]) => {
    return get(`/matrice?productfamily=${productFamily}`);
};

export const postMatrixData = (productFamily: string, lines: any) => {
    return post(`/matrice?productfamily=${productFamily}`, lines);
};

export const renameMatrixPart = (formerName: string, newName: string) => {
    return patch("/matrice/rename", { formerName, newName });
};
