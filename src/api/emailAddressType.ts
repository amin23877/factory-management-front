import { delete_, get, patch, post } from ".";

export interface IEmailAddressType {
    name: string;
}

export const getEmailAddressTypes = () => {
    return get("/emailAddressType");
};

export const addEmailAddressType = (name: string) => {
    return post("/emailAddressType", { name });
};

export const editEmailAddressType = (id: string, name: string) => {
    return patch(`/emailAddressType/${id}`, { name });
};

export const deleteEmailAddressType = (id: string) => {
    return delete_(`/emailAddressType/${id}`);
};
