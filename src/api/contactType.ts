import { get, post, patch, delete_ } from ".";

export interface IContactType {
    name: string;
}

export const getContactTypes = () => {
    return get("/contactType");
};

export const addContactType = (name: string) => {
    return post("/contactType", { name });
};

export const editContactType = (id: string, name: string) => {
    return patch(`/contactType/${id}`, { name });
};

export const deleteContactType = (id: string) => {
    return delete_(`/contactType/${id}`);
};
