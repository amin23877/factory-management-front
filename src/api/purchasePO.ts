import Axios from "axios";

import {ILineItem} from './lineItem'

export type IPurchasePO = {
    id?: string;
    number: string;
    requester: string;
    VendorId: string;
    ContactId: string;
    EmployeeId: string;
    status: string;
    createdAt?: string;
};


export interface IPurchasePOComplete extends IPurchasePO {
    lines: ILineItem[];
}

export const getPurchasePOs = async () => {
    try {
        const resp = await Axios.get("/purchasePo");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createPurchasePOComplete = async (data: IPurchasePOComplete) => {
    try {
        const resp = await Axios.post("/purchasePO", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createPurchasePO = async (data: IPurchasePO) => {
    try {
        const resp = await Axios.post(`/purchasePo`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updatePurchasePO = async (id: string, data: IPurchasePO) => {
    try {
        const resp = await Axios.patch(`/purchasePo/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deletePurchasePO = async (id: string) => {
    try {
        const resp = await Axios.delete(`/purchasePo/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getPurchasePOLines = async (PurchasePOId: string) => {
    try {
        const resp = await Axios.get(`/lineitem`, { params: { PurchasePOId } });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createPurchasePOLine = async (id: string, data: ILineItem) => {
    try {
        const resp = await Axios.post(`/purchasePo/${id}/lineitem`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updatePurchasePOLine = async (id: string, data: ILineItem) => {
    try {
        const resp = await Axios.patch(`/lineitem/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deletePurchasePOLine = async (id: string) => {
    try {
        const resp = await Axios.delete(`/lineitem/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
