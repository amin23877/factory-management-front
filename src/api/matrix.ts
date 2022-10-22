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
  device?: IItem & { recs?: any[] };
  [key: string]: string | number | boolean | IItem | undefined;
};

export type IMatrix = IMatrixRow[];

export const getMatrix = (productFamily: string) => {
  return get(`/matrice/${productFamily}`);
};

export const postMatrixData = (changes: any) => {
  return post(`/matrice/all`, changes);
};

export const renameMatrixPart = (formerName: string, newName: string) => {
  return patch("/matrice/rename", { formerName, newName });
};
