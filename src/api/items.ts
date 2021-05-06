import Axios from "axios";
import * as Yup from "yup";

import { IItemType } from "./types";

export const AddItemSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too short!").max(60, "Too long").required("Required !!"),

    ItemCategoryId: Yup.number().required(),
    ItemTypeId: Yup.number().required(),
    ItemFamilyId: Yup.number().required(),
});

export interface IItem {
    id?: string;
    name: string;
    no: string;
    approvedForSales: boolean;
    obsolete: boolean;
    rndOnly: boolean;
    nonInventoryItem: boolean;
    dontTrackQOH: boolean;
    dontOrderPO: boolean;
    archived: boolean;
    archiveDate: string | null;
    lastCount: string | null;
    engineeringApproval: boolean;
    taxable: boolean;
    invalidCost: boolean;
    option: boolean;
    lead: string;
    qbtype: string;
    qbid: string;
    sku: string;
    active: boolean;
    upc: string;
    manufacturer: string;
    jobDays?: number;
    color: string;
    description: string;
    size: "small" | "medium" | "large";
    specialNote: string;
    version: string;
    revision: string[];
    keywords: string;
    url: string;
    cost: number;
    retailPrice: number;
    BOM: boolean;
    bomCost: number;
    totalQoh: number;
    allocatedQoh: number;
    availableQoh: number;
    triggerQoh: number;
    recentPurchasePrice: number;
    uom: string;
    reorderQty: number;
    minOrder: number;
    perShipment: number;
    location: string;
    prefVendor: number;
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
    createdAt?: string;
    updatedAt?: string;
    ItemCategoryId: string | null;
    ItemTypeId: string | null;
    ItemFamilyId: string | null;

    ItemCategory?: IItemType;
    ItemType?: IItemType;
    ItemFamily?: IItemType;
}

export const AddItemInitialValues = {};

export const createItem = async (itemData: any) => {
    try {
        // console.table(itemData);
        const resp = await Axios.post("/item", {
            ...itemData,
            ItemCategoryId: String(itemData.ItemCategoryId),
            ItemTypeId: String(itemData.ItemTypeId),
            ItemFamilyId: String(itemData.ItemFamilyId),
        });
        return resp.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateAnItem = async (itemId: string, itemData: any) => {
    try {
        const resp = await Axios.patch(`/item/${itemId}`, {
            ...itemData,
            ItemCategoryId: parseInt(itemData.ItemCategoryId),
            ItemTypeId: parseInt(itemData.ItemTypeId),
            ItemFamilyId: parseInt(itemData.ItemFamilyId),
        });
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
