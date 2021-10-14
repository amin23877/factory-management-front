import { delete_, get, patch, post } from ".";
import { IUnit } from "./units";

export interface IShipment {
    id: string;
    deliveryMethod: string;
    trackingNumber: string;
    deliveryDate: number;
    shipmentNo: string;
    shipDate: number;
    targetDate: number;
    carrier: string;
    UnitId: IUnit;

    createdAt: number;
    updatedAt: number;
    __v: number;
}

export const getShipments = () => {
    return get("/shipment");
};

export const createShipment = (data: IShipment) => {
    return post("/shipment", data);
};

export const updateShipment = (id: string, data: IShipment) => {
    return patch(`/shipment/${id}`, data);
};

export const deleteShipment = (id: string) => {
    return delete_(`/shipment/${id}`);
};
