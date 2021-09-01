import { delete_, get, patch, post } from ".";

export interface IAgency {
    id?: string;
    name: string;
}

export const getAllAgencies = () => {
    return get(`/agency`);
};

export const createAModelAgency = (id: string, name: string) => {
    return post(`/agency`, { ClientId: id, name });
};

export const updateAModelAgency = (id: string, data: IAgency) => {
    return patch(`/agency/${id}`, data);
};

export const deleteAModelAgency = async (id: string) => {
    return delete_(`/agency/${id}`);
};
