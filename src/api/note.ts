import Axios from "axios";

export interface INote {
    id?: number;
    subject: string;
    note: string;
    url?: string;
}

export const getAllModelNotes = async (model: string, id: number) => {
    try {
        const resp = await Axios.get(`/note/${model}/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelNote = async (model: string, id: number, data: INote) => {
    try {
        const resp = await Axios.post(`/note/${model}/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelNote = async (id: number, data: INote) => {
    try {
        console.log(id, data);
        
        const resp = await Axios.patch(`/note/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAModelNote = async (id: number) => {
    try {
        const resp = await Axios.delete(`/note/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};
