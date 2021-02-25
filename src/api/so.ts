import Axios from "axios";

export interface ISO {
    id?: number;
    number: string;
    location: string;
    leadTime: string;
    frieghtTerms: string;
    paymentTerms: string;
    carrier: string;
    quotenumber: string;
    issuedBy?: number;
    status: string;

    estShipDate: string;
    actShipDate: string;

    expodate: boolean;
    shippingAddress?: number;
    shippingContact?: number;
    shippingPhone?: number;
    shippingEmail?: number;
    shippingEntitiy: string;

    billingContact?: number;
    billingPhone?: number;
    billingEmail?: number;
    billingAddress?: number;
    billingEntitiy: string;

    agency?: number;
    requester?: number;
    ClientId?: number;
    ProjectId?: number;
}

export const SOInit: ISO = {
    number: "",
    quotenumber: "",
    location: "",
    leadTime: "",
    frieghtTerms: "",
    paymentTerms: "",
    carrier: "",
    issuedBy: undefined,
    status: "",
    expodate: false,

    estShipDate: "",
    actShipDate: "",
    shippingAddress: undefined,
    shippingContact: undefined,
    shippingPhone: undefined,
    shippingEmail: undefined,
    shippingEntitiy: "",

    billingContact: undefined,
    billingPhone: undefined,
    billingEmail: undefined,
    billingAddress: undefined,
    billingEntitiy: "",

    agency: undefined,
    requester: undefined,
    ClientId: undefined,
    ProjectId: undefined,
};

export interface ILineItem {
    id?: number;
    SoId?: number;
    index: number;
    ItemId: number;
    description: string;
    quantity: number;
    price: number;
    tax: boolean;
}

export const LineItemInit: ILineItem = {
    index: 0,
    ItemId: 0,
    description: "",
    quantity: 0,
    price: 0,
    tax: false,
};

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

export const editSO = async (id: number, data: ISO) => {
    try {
        const resp = await Axios.patch(`/so/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteSO = async (id: number) => {
    try {
        const resp = await Axios.delete(`/so/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createLineItem = async (soId: number, data: ILineItem) => {
    try {
        const resp = await Axios.post(`/so/${soId}/line`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editLineItem = async (id: number, data: ILineItem) => {
    try {
        const resp = await Axios.patch(`/line/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteLineItem = async (id: number) => {
    try {
        const resp = await Axios.delete(`/line/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getLineItems = async (SOId: number) => {
    try {
        const resp = await Axios.get(`/line`, { params: { SOId } });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
