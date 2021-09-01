import { delete_, get, patch, post } from ".";

export interface IDivison {
    id?: string;
    name: string;
}

export const getAllDivison = () => {
    return get(`/divison`);
};

export const getClientDivisons = (id: string) => {
    return get(`/client/${id}/division`);
};

export const createDivison = (id: string, name: string) => {
    return post(`/divison`, { ClientId: id, name });
};

export const updateAModelDivison = (id: string, data: IDivison) => {
    return patch(`/divison/${id}`, data);
};

export const deleteAModelDivison = (id: string) => {
    return delete_(`/divison/${id}`);
};
