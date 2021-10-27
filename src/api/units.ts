import { patch, get, post, delete_ } from ".";

import { IItem } from "./items";
import { ISO } from "./so";

export interface IUnit {
    id: string;
    assignee: string[];
    status: string;
    seen: boolean;
    number: string | number;
    LineItemRecordId: string;
    ItemId: IItem;
    dueDate: number;
    item: IItem;
    so: ISO;
    laborTime: string;
    laborCost: number;
    totalCost: number;
    bomCost: number;
    productionStatus: string;
    options: any[];
    photo: any[];
}

export interface IUnitHistory {
    itemno: string;
    item: IItem;
    unit: IUnit;
    id: string;
    estimatedShipDate: string;
    actualShipDate: string;
    serialNumber: string;
    status: string;
    warrantyStatus: string;
    warrantyEndDate: string;
    sonumber: string;
    soid: string;
    so: ISO;
    SODate: number;
}

export const addImage = (unitId: string, file: any) => {
    const data = new FormData();
    data.append("photo", file);
    return post(`/unit/${unitId}/photo`, data);
};
export const deleteImage = (unitId: string, data: any) => {
    return delete_(`/unit/${unitId}/photo`, null, data);
};

export const updateUnit = (id: string, data: any) => {
    if (data.dueDate) {
        let date = new Date(data.dueDate);
        data.dueDate = date.getTime();
    }
    return patch(`/unit/${id}`, data);
};

export const getAllUnits = () => {
    return get("/unit");
};
