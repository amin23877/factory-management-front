import Axios from "axios";

export interface ICallsTags {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getCallsTags = async () => {
    try {
        const resp = await Axios.get("/callstags");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const addCallsTag = async (name: string) => {
    try {
        const resp = await Axios.post("/callstags", { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editCallsTag = async (id: string, name: string) => {
    try {
        const resp = await Axios.patch(`/callstags/${id}`, { name });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteCallsTag = async (id: string) => {
    try {
        const resp = await Axios.delete(`/callstags/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
