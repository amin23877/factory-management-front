import { get, post, patch, delete_ } from ".";

export interface IVendorType {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getVendorTypes = () => {
    return get("/vendortype");
};

export const addVendorType = (name: string) => {
    return post("/vendortype", { name });
};

export const editVendorType = (id: string, name: string) => {
    return patch(`/vendortype/${id}`, { name });
};

export const deleteVendorType = (id: string) => {
    return delete_(`/vendortype/${id}`);
};
