import Axios from "axios";
import { post } from ".";

import { ILineItem } from "./lineItem";
import { ILineService } from "./lineService";

export type IPurchasePO = {
    id?: string;
    number: string;
    requester: string;
    VendorId: string;
    ContactId: string;
    EmployeeId: string;
    status: string;
    createdAt?: string;
    note?: string;
};

export interface IPurchasePOComplete extends IPurchasePO {
    lines: ILineItem[];
    lineServices: ILineService[];
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

export const acknowledgePurchasePO = (poId: string) => {
    return post(`/purchasepo/${poId}/acknowledge`, {});
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
