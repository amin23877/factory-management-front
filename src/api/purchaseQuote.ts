import { delete_, get, patch, post } from ".";

export type IPurchaseQuote = {
    id?: string;
    file?: File | null;
    number?: string;
    senderNumber?: string;
    path?: string;
    requester: string;
    VendorId: string;
    ContactId: string;
    EmployeeId?: string;
};

export const getPurchaseQuotes = () => {
    return get("/purchaseQuote");
};

export const createPurchaseQuote = (data: IPurchaseQuote) => {
    const formData = new FormData();
    data.file && formData.append("file", data.file);
    data.requester && formData.append("requester", String(data.requester));
    data.VendorId && formData.append("VendorId", String(data.VendorId));
    data.ContactId && formData.append("ContactId", String(data.ContactId));

    return post("/purchaseQuote", formData);
};

export const updatePurchaseQuote = (id: string, data: IPurchaseQuote) => {
    return patch(`/purchaseQuote/${id}`, data);
};

export const deletePurchaseQuote = (id: string) => {
    return delete_(`/purchaseQuote/${id}`);
};
