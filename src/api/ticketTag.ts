import { delete_, get, patch, post } from ".";
export interface ITicketTag {
    id?: string;
    inputValue?: string;
    name: string;
}

export const getTicketTags = () => {
    return get("/ticketTags");
};

export const addTicketTags = (name: string) => {
    return post("/ticketTags", { name });
};

export const editTicketTags = (id: string, name: string) => {
    return patch(`/ticketTags/${id}`, { name });
};

export const deleteTicketTags = (id: string) => {
    return delete_(`/ticketTags/${id}`);
};
