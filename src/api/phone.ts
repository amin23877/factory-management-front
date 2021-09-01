import {get, post, patch, delete_ } from ".";

export interface IPhone {
    id?: string;
    phone: string;
    ext: string;
    main: boolean;
    PhoneTypeId: string;
}

export const getPhones = () => {
    return get("/phone");
};

export const getAllModelPhone = (model: string, id: string) => {
    return get(`/phone/${model}/${id}`);
};

export const createAModelPhone = (model: string, id: string, data: IPhone) => {
    return post(`/phone/${model}/${id}`, data);
};

export const updateAModelPhone = (id: string, data: IPhone) => {
    return patch(`/phone/${id}`, data);
};

export const deleteAModelPhone = (id: string) => {
    return delete_(`/phone/${id}`);
};
