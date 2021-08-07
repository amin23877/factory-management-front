import { post } from "."

export type receiveType = {
    PurchasePOId:string;
    LineItemRecordId:string;
    ItemId:string;
    quantity:number,
    EmployeeId:string;
}

export const postReceive = (data:{quantity:number, LineItemRecordId:string}) => {
    return post('/receive', data);
}