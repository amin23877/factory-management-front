import { delete_, get, patch, post } from ".";

export interface IServiceCategory {
    id?: string;
    name: string;
}

export const getServiceCategories = () => {
    return get("/serviceCategory");
};

export const createServiceCategory = (name: string) => {
    return post("/serviceCategory", { name });
};

export const updateServiceCategory = (id: string, name: string) => {
    return patch(`/serviceCategory/${id}`, { name });
};

export const deleteServiceCategory = (id: string) => {
    return delete_(`/serviceCategory/${id}`);
};
