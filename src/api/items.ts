import Axios from 'axios';
import * as Yup from 'yup'

export const AddItemSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too short!").max(60, "Too long").required("Required !!"),
    
    cost: Yup.number(),
    retailPrice: Yup.number(),

    minimum: Yup.number().min(1, "Too short!"),
    maximum: Yup.number().min(2, "Too short!"),
});

// export const AddItemInitialInterface ( VERY SOON... )
// export interface IItem {
    
// }
export const AddItemInitialValues = {
    name: "",
    no: "",
    sku: "",
    upc: "",
    mfgr: "",
    color: "",
    description: "",
    size: "small",
    variance: "",
    specialNote: "",
    active: "true",
    version: "",
    keywords: "",
    url: "",
    cost: 0,
    retailPrice: 0,
    modeCost: 0,
    qoh: 0,
    minimum: 0,
    maximum:0,
    aisle: "",
    shelf: "",
    bin: "",
    weightOz: 0,
    weightLb: 0,
    shippingOz: 0,
    shippingLb: 0,
    totalQoh: 0,
    allocatedQoh: 0,
    availableQoh: 0,
    triggerQoh: 0, 
    additionalShippingFee: 0,
    shippingNote: "",
    ItemCategoryId: "",
    ItemTypeId: "",
    ItemFamilyId:""
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