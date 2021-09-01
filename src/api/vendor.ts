import { get, post, patch, delete_ } from ".";

export type IVendor = {
    id: string;
    name: string;
    description: string;
};

export const createVendor = (data: IVendor) => {
    return post("/vendor", data);
};

export const getVendors = () => {
    return get("/vendor");
};

export const updateVendor = (id: string, data: IVendor) => {
    return patch(`/vendor/${id}`, data);
};

export const deleteVendor = (id: string) => {
    return delete_(`/vendor/${id}`);
};

export const getVendorItems = (vendorId: string) => {
    return get(`/vendor/${vendorId}/items`);
};

export const getItemVendors = (itemId: string) => {
    return get(`/item/${itemId}/vendors`);
};

export const getVendorVendings = (vendorId: string) => {
    return get(`/vending`, { params: { vendorId } });
};
