import { delete_, get, patch, post } from ".";
import { IItem } from "./items";

export interface IBom {
    id?: string;
    no: string;
    name: string;
    note: string;
    current: boolean;
    ItemId: IItem;
    items: number;
    date: number;
    updatedAt: number;
}

export interface IBomRecord {
    id: string;
    revision: string;
    usage: number;
    fixedQty: boolean;
    index: number;
    ItemId: IItem;
    BOMId: string;
    date: number;
    updatedAt: number;
    uom: string;
    location: string;
}

export const getBom = (ItemId: string) => {
    return get(`/bom`, { params: { ItemId } });
};

export const addBom = (ItemId: string, { no, name, note, current }: IBom) => {
    return post(`/bom`, { ItemId, no, name, note, current });
};

export const updateBom = (itemId: string, { no, name, note, current }: IBom) => {
    return patch(`/bom/${itemId}`, { no, name, note, current });
};

export const deleteBom = (itemId: string) => {
    return delete_(`/bom/${itemId}`);
};

export const getBomRecord = (BOMId: string) => {
    return get(`/bomrecord`, { params: { BOMId } });
};

export const addBomRecord = (bomId: string, { revision, usage, fixedQty, index, ItemId }: IBomRecord) => {
    return post(`/bom/${bomId}/record`, { revision, usage, fixedQty, index, ItemId, BOMId: bomId });
};

export const updateBomRecord = (id: string, { revision, usage, fixedQty, index }: IBomRecord) => {
    return patch(`/bomrecord/${id}`, { revision, usage, fixedQty, index });
};

export const deleteBomRecord = (BRId: string) => {
    return delete_(`/bomrecord/${BRId}`);
};
