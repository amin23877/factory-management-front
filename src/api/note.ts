import Axios from "axios";

interface NoteInterface {
    subject: string;
    note: string;
    url?: string;
}

export const getAllModelNotes = async (model: string, id: string) => {
    try {
        const resp = await Axios.get(`/note/${model}/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const createAModelNote = async (model: string, id: string, data: NoteInterface) => {
    try {
        const resp = await Axios.post(`/note/${model}/${id}`, data);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAModelNote = async (id: string, data: NoteInterface) => {
    try {
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
