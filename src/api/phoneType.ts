import {get, post, patch, delete_ } from ".";

export interface IPhoneType {
    name: string;
}

export const getPhoneTypes = () => {
    return get("/phoneType");
};

export const addPhoneType = (name: string) => {
    return post("/phoneType", { name });
};

export const editPhoneType = (id: string, name: string) => {
    return patch(`/phoneType/${id}`, { name });
};

export const deletePhoneType = (id: string) => {
    return delete_(`/phoneType/${id}`);
};
