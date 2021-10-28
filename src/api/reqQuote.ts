import { delete_ } from ".";
import { ICustomer } from "./customer";
import { IEmployee } from "./employee";
import { IItem } from "./items";

import { ILineItem } from "./lineItem";
import { ILineService } from "./lineService";
import { IQuote } from "./quote";

export interface IReqQuote {
    id: string;
    number: string;
    relatedNumber: string;
    SOId: any;
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
    QuoteId: any;
    devices: IItem[];

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
    date: number;
    updatedAt: number;
    totalAmount: number;
    lineItemRecords: ILineItem[];
    lineServiceRecords: ILineService[];
    __v: number;
}

export interface IReqQuoteComplete extends IReqQuote {
    lines: ILineItem[];
    lineServices: ILineService[];
}

export interface IQuoteRequest {
    QuoteId: IQuote;
    number: string;
    repOrAgency: ICustomer;
    client: string;
    requesterName: string;
    requesterMail: string;
    requesterPhone: string;
    requesterCompany: string;
    requesterAddress: string;
    requesterCity: string;
    requesterState: string;
    requesterZipcode: string;
    note: string;
    devices: { number: IItem; quantity: number }[];
}

export const deleteRequestQuote = async (id: string) => {
    return delete_(`/quoterequest/${id}`);
};
