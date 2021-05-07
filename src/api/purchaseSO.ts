import Axios from "axios";

import {ILineItem} from './lineItem';

export type IPurchaseSO = {
    id?: string;
    file?: any;
    number: string;
    path?: string;
    requester: string;
    VendorId: string;
    ContactId: string;
    EmployeeId: string;
    estimatedObtainDate: string;
    status: string;
    obtained: boolean;
};

export const getPurchaseSOs = async () => {
    try {
        const resp = await Axios.get("/purchaseSo");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createPurchaseSO = async (data: IPurchaseSO) => {
    try {
        const formData = new FormData();
        data.file && formData.append("file", data.file);
        data.requester && formData.append("requester", String(data.requester));
        data.VendorId && formData.append("VendorId", String(data.VendorId));
        data.ContactId && formData.append("ContactId", String(data.ContactId));
        data.estimatedObtainDate && formData.append("estimatedObtainDate", String(data.estimatedObtainDate));
        data.status && formData.append("status", String(data.status));
        data.obtained && formData.append("obtained", String(data.obtained));

        const resp = await Axios.post(`/purchaseSo`, formData);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updatePurchaseSO = async (id: string, data: IPurchaseSO) => {
    try {
        const resp = await Axios.patch(`/purchaseSo/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deletePurchaseSO = async (id: string) => {
    try {
        const resp = await Axios.delete(`/purchaseSo/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getPurchaseSOLines = async (PurchaseSOId: string) => {
    try {
        const resp = await Axios.get(`/line`, { params: { PurchaseSOId } });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createPurchaseSOLine = async (id: string, data: ILineItem) => {
    try {
        const resp = await Axios.post(`/purchaseSo/${id}/line`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updatePurchaseSOLine = async (id: string, data: ILineItem) => {
    try {
        const resp = await Axios.patch(`/line/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deletePurchaseSOLine = async (id: string) => {
    try {
        const resp = await Axios.delete(`/line/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
