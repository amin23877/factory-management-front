import Axios from 'axios';
import * as Yup from 'yup'

import {IItemType} from './types';

export const AddItemSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too short!").max(60, "Too long").required("Required !!"),
    
    ItemCategoryId: Yup.number().required().notOneOf([0]),
    ItemTypeId: Yup.number().required().notOneOf([0]),
    ItemFamilyId: Yup.number().required().notOneOf([0]),
});

export interface IItem {
    id?: number,
    name: string,
    no: string,
    approvedForSales: boolean,
    obsolete: boolean,
    rndOnly: boolean,
    nonInventoryItem: boolean,
    dontTrackQOH: boolean,
    dontOrderPO: boolean,
    archived: boolean,
    archiveDate: string | null,
    lastCount: string | null,
    engineeringApproval: boolean,
    taxable: boolean,
    invalidCost: boolean,
    option: boolean,
    lead: number,
    qbtype: string,
    qbid: string,
    sku: string,
    active: boolean,
    upc: string,
    manufacturer: string,
    jobDays?: number,
    color: string,
    description: string,
    size: 'small' | 'medium' | 'large',
    specialNote: string,
    version: string,
    revision: string[],
    keywords: string,
    url: string,
    cost: number,
    retailPrice: number,
    BOM: boolean,
    bomCost: number,
    totalQoh: number,
    allocatedQoh: number,
    availableQoh: number,
    triggerQoh: number,
    recentPurchasePrice: number,
    uom: string,
    reorderQty: number,
    minOrder: number,
    perShipment: number,
    location: string,
    prefVendor: number ,
    prefVendorNote: string,
    additionalShippingFee: number,
    shippingNote: string,
    weightOz: number,
    weightLb: number,
    shippingOz: number,
    shippingLb: number,
    shippingInstruction: string,
    shippableOnBom: boolean,
    notShippable: boolean,
    createdAt?: string,
    updatedAt?: string,
    ItemCategoryId: number | null,
    ItemTypeId: number | null,
    ItemFamilyId: number | null,
    
    ItemCategory?: IItemType,
    ItemType?: IItemType,
    ItemFamily?: IItemType 
}
export const AddItemInitialValues : IItem = {
    name: "",
    no: "",
    active: false,
    approvedForSales: false,
    obsolete: false,
    rndOnly: false,
    nonInventoryItem: false,
    dontTrackQOH: false,
    dontOrderPO: false,
    archived: false,

    archiveDate: null,
    lastCount: null,
    
    engineeringApproval: false,
    taxable: false,
    invalidCost: false,
    option: false,
    lead: 0,
    qbtype: "",
    qbid: "",
    sku: "",
    upc: "",
    manufacturer: "",
    jobDays: 0,
    color: "",
    description: "",
    size: "small",
    specialNote: "",
    version: "",
    revision: [],
    keywords: "",
    url: "",
    cost: 0,
    retailPrice: 0,
    BOM: false,
    bomCost: 0,
    totalQoh: 0,
    allocatedQoh: 0,
    availableQoh: 0,
    triggerQoh: 0,
    recentPurchasePrice: 0,
    uom: "",
    reorderQty: 0,
    minOrder: 0,
    perShipment: 0,
    location: "",
    prefVendor: 0,
    prefVendorNote: "",
    additionalShippingFee: 0,
    shippingNote: "",
    weightOz: 0,
    weightLb: 0,
    shippingOz: 0,
    shippingLb: 0,
    shippingInstruction: "",
    shippableOnBom: false,
    notShippable: false,
    ItemCategoryId: null,
    ItemTypeId: null,
    ItemFamilyId: null,
};

// ------------------------------------------------------

export const createItem = async (itemData:any) => {
    try {
        // console.table(itemData);
        const resp = await Axios.post('/item', {...itemData,
            ItemCategoryId: parseInt(itemData.ItemCategoryId),
            ItemTypeId: parseInt(itemData.ItemTypeId),
            ItemFamilyId: parseInt(itemData.ItemFamilyId),
        });
        return resp.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateAnItem = async (itemId:number, itemData:any) => {
    try {
        const resp = await Axios.patch(`/item/${itemId}`, {...itemData,
            ItemCategoryId: parseInt(itemData.ItemCategoryId),
            ItemTypeId: parseInt(itemData.ItemTypeId),
            ItemFamilyId: parseInt(itemData.ItemFamilyId),
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnItem = async (itemId:number) => {
    try {
        const resp = await Axios.delete(`/item/${itemId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
} 

export const getItems = async () => {
    try {
        const resp = await Axios.get('/item');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getItemQuotes = async (itemId:number) => {
    try {
        const resp = await Axios.get(`/item/${itemId}/quote`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getItemSOs = async (itemId:number) => {
    try {
        const resp = await Axios.get(`/item/${itemId}/so`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}