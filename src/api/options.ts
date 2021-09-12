import { post, delete_ } from ".";

export interface IOption {
    ItemId?: any;
    quantity: number;
}

export const deleteOption = (unitId: string, itemId?: any) => {
    return delete_(`/unit/${unitId}/option`, { ItemId: itemId });
};
export const addOption = (unitId: string, data: IOption) => {
    return post(`/unit/${unitId}/option`, data);
};
