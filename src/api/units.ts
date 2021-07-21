import Axios from "axios";

import { IItem } from "./items";
import { ISO } from "./so";

export interface IUnit {
    id: string;
    laborCost: number;
    assignee: string[];
    status: string;
    seen: boolean;
    number: string | number;
    LineItemRecordId: string;
    ItemId: string;
    dueDate: number;
    item: IItem;
    so: ISO;
}

export interface IUnitHistory {
    id:string,
    serialNumber: string,
    status: string,
    warrantyStatus: string,
    warrantyEndDate: string,
    SOId: string,
    SODate: number,
    unit:IUnit,
    item:IItem,
    estimatedShipDate:string,
    actualShipDate:string,
}

export const updateUnit = async (id: string, data: any) => {
    try {
        if (data.dueDate) {
            let date = new Date(data.dueDate);
            data.dueDate = date.getTime();
        }
        const resp = await Axios.patch(`/unit/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
