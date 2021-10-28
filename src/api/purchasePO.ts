import { get, delete_, patch, post } from ".";

import { ILineItem } from "./lineItem";
import { ILineService } from "./lineService";

export type IPurchasePO = {
    id?: string;
    number: string;
    requester: string;
    VendorId: string;
    ContactId: string;
    EmployeeId: string;
    status: string;
    date?: string;
    note?: string;
    billingAddressCompany?: string;
    billingAddressAttn?: string;
    billingAddressAddress?: string;
    billingAddressCity?: string;
    billingAddressState?: string;
    billingAddressZipCode?: string;
    billingAddressCountry?: string;
    billingAddressPhone?: string;
    billingAddressEmail?: string;
    shippingAddressCompany?: string;
    shippingAddressAttn?: string;
    shippingAddressAddress?: string;
    shippingAddressCity?: string;
    shippingAddressState?: string;
    shippingAddressZipCode?: string;
    shippingAddressCountry?: string;
    shippingAddressPhone?: string;
    shippingAddressEmail?: string;
};

export interface IPurchasePOComplete extends IPurchasePO {
    lines: ILineItem[];
    lineServices: ILineService[];
}

export const getPurchasePOs = () => {
    return get("/purchasePo");
};

export const createPurchasePOComplete = (data: IPurchasePOComplete) => {
    return post("/purchasePO", data);
};

export const createPurchasePO = (data: IPurchasePO) => {
    return post(`/purchasePo`, data);
};

export const updatePurchasePO = (id: string, data: IPurchasePO) => {
    return patch(`/purchasePo/${id}`, data);
};

export const deletePurchasePO = (id: string) => {
    return delete_(`/purchasePo/${id}`);
};

export const getPurchasePOLines = (PurchasePOId: string) => {
    return get(`/lineitem`, { params: { PurchasePOId } });
};

export const createPurchasePOLine = (id: string, data: ILineItem) => {
    return post(`/purchasePo/${id}/lineitem`, data);
};

export const acknowledgePurchasePO = (poId: string) => {
    return post(`/purchasepo/${poId}/acknowledge`, {});
};

export const updatePurchasePOLine = (id: string, data: ILineItem) => {
    return patch(`/lineitem/${id}`, data);
};

export const deletePurchasePOLine = (id: string) => {
    return delete_(`/lineitem/${id}`);
};
