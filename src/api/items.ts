import Axios from 'axios';
import * as Yup from 'yup'

import {IItemType} from './types';

export const AddItemSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too short!").max(60, "Too long").required("Required !!"),
    
    cost: Yup.number(),
    retailPrice: Yup.number(),

    minimum: Yup.number().min(1, "Too short!"),
    maximum: Yup.number().min(2, "Too short!"),
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
    lastCount: string,
    recentPurchasePrice: number,
    uom: string,
    reorderQty: number,
    minOrder: number,
    perShipment: number,
    location: string,
    prefVendor: string,
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
    archiveDate: "",
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
    lastCount: "",
    recentPurchasePrice: 0,
    uom: "",
    reorderQty: 0,
    minOrder: 0,
    perShipment: 0,
    location: "",
    prefVendor: "",
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
        const resp = await Axios.post('/item', itemData);
        return resp.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateAnItem = async (itemId:string, itemData:any) => {
    try {
        const resp = await Axios.patch(`/item/${itemId}`, itemData);
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