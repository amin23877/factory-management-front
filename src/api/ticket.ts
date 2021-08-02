import Axios from "axios";
import * as Yup from 'yup';

export interface ITicket {
    id: string;
    name: string;
    ContactId: string;
    LineServiceRecordId: any;
    tags: string;
    callTime: number;
    description: string;
    status: string;
    deadline: number;
}

export const schema = Yup.object().shape({
    LineServiceRecordId: Yup.string().required()
});

export const getTickets = async () => {
    try {
        const resp = await Axios.get("/ticket");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createTicket = async (data: ITicket) => {
    try {
        const resp = await Axios.post("/ticket", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateTicket = async (id: string, data: ITicket) => {
    try {
        const resp = await Axios.patch(`/ticket/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTicket = async (id: string) => {
    try {
        const resp = await Axios.delete(`/ticket/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
