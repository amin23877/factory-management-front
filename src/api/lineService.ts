import Axios from "axios";

export interface ILineService {
    id?: string;
    ServiceId: string;
    description: string;
    quantity: number;
    price: number;
    tax: boolean;
    LineItemRecordId: string;
}

export const getSOLineServices = async (SOId: string) => {
    try {
        const resp = await Axios.get("/lineservice", { params: { SOId } });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getQuoteLineServices = async (QuoteId: string) => {
    try {
        const resp = await Axios.get("/lineservice", { params: { QuoteId } });
        return resp.data;
    } catch (error) {
        throw error;
    }
};
