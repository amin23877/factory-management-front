import Axios from "axios";

import { IItem } from "./items";
import { ISO } from "./so";

export interface IUnit {
    id: string;
    assignee: string[];
    status: string;
    seen: boolean;
    number: string | number;
    LineItemRecordId: string;
    ItemId: string;
    dueDate: number;
    item: IItem;
    so: ISO;
    laborTime:string,
    laborCost:number,
    totalCost:number,
    bomCost:number,
}

export interface IUnitHistory {
    itemno:string,
    item:IItem,
    unit:IUnit,
    id:string,
    estimatedShipDate:string,
    actualShipDate:string,
    serialNumber: string,
    status: string,
    warrantyStatus: string,
    warrantyEndDate: string,
    sonumber: string,
    soid: string,
    so: ISO,
    SODate: number,
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
