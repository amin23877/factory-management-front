import Axios from "axios";

export interface IEmailAddress {
    id?: string,
    email: string;
    main?: boolean;
    EmailTypeId: string;
}

export const getEmails = async () => {
    try {
        const resp = await Axios.get('/emailAddress');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllModelEmailAddrs = async (model: string, id: string) => {
    try {
        const resp = await Axios.get(`/emailAddress/${model}/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelEmailAddr = async (model: string, id: string, data: IEmailAddress) => {
    try {
        const resp = await Axios.post(`/emailAddress/${model}/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelEmailAddr = async (id: string, data: IEmailAddress) => {
    try {
        const resp = await Axios.patch(`/emailAddress/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelEmailAddr = async (id: string) => {
    try {
        const resp = await Axios.delete(`/emailAddress/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
