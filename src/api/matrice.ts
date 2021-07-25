import { get, patch, post } from ".";

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

export const getMatrice = (productFamily: string, levels?: string[]) => {
      return get(`/matrice?productfamily=${productFamily}`);
       
};

export const postMatriceData =  (productFamily: string, lines: any) => {
    return post(`/matrice?productfamily=${productFamily}`, lines);
        
};

export const renameMatricePart = (formerName: string, newName: string) => {
    return patch("/matrice/rename", { formerName, newName });
};
