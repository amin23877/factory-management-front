import { delete_, get, patch, post } from ".";
export interface ITicketStatus {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getTicketStatus = () => {
    return get("/ticketStatus");
};

export const addTicketStatus = (name: string) => {
    return post("/ticketStatus", { name });
};

export const editTicketStatus = (id: string, name: string) => {
    return patch(`/ticketStatus/${id}`, { name });
};

export const deleteTicketStatus = (id: string) => {
    return delete_(`/ticketStatus/${id}`);
};
