import Axios from 'axios';

export type IPurchaseQuote = {
    id?: string,
    file?: File | null,
    number?: string,
    senderNumber?: string,
    path?: string,
    requester: string,
    VendorId: string,
    ContactId: string,
    EmployeeId?: string
}

export const getPurchaseQuotes = async () => {
    try {
        const resp = await Axios.get('/purchaseQuote');
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const createPurchaseQuote = async (data:IPurchaseQuote) => {
    try {
        const formData = new FormData();
        data.file && formData.append('file', data.file);
        data.requester && formData.append('requester', String(data.requester));
        data.VendorId && formData.append('VendorId', String(data.VendorId));
        data.ContactId && formData.append('ContactId', String(data.ContactId));        

        const resp = await Axios.post('/purchaseQuote', formData);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const updatePurchaseQuote = async (id:string, data:IPurchaseQuote) => {
    try {
        const resp = await Axios.patch(`/purchaseQuote/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const deletePurchaseQuote = async (id:string) => {
    try {
        const resp = await Axios.delete(`/purchaseQuote/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}