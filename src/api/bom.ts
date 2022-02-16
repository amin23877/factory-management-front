import { delete_, get, patch, post } from ".";
import { IItem } from "./items";

export interface IBom {
  id: string;
  no: string;
  name: string;
  notes: string;
  current: boolean;
  ItemId: IItem;
}

export interface IBomRecord {
  id: string;
  BOMId: string;
  ItemId: string;
  ItemNo: string;
  ItemName: string;
  usage: number;
  fixedQty: boolean;
}

export const getBom = (ItemId: string) => {
  return get(`/bom`, { params: { ItemId } });
};

export const addBom = (data: IBom) => {
  return post(`/bom`, data);
};

export const updateBom = (id: string, data: Partial<IBom>) => {
  return patch(`/bom/${id}`, data);
};

export const deleteBom = (itemId: string) => {
  return delete_(`/bom/${itemId}`);
};

export const getBomRecord = (BOMId: string) => {
  return get(`/bomrecord`, { params: { BOMId } });
};

export const addBomRecord = (data: IBomRecord) => {
  return post(`/bomrecord`, data);
};

export const updateBomRecord = (id: string, data: Partial<IBomRecord>) => {
  return patch(`/bomrecord/${id}`, data);
};

export const deleteBomRecord = (BRId: string) => {
  return delete_(`/bomrecord/${BRId}`);
};
