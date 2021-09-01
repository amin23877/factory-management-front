import * as Yup from "yup";

import { get,  delete_, patch, post } from ".";

export const AddItemSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too short!").max(60, "Too long").required("Required !!"),
});

export interface IItem {
    id: string;

    approvedForSales: boolean;
    obsolete: boolean;
    rndOnly: boolean;
    engineeringApproved: boolean;
    salesApproved: boolean;
    nonInventoryItem: boolean;
    dontTrackQOH: boolean;
    dontOrderPO: boolean;
    archived: boolean;
    taxable: boolean;
    invalidCost: boolean;
    option: boolean;
    lead: number;
    qbtype: string;
    qbid: string;
    sku: string;
    active: boolean;
    upc: string;
    manufacturer: string;
    jobDays: number;
    color: string;
    description: string;
    size: string;
    specialNote: string;
    version: string;
    revision: any[];
    keywords: string;
    url: string;
    cost: number;
    totalValue: number;
    retailPrice: number;
    BOM: boolean;
    bomCost: number;
    totalQoh: number;
    allocatedQoh: number;
    availableQoh: number;
    owQoh: number;
    triggerQoh: number;
    recentPurchasePrice: number;
    uom: string;
    reorderQty: number;
    minOrder: number;
    perShipment: number;
    location: string;
    shlef: string;
    aisle: string;
    bin: string;
    prefVendorNote: string;
    additionalShippingFee: number;
    shippingNote: string;
    weightOz: number;
    weightLb: number;
    shippingOz: number;
    shippingLb: number;
    shippingInstruction: string;
    shippableOnBom: boolean;
    notShippable: boolean;
    engineeringApproval: boolean;
    no: string;
    name: string;
    device: boolean;
    usedInLastQuarter: number;
    photo?: string;
    filters: {
        [key: string]: string | number;
    };
    fields: {
        [key: string]: string | number;
    };
}

export const AddItemInitialValues = {};

export const createItem = (itemData: any) => {
    return post("/item", itemData);
};
export const addImage = (itemId: string, file: any) => {
    const data = new FormData();
    data.append("photo", file);

    return patch(`/item/${itemId}`, data);
};

export const updateAnItem = (itemId: string, itemData: any) => {
    return patch(`/item/${itemId}`, itemData);
};

export const deleteAnItem = (itemId: string) => {
    return delete_(`/item/${itemId}`);
};

export const getItems = () => {
    return get("/item");
};

export const getItemsByQuery = (params: any) => {
    return get("/item", { params });
};

export const getItemQuotes = (itemId: string) => {
    return get(`/item/${itemId}/quote`);
};

export const getItemSOs = (itemId: string) => {
    return get(`/item/${itemId}/so`);
};

export const addManualCount = (ItemId: string, count: number, date: string) => {
    return post("/manualCount", { ItemId, count, date });
};

export interface IQuantity {
    qtyOnHand: string;
    qtyAvailable: string;
    qtyOnOrder: string;
    qtyAllocated: string;
    qtyRemain: string;
}

export const updateItemQuantity = (ItemId: string, data: IQuantity) => {
    return patch(`/item/${ItemId}/qty`, data);
};
