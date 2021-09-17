import { delete_, get, patch, post } from ".";
export interface ITicketCategory {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getTicketCategory = () => {
    return get("/ticketCategory");
};

export const addTicketCategory = (name: string) => {
    return post("/ticketCategory", { name });
};

export const editTicketCategory = (id: string, name: string) => {
    return patch(`/ticketCategory/${id}`, { name });
};

export const deleteTicketCategory = (id: string) => {
    return delete_(`/ticketCategory/${id}`);
};
