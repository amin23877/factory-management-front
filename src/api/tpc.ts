import { delete_, get, patch, post } from ".";

export interface ITPC {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getTPCs = () => {
    return get("/tpc");
};

export const createTPC = (data: ITPC) => {
    return post("/tpc", data);
};

export const updateTPC = (id: string, data: ITPC) => {
    return patch(`/tpc/${id}`, data);
};

export const deleteTPC = (id: string) => {
    return delete_(`/tpc/${id}`);
};
