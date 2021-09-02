import { get, patch, post, delete_ } from ".";

import { ICustomer } from "./customer";
import { ILineItem } from "./lineItem";
import { ILineService } from "./lineService";
export interface ISO {
    id: string;
    number: string;

    repOrAgency: string;
    location: string;
    freightTerms: string;
    paymentTerms: string;
    carrier: string;
    QuoteId: string;
    issuedBy?: string;
    status: string;
    createdAt: number;

    estimatedShipDate: string;
    actualShipDate: string;
    DivisionId: string;
    noTaxClient: boolean;
    department: string;

    expodate: boolean;
    shippingAddress?: string;
    shippingContact?: string;
    shippingPhone?: string;
    shippingEmail?: string;
    shippingEntitiy: string;

    billingContact?: string;
    billingPhone?: string;
    billingEmail?: string;
    billingAddress?: string;
    billingEntitiy: string;

    agency?: string;
    requester?: string;
    ClientId?: ICustomer;
    ProjectId?: string;

    totalAmount?: number;
}
export interface ISOComplete extends ISO {
    lines: ILineItem[];
    lineServices: ILineService[];
}

export const getSO = () => {
    return get(`/so`);
};

export const createSO = (data: ISO) => {
    return post("/so", {
        ...data,
        estimatedShipDate: data.estimatedShipDate === "" ? null : new Date(data.estimatedShipDate).getTime(),
        actualShipDate: data.actualShipDate === "" ? null : new Date(data.actualShipDate).getTime(),
    });
};
export const createSOComplete = (data: ISOComplete) => {
    return post("/so", {
        ...data,
        estimatedShipDate: data.estimatedShipDate === "" ? null : new Date(data.estimatedShipDate).getTime(),
        actualShipDate: data.actualShipDate === "" ? null : new Date(data.actualShipDate).getTime(),
    });
};

export const editSO = (id: string, data: ISO) => {
    return patch(`/so/${id}`, {
        ...data,
        estimatedShipDate: data.estimatedShipDate === "" ? null : new Date(data.estimatedShipDate).getTime(),
        actualShipDate: data.actualShipDate === "" ? null : new Date(data.actualShipDate).getTime(),
    });
};

export const deleteSO = (id: string) => {
    return delete_(`/so/${id}`);
};

export const createLineItem = (soId: string, data: ILineItem) => {
    return post(`/so/${soId}/lineitem`, data);
};

export const editLineItem = (id: string, data: ILineItem) => {
    return patch(`/lineitem/${id}`, data);
};

export const deleteLineItem = (id: string) => {
    return delete_(`/lineitem/${id}`);
};

export const getLineItems = (SOId: string) => {
    return get(`/lineitem`, { params: { SOId } });
};

export const createSOLineService = (soId: string, data: ILineService) => {
    return post(`/so/${soId}/lineservice`, data);
};

export const editSOLineService = (id: string, data: ILineService) => {
    return patch(`/lineservice/${id}`, data);
};

export const deleteSOLineService = (id: string) => {
    return delete_(`/lineservice/${id}`);
};

export const getSOLineServices = (SOId: string) => {
    return get(`/lineservice`, { params: { SOId } });
};
