import Axios from 'axios';

export interface IDocument {
    id?: string,
    path?: string,
    file: File | string,
    description: string,
}

export const getAllModelDocuments = async (model:string, id:any) => {
    try {
        const resp = await Axios.get(`/document/${model}/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const createAModelDocument = async (model:string, id:any, file: any, description:string, fileName?:string) => {
    try {
        const formData = new FormData();
        
        formData.append('document', file);
        formData.append('description', description);
        fileName && formData.append('fileName', fileName);

        const resp = await Axios.post(`/document/${model}/${id}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateAModelDocument = async (docid:any, file: any, description:string) => {
    try {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('description', description);
        const resp = await Axios.patch(`/document/${docid}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAModelDocument = async (docid:any) => {
    try {
        const resp = await Axios.delete(`/document/${docid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}