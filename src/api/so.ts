import Axios from "axios";

export interface ISO {
    id?: string;
    number: string;
    frieghtTerms: string;
    paymentTerms: string;
    carrier: string;
    QuoteId: string;
    issuedBy?: string;
    status: string;

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

export interface ILineItem {
    id?: string;
    SoId?: string;
    ItemId: string;
    index: number;
    description: string;
    quantity: number;
    price: number;
    tax: boolean;
}

export const SOInit: any = {};
export const LineItemInit: any = {};

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
        const resp = await Axios.post(`/so/${soId}/line`, data);
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

export const getLineItems = async (SOId: string) => {
    try {
        const resp = await Axios.get(`/line`, { params: { SOId } });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
