import Axios from "axios";
import * as Yup from "yup";

export const AddItemSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too short!").max(60, "Too long").required("Required !!"),
});

export interface IItem {
    id?: string;
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
    filters: {
        [key: string]: string | number;
    };
    fields: {
        [key: string]: string | number;
    };
}

export const AddItemInitialValues = {};

export const createItem = async (itemData: any) => {
    try {
        // console.table(itemData);
        const resp = await Axios.post("/item", itemData);
        return resp.data;
    } catch (error) {
        console.error(error);
    }
};
export const addImage = async (itemId: string, file: any) => {
    const data = new FormData();
    data.append("photo", file);
    try {
        // console.table(itemData);
        const resp = await Axios.patch(`/item/${itemId}`, data);
        return resp.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateAnItem = async (itemId: string, itemData: any) => {
    try {
        const resp = await Axios.patch(`/item/${itemId}`, itemData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAnItem = async (itemId: string) => {
    try {
        const resp = await Axios.delete(`/item/${itemId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getItems = async () => {
    try {
        const resp = await Axios.get("/item");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getItemsByQuery = async (params: any) => {
    try {
        const resp = await Axios.get("/item", { params });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getItemQuotes = async (itemId: string) => {
    try {
        const resp = await Axios.get(`/item/${itemId}/quote`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getItemSOs = async (itemId: string) => {
    try {
        const resp = await Axios.get(`/item/${itemId}/so`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const addManualCount = async (ItemId: string, count: number, date: string) => {
    try {
        const resp = await Axios.post("/manualCount", { ItemId, count, date });
        return resp.data;
    } catch (error) {
        throw error;
    }
};
