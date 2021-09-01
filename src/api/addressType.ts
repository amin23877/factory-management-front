import { delete_, get, patch, post } from ".";

export interface IAddressType {
    name: string;
}

export const getAddressTypes = () => {
    return get("/addressType");
};

export const addAddressType = (name: String) => {
    return post("/addressType", { name });
};

export const editAddressType = (id: string, name: string) => {
    return patch(`/addressType/${id}`, { name });
};

export const deleteAddressType = (id: string) => {
    return delete_(`/addressType/${id}`);
};
