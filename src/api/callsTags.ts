import { delete_, get, patch, post } from ".";

export interface ICallsTags {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getCallsTags = () => {
    return get("/callstags");
};

export const addCallsTag = (name: string) => {
    return post("/callstags", { name });
};

export const editCallsTag = (id: string, name: string) => {
    return patch(`/callstags/${id}`, { name });
};

export const deleteCallsTag = (id: string) => {
    return delete_(`/callstags/${id}`);
};
