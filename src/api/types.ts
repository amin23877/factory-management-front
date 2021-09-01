import { get, post, patch, delete_ } from ".";

export interface IItemType {
    id?: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export const getTypes = () => {
    return get("/itemtype");
};

export const createType = (name: string) => {
    return post(`/itemtype`, { name });
};

export const updateType = (id: string, name: string) => {
    return patch(`/itemtype/${id}`, { name });
};

export const deleteType = (id: string) => {
    return delete_(`/itemtype/${id}`);
};
