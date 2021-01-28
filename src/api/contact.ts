import Axios from "axios";

interface IContact {
    firstName:string,
    lastName:string,
    title:string,
    department:string,
    refferedBy:string,
    linkedIn:string,
    facebook:string,
    instagram:string,
    website:string,
    optout:string,
    mi:string,
    prefix:string,
    active:boolean,
    main:string,
    ContactTypeId:number
}

export const getAllModelContact = async (model: string, id: string) => {
    try {
        const resp = await Axios.get(`/contact/${model}/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelContact = async (model: string, id: string, data: IContact) => {
    try {
        const resp = await Axios.post(`/contact/${model}/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelContact = async (id: string, data: IContact) => {
    try {
        const resp = await Axios.patch(`/contact/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelContact = async (id: number) => {
    try {
        const resp = await Axios.delete(`/contact/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
