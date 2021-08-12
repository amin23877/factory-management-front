import Axios from "axios";

import { ILineItem } from "./lineItem";
import { ILineService } from "./lineService";

export interface ISO {
    id?: string;
    number: string;
    freightTerms: string;
    paymentTerms: string;
    carrier: string;
    QuoteId: string;
    issuedBy?: string;
    status: string;
    createdAt: number;

    estShipDate: string;
    actShipDate: string;
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
    ClientId?: string;
    ProjectId?: string;
}

export interface ISOComplete extends ISO {
    lines: ILineItem[];
    lineServices: ILineService[]
}

export const getSO = async () => {
    try {
        const resp = await Axios.get(`/so`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createSO = async (data: ISO) => {
    try {
        const resp = await Axios.post("/so", {
            ...data,
            estShipDate: data.estShipDate === "" ? null : new Date(data.estShipDate).toISOString(),
            actShipDate: data.actShipDate === "" ? null : new Date(data.actShipDate).toISOString(),
        });
        return resp.data;
    } catch (error) {
        throw error;
    }
};
export const createSOComplete = async (data: ISOComplete) => {
    try {
        const resp = await Axios.post("/so", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const editSO = async (id: string, data: ISO) => {
    try {
        const resp = await Axios.patch(`/so/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteSO = async (id: string) => {
    try {
        const resp = await Axios.delete(`/so/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createLineItem = async (soId: string, data: ILineItem) => {
    try {
        const resp = await Axios.post(`/so/${soId}/lineitem`, data);
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

export const getLineItems = async (SOId: string) => {
    try {
        const resp = await Axios.get(`/lineitem`, { params: { SOId } });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const createSOLineService = async (soId: string, data: ILineService) => {
    try {
        const resp = await Axios.post(`/so/${soId}/lineservice`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editSOLineService = async (id: string, data: ILineService) => {
    try {
        const resp = await Axios.patch(`/lineservice/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteSOLineService = async (id: string) => {
    try {
        const resp = await Axios.delete(`/lineservice/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSOLineServices = async (SOId: string) => {
    try {
        const resp = await Axios.get(`/lineservice`, { params: { SOId } });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
