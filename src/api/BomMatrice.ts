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
