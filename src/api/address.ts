import Axios from "axios";

export interface IAddress {
    id?:number,
    address:string,
    address2:string,
    city:string,
    state:string,
    zip:string,
    country:string,
    main:boolean,
    AddressTypeId:number
}

export const getAllModelAddress = async (model: string, id: string) => {
    try {
        const resp = await Axios.get(`/address/${model}/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelAddress = async (model: string, id: string, data: IAddress) => {
    try {
        const resp = await Axios.post(`/address/${model}/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelAddress = async (id: number, data: IAddress) => {
    try {
        const resp = await Axios.patch(`/address/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelAddress = async (id: number) => {
    try {
        const resp = await Axios.delete(`/address/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
