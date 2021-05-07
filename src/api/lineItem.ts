import Axios from 'axios';

export interface ILineItem {
    SoId?: string;
    QuoteId?: string;
    
    id?: string;
    ItemId: string;
    index: number;
    description: string;
    quantity: number;
    price: number;
    tax: boolean;
}

export const getALineItem = async (id:string) => {
    try {
        const resp = await Axios.get(`/line/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}