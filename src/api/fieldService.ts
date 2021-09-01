import { get, post, patch, delete_ } from ".";

export interface IFieldService {
    id?: string;
    name: string;
    ItemId: string;
    period: number;
    price: number;
    ServiceFamilyId: string;
    description?: string;
}

export const getFieldServices = (ItemId?: string) => {
    return get("/service", { params: { ItemId } });
};

export const getAFieldService = (id: string) => {
    return get(`/service/${id}`);
};

export const createFieldService = (data: IFieldService) => {
    return post("/service", data);
};

export const updateFieldService = (id: string, data: IFieldService) => {
    return patch(`/service/${id}`, data);
};

export const deleteFieldService = (id: string) => {
    return delete_(`/service/${id}`);
};

export const addServiceToLineitem = (lineId: string, serviceId: string, count?: number) => {
    return post(`/lineitem/${lineId}/lineservice/${serviceId}`, { count });
};

export const removeServiceFromLineitem = (lineId: string, serviceId: string) => {
    return delete_(`/lineitem/${lineId}/lineservice/${serviceId}`);
};
