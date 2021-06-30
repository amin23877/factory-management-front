import Axios from "axios";

export interface IUBom {
    no: string,
    name: string,
    note: string,
    date: number
}

export interface IBomRecord {
    revision: string,
    usage: number,
    fixedQty: boolean,
    index: number,
    ItemId: string
}

export const getUBom = async (UnitId: string) => {
    try {
        const resp = await Axios.get(`/ubom`, { params: { UnitId } });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const getUBomRecord = async (UBOMId: string) => {
    try {
        const resp = await Axios.get(`/bomrecord`, { params: { UBOMId } });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const addUBom = async (UnitId: string, { no, name, note, date }: IUBom) => {
    try {
        const resp = await Axios.post(`/ubom`, { UnitId, no, name, note, date });
        return resp.data;
    } catch (e) {
        console.log(e.response)
    }
}

export const updateUBom = async (UnitId: string, { no, name, note, date }: IUBom) => {
    try {
        const resp = await Axios.patch(`/ubom/${UnitId}`, { no, name, note, date });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteUBom = async (UnitId: string) => {
    try {
        const resp = await Axios.delete(`/ubom/${UnitId}`);
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}


export const addUBomRecord = async (bomId: string, { revision, usage, fixedQty, index, ItemId }: IBomRecord) => {
    try {
        const resp = await Axios.post(`/ubom/${bomId}/record`, { revision, usage, fixedQty, index, ItemId, BOMId: bomId });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const updateUBomRecord = async (id: string, { revision, usage, fixedQty, index }: IBomRecord) => {
    try {
        const resp = await Axios.patch(`/bomrecord/${id}`, { revision, usage, fixedQty, index });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteUBomRecord = async (BRId: string) => {
    try {
        const resp = await Axios.delete(`/bomrecord/${BRId}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
}
