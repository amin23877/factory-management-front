import { get, post, patch, delete_ } from ".";

export interface IFieldService {
    id?: string;
    name: string;
    ItemId: string;
    no: string;
    period: number;
    retailPrice: number;
    ServiceClassId: any;
    ServiceCategoryId: any;
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
export const addServiceToItem = (data: IFieldService, itemId: string) => {
    return post(`/item/${itemId}/service`, data);
};
export const deleteServiceToItem = (itemId: string) => {
    return delete_(`/item/${itemId}/service`);
};
export const getItemService = (itemId: string) => {
    return get(`/item/${itemId}/service`);
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
