import { delete_, get, patch, post } from ".";

export interface IServiceClass {
    id?: string;
    name: string;
}

export const getServiceClasses = () => {
    return get("/serviceClass");
};

export const createServiceClass = (name: string) => {
    return post("/serviceClass", { name });
};

export const updateServiceClass = (id: string, name: string) => {
    return patch(`/serviceClass/${id}`, { name });
};

export const deleteServiceClass = (id: string) => {
    return delete_(`/serviceClass/${id}`);
};
