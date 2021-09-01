import * as Yup from "yup";
import { delete_, get, patch, post } from ".";

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
    LineServiceRecordId: Yup.string().required(),
});

export const getTickets = () => {
    return get("/ticket");
};

export const createTicket = (data: ITicket) => {
    return post("/ticket", data);
};

export const updateTicket = (id: string, data: ITicket) => {
    return patch(`/ticket/${id}`, data);
};

export const deleteTicket = (id: string) => {
    return delete_(`/ticket/${id}`);
};
