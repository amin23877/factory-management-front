import Axios from "axios";

import {ILineItem} from './lineItem';

export interface IQuote {
    id?: string;
    number?: string;

    entryDate: string;
    expireDate: string;

    salesperson: number | null;
    requester: number | null;
    client: number | null;

    status: string;

    frieghtTerms: string;
    paymentTerms: string;

    depositRequired: boolean;
    deposit: number | null;
    depositAmount: number | null;

    estimatedShipDate: string;
    commissionLabel: string;

    regularCommission: number | null;
    overageCommission: number | null;

    EmployeeId: string | null;
    ProjectId: string | null;
}

export const createLineItem = async (qId: string, data: ILineItem) => {
    try {
        const resp = await Axios.post(`/quote/${qId}/line`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editLineItem = async (id: string, data: ILineItem) => {
    try {
        const resp = await Axios.patch(`/line/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteLineItem = async (id: string) => {
    try {
        const resp = await Axios.delete(`/line/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getLineItems = async (quoteId: string) => {
    try {
        const resp = await Axios.get(`/line`, { params: { QuoteId: quoteId } });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getQuotes = async () => {
    try {
        const resp = await Axios.get("/quote");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getQuoteById = async (id: string) => {
    try {
        const resp = await Axios.get(`/quote/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createQuote = async (data: IQuote) => {
    try {
        const resp = await Axios.post("/quote", {
            ...data,
            entryDate: data.entryDate === "" ? null : new Date(data.entryDate).toISOString(),
            expireDate: data.expireDate === "" ? null : new Date(data.expireDate).toISOString(),
            estimatedShipDate: data.estimatedShipDate === "" ? null : new Date(data.estimatedShipDate).toISOString(),
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateQuote = async (id: string, data: IQuote) => {
    try {
        const resp = await Axios.patch(`/quote/${id}`, {
            ...data,
            entryDate: data.entryDate === "" ? null : new Date(data.entryDate).toISOString(),
            expireDate: data.expireDate === "" ? null : new Date(data.expireDate).toISOString(),
            estimatedShipDate: data.estimatedShipDate === "" ? null : new Date(data.estimatedShipDate).toISOString(),
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteQuote = async (id: string) => {
    try {
        const resp = await Axios.delete(`/quote/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
