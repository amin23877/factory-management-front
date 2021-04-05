import Axios from 'axios';

export type IPurchaseSO = {
    id?: number,
    file?: any,
    number: number,
    path?: string,
    requester: number,
    VendorId: number,
    ContactId: number,
    EmployeeId: number,
    estimatedObtainDate: string,
    status: string,
    obtained: boolean
}

export type IPurchaseSOLine = {
    id?:number,
    ItemId: number,
    description: string,
    quantity: number,
    price: number,
    tax: boolean,
    index: number,
}

export const getPurchaseSOs = async () => {
    try {
        const resp = await Axios.get('/purchaseSo');
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const createPurchaseSO = async (data:IPurchaseSO) => {
    try {
        const formData = new FormData();
        data.file && formData.append('file', data.file);
        data.requester && formData.append('requester', String(data.requester));
        data.VendorId && formData.append('VendorId', String(data.VendorId));
        data.ContactId && formData.append('ContactId', String(data.ContactId));        
        data.estimatedObtainDate && formData.append('estimatedObtainDate', String(data.estimatedObtainDate));        
        data.status && formData.append('status', String(data.status));        
        data.obtained && formData.append('obtained', String(data.obtained));        

        const resp = await Axios.post(`/purchaseSo`, formData);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const updatePurchaseSO = async (id:number, data:IPurchaseSO) => {
    try {
        const resp = await Axios.patch(`/purchaseSo/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const deletePurchaseSO = async (id:number) => {
    try {
        const resp = await Axios.delete(`/purchaseSo/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const getPurchaseSOLines = async (PurchaseSOId:number) => {
    try {
        const resp = await Axios.get(`/line`, {params:{PurchaseSOId}});
        return resp.data;
    } catch (error) { 
        throw error;
    }
}

export const createPurchaseSOLine = async (id:number,data:IPurchaseSOLine) => {
    try {
        const resp = await Axios.post(`/purchaseSo/${id}/line`, data);
        return resp.data;    
    } catch (error) {
        throw error;
    }
}

export const updatePurchaseSOLine = async (id:number, data:IPurchaseSOLine) => {
    try {
        const resp = await Axios.patch(`/line/${id}`, data);
        return resp.data;    
    } catch (error) {
        throw error;
    }
}

export const deletePurchaseSOLine = async (id:number) => {
    try {
        const resp = await Axios.delete(`/line/${id}`);
        return resp.data;    
    } catch (error) {
        throw error;
    }
}
