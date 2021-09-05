import { get, patch, post, delete_ } from ".";

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
    ProjectId: any;
    location: string;
    leadTime: string;
    note: string;
    status: string;
    repOrAgency: ICustomer;
    requesterName: string;
    requesterMail: string;
    requesterPhone: string;
    client: ICustomer;
    unitPricingLevel: string;
    estimatedShipDate: number;
    TicketId: number;
    QuoteRequestId?: any;
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

export const createQuoteLineService = (quoteId: string, data: ILineService) => {
    return post(`/quote/${quoteId}/lineservice`, data);
};

export const editQuoteLineService = (id: string, data: ILineService) => {
    return patch(`/lineservice/${id}`, data);
};

export const deleteQuoteLineService = (id: string) => {
    return delete_(`/lineservice/${id}`);
};

export const getQuoteLineServices = (quoteId: string) => {
    return get(`/lineservice`, { params: { quoteId } });
};

export const createLineItem = (qId: string, data: ILineItem) => {
    return post(`/quote/${qId}/lineitem`, data);
};

export const editLineItem = (id: string, data: ILineItem) => {
    return patch(`/lineitem/${id}`, data);
};

export const deleteLineItem = (id: string) => {
    return delete_(`/lineitem/${id}`);
};

export const getLineItems = (quoteId: string) => {
    return get(`/lineitem`, { params: { QuoteId: quoteId } });
};

export const getQuotes = () => {
    return get("/quote");
};

export const getQuoteById = (id: string) => {
    return get(`/quote/${id}`);
};

export const createQuote = (data: IQuote) => {
    return post("/quote", data);
};
export const createQuoteComplete = (data: any) => {
    return post("/quote", data);
};

export const updateQuote = (id: string, data: IQuote) => {
    return patch(`/quote/${id}`, data);
};

export const deleteQuote = (id: string) => {
    return delete_(`/quote/${id}`);
};
