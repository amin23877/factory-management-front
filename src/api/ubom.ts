import {get, post, patch, delete_ } from ".";

export interface IUBom {
    no: string;
    name: string;
    note: string;
    date: number;
}

export interface IBomRecord {
    revision: string;
    usage: number;
    fixedQty: boolean;
    index: number;
    ItemId: string;
}

export const getUBom = (UnitId: string) => {
    return get(`/ubom`, { params: { UnitId } });
};

export const getUBomRecord = (UBOMId: string) => {
    return get(`/bomrecord`, { params: { UBOMId } });
};

export const addUBom = (UnitId: string, { no, name, note, date }: IUBom) => {
    return post(`/ubom`, { UnitId, no, name, note, date });
};

export const updateUBom = (UnitId: string, { no, name, note, date }: IUBom) => {
    return patch(`/ubom/${UnitId}`, { no, name, note, date });
};

export const deleteUBom = (UnitId: string) => {
    return delete_(`/ubom/${UnitId}`);
};

export const addUBomRecord = (bomId: string, { revision, usage, fixedQty, index, ItemId }: IBomRecord) => {
    return post(`/ubom/${bomId}/record`, { revision, usage, fixedQty, index, ItemId, BOMId: bomId });
};

export const updateUBomRecord = (id: string, { revision, usage, fixedQty, index }: IBomRecord) => {
    return patch(`/bomrecord/${id}`, { revision, usage, fixedQty, index });
};

export const deleteUBomRecord = (BRId: string) => {
    return delete_(`/bomrecord/${BRId}`);
};
