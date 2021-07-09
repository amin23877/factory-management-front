import Axios from "axios";

export interface IBom {
    id?:string,
    no: string,
    name: string,
    note: string,
    current: boolean
}

export interface IBomRecord {
    revision: string,
    usage: number,
    fixedQty: boolean,
    index: number,
    ItemId: string
}

export const getBom = async (ItemId: string) => {
    try {
        const resp = await Axios.get(`/bom`, { params: { ItemId } });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const addBom = async (ItemId: string, { no, name, note, current }: IBom) => {
    try {
        const resp = await Axios.post(`/bom`, { ItemId, no, name, note, current });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const updateBom = async (itemId: string, { no, name, note, current }: IBom) => {
    try {
        const resp = await Axios.patch(`/bom/${itemId}`, { no, name, note, current });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteBom = async (itemId: string) => {
    try {
        const resp = await Axios.delete(`/bom/${itemId}`);
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const getBomRecord = async (BOMId: string) => {
    try {
        const resp = await Axios.get(`/bomrecord`, { params: { BOMId } });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const addBomRecord = async (bomId: string, { revision, usage, fixedQty, index, ItemId }: IBomRecord) => {
    try {
        const resp = await Axios.post(`/bom/${bomId}/record`, { revision, usage, fixedQty, index, ItemId, BOMId: bomId });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const updateBomRecord = async (id: string, { revision, usage, fixedQty, index }: IBomRecord) => {
    try {
        const resp = await Axios.patch(`/bomrecord/${id}`, { revision, usage, fixedQty, index });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteBomRecord = async (BRId: string) => {
    try {
        const resp = await Axios.delete(`/bomrecord/${BRId}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
}
