import { delete_, get, patch, post } from ".";
export interface ICustomerType {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getCustomerTypes = () => {
    return get("/customerType");
};

export const addCustomerType = (name: string) => {
    return post("/customerType", { name });
};

export const editCustomerType = (id: string, name: string) => {
    return patch(`/customerType/${id}`, { name });
};

export const deleteCustomerType = (id: string) => {
    return delete_(`/customerType/${id}`);
};
