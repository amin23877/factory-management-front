import Axios from "axios";

export interface IUnit {
    id: string;
    number: string | number;
    LineItemRecordId: string;
    laborCost: number;
    assignee: string[];
    dueDate: number;
    status: string;
    seen: boolean;
}

export const updateUnit = async (id: string, data: any) => {
    try {
        const resp = await Axios.patch(`/unit/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};