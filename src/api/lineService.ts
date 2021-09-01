import { delete_, get, patch, post } from ".";

export interface ILineService {
    id?: string;
    ServiceId: string;
    description: string;
    quantity: number;
    price: number;
    tax: boolean;
    LineItemRecordId: string;
}

export type records = "purchaseSo" | "purchasePo" | "so" | "quote" | "po";

export const getALineService = (id: string) => get(`/lineservice/${id}`);

export const createLineService = (record: records, recordId: string, data: ILineService) =>
    post(`/${record}/${recordId}/lineservice`, data);

export const editLineService = (id: string, data: ILineService) => patch(`/lineservice/${id}`, data);

export const deleteLineService = (id: string) => delete_(`/lineservice/${id}`);

export const getSOLineServices = (SOId: string) => get("/lineservice", { params: { SOId } });

export const getQuoteLineServices = (QuoteId: string) => get("/lineservice", { params: { QuoteId } });
