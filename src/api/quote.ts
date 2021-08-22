import Axios from "axios";
import { ICustomer } from "./customer";
import { IEmployee } from "./employee";

import { ILineItem } from "./lineItem";
import { ILineService } from "./lineService";

export interface IQuote {
    id: string;
    number: string;
    relatedNumber: string;
    SOId: string;
    entryDate: number;
    expireDate: number;
    ProjectId: string;
    location: string;
    leadTime: string;
    note: string;
    status: string;
    repOrAgency: ICustomer;
    requesterName: string;
    requesterMail: string;
    requesterPhone: string;
    client: string;
    unitPricingLevel: string;
    estimatedShipDate: number;
    TicketId: number;

    freightTerms: string;
    paymentTerms: string;
    depositRequired: boolean;
    deposit: number;
    depositAmount: number;
    commissionRate: string;
    regularCommission: number;
    overageCommission: number;
    salesperson: IEmployee;

    EmployeeId: IEmployee;
    createdAt: number;
    updatedAt: number;
    totalAmount: number;
    lineItemRecords: ILineItem[];
    lineServiceRecords: ILineService[];
    __v: number;
}

export interface IQuoteComplete extends IQuote {
    lines: ILineItem[];
    lineServices: ILineService[];
}

export const createQuoteLineService = async (quoteId: string, data: ILineService) => {
    try {
        const resp = await Axios.post(`/quote/${quoteId}/lineservice`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editQuoteLineService = async (id: string, data: ILineService) => {
    try {
        const resp = await Axios.patch(`/lineservice/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteQuoteLineService = async (id: string) => {
    try {
        const resp = await Axios.delete(`/lineservice/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getQuoteLineServices = async (quoteId: string) => {
    try {
        const resp = await Axios.get(`/lineservice`, { params: { quoteId } });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const createLineItem = async (qId: string, data: ILineItem) => {
    try {
        const resp = await Axios.post(`/quote/${qId}/lineitem`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editLineItem = async (id: string, data: ILineItem) => {
    try {
        const resp = await Axios.patch(`/lineitem/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteLineItem = async (id: string) => {
    try {
        const resp = await Axios.delete(`/lineitem/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getLineItems = async (quoteId: string) => {
    try {
        const resp = await Axios.get(`/lineitem`, { params: { QuoteId: quoteId } });
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
        const resp = await Axios.post("/quote", data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createQuoteComplete = async (data: any) => {
    try {
        const resp = await Axios.post("/quote", data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateQuote = async (id: string, data: IQuote) => {
    try {
        const resp = await Axios.patch(`/quote/${id}`, data);
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
