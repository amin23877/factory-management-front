import Axios from 'axios';

export type IPurchasePO = {
    id?: number,
    number: string,
    requester: number,
    VendorId: number,
    ContactId: number,
    EmployeeId: number,
    status: string
    createdAt?:string
}

export type IPurchasePOLine = {
    id?:number,
    ItemId: number,
    description: string,
    quantity: number,
    price: number,
    tax: boolean,
    index: number,
}

export interface IPurchasePOComplete extends IPurchasePO {
    lines:IPurchasePOLine[]
}

export const getPurchasePOs = async () => {
    try {
        const resp = await Axios.get('/purchasePo');
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const createPurchasePOComplete = async (data:IPurchasePOComplete) => {
    try {
        const resp = await Axios.post('/puchasePO/complete', data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const createPurchasePO = async (data:IPurchasePO) => {
    try {
        const resp = await Axios.post(`/purchasePo`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const updatePurchasePO = async (id:number, data:IPurchasePO) => {
    try {
        const resp = await Axios.patch(`/purchasePo/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const deletePurchasePO = async (id:number) => {
    try {
        const resp = await Axios.delete(`/purchasePo/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const getPurchasePOLines = async (PurchasePOId:number) => {
    try {
        const resp = await Axios.get(`/line`, {params:{PurchasePOId}});
        return resp.data;
    } catch (error) { 
        throw error;
    }
}

export const createPurchasePOLine = async (id:number,data:IPurchasePOLine) => {
    try {
        const resp = await Axios.post(`/purchasePo/${id}/line`, data);
        return resp.data;    
    } catch (error) {
        throw error;
    }
}

export const updatePurchasePOLine = async (id:number, data:IPurchasePOLine) => {
    try {
        const resp = await Axios.patch(`/line/${id}`, data);
        return resp.data;    
    } catch (error) {
        throw error;
    }
}

export const deletePurchasePOLine = async (id:number) => {
    try {
        const resp = await Axios.delete(`/line/${id}`);
        return resp.data;    
    } catch (error) {
        throw error;
    }
}
