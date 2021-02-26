import Axios from "axios";

export interface IPhone {
    id?:number,
    phone:string,
    ext:string,
    main:boolean,
    PhoneTypeId:number
}

export const getPhones = async () => {
    try {
        const resp = await Axios.get('/phone');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllModelPhone = async (model: string, id: string) => {
    try {
        const resp = await Axios.get(`/phone/${model}/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelPhone = async (model: string, id: string, data: IPhone) => {
    try {
        const resp = await Axios.post(`/phone/${model}/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelPhone = async (id: number, data: IPhone) => {
    try {
        const resp = await Axios.patch(`/phone/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelPhone = async (id: number) => {
    try {
        const resp = await Axios.delete(`/phone/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
