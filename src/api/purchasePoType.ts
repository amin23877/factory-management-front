import { get,post, patch, delete_ } from ".";

export interface IPPOType {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getPPOTypes = () => {
    return get("/ppot");
};

export const addPPOType = (name: string) => {
    return post("/ppot", { name });
};

export const editPPOType = (id: string, name: string) => {
    return patch(`/ppot/${id}`, { name });
};

export const deletePPOType = (id: string) => {
    return delete_(`/ppot/${id}`);
};
