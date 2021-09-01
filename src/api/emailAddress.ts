import { delete_, get, patch, post } from ".";

export interface IEmailAddress {
    id?: string;
    email: string;
    main?: boolean;
    EmailTypeId: string;
}

export const getEmails = () => {
    return get("/emailAddress");
};

export const getAllModelEmailAddrs = (model: string, id: string) => {
    return get(`/emailAddress/${model}/${id}`);
};

export const createAModelEmailAddr = (model: string, id: string, data: IEmailAddress) => {
    return post(`/emailAddress/${model}/${id}`, data);
};

export const updateAModelEmailAddr = (id: string, data: IEmailAddress) => {
    return patch(`/emailAddress/${id}`, data);
};

export const deleteAModelEmailAddr = (id: string) => {
    return delete_(`/emailAddress/${id}`);
};
