import Axios from "axios";

export interface IBom {
    no: string,
    name: string,
    note: string,
    current: boolean
}

export interface IBomRecord {
    revision: string,
    usage: number,
    fixedQty: boolean,
    index:number,
    itemId: number
}

export const getBom = async (ItemId:number) => {
    try {
        const resp = await Axios.get(`/bom`, {params:{ItemId}});
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const addBom = async (ItemId:number, {no, name, note, current}:IBom) => {
    try {
        const resp = await Axios.post(`/bom`, {ItemId, no, name, note, current});
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const updateBom = async (itemId:number, {no, name, note, current}:IBom) => {
    try {
        const resp = await Axios.patch(`/bom/${itemId}`, {no, name, note, current});
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteBom = async (itemId:number) => {
    try {
        const resp = await Axios.delete(`/bom/${itemId}`);
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const getBomRecord = async (BOMId:number) => {
    try {
        const resp = await Axios.get(`/bomrecord`, {params:{BOMId}});
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const addBomRecord = async (bomId:number, {revision, usage, fixedQty, index, itemId}:IBomRecord) => {
    try {
        const resp = await Axios.post(`/bom/${bomId}/record`, {revision, usage, fixedQty, index, ItemId:itemId, BOMId:bomId});
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const updateBomRecord = async (id:number, {revision, usage, fixedQty, index}:IBomRecord) => {
    try {
        const resp = await Axios.patch(`/bomrecord/${id}`, {revision, usage, fixedQty, index});
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteBomRecord = async (BRId:number) => {
    try {
        const resp = await Axios.delete(`/bomrecord/${BRId}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
}
