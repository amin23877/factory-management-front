import Axios from "axios";

export interface INote {
    id?: string;
    subject: string;
    note: string;
    url?: string;
}

export const getAllModelNotes = async (model: string, id: any) => {
    try {
        const resp = await Axios.get(`/note/${model}/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelNote = async (model: string, id: any, data: INote) => {
    try {
        const resp = await Axios.post(`/note/${model}/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelNote = async (id: any, data: INote) => {
    try {
        const resp = await Axios.patch(`/note/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelNote = async (id: any) => {
    try {
        const resp = await Axios.delete(`/note/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
