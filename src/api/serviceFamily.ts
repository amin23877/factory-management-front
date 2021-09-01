import { delete_, get, patch, post } from ".";

export interface IServiceFamily {
    id?: string;
    name: string;
}

export const getServiceFamilies = () => {
    return get("/serviceFamily");
};

export const createServiceFamily = (name: string) => {
    return post("/serviceFamily", { name });
};

export const updateServiceFamily = (id: string, name: string) => {
    return patch(`/serviceFamily/${id}`, { name });
};

export const deleteServiceFamily = (id: string) => {
    return delete_(`/serviceFamily/${id}`);
};
