import { delete_, patch, post } from ".";

export const addCall = (data: any) => {
    return post("/calls", data);
};

export const deleteCall = (id: string) => {
    return delete_(`/calls/${id}`);
};

export const editCall = (id: string, data: any) => {
    return patch(`/calls/${id}`, data);
};
