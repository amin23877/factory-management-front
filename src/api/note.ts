import { get, post, patch, delete_ } from ".";

export interface INote {
    id?: string;
    subject: string;
    note: string;
    url?: string;
}

export const getAllModelNotes = (model: string, id: string) => {
    return get(`/note/${model}/${id}`);
};

export const createAModelNote = (model: string, id: string, data: INote) => {
    return post(`/note/${model}/${id}`, data);
};

export const updateAModelNote = (id: string, data: INote) => {
    return patch(`/note/${id}`, data);
};

export const deleteAModelNote = (id: string) => {
    return delete_(`/note/${id}`);
};
