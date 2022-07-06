import { delete_, get, patch, post } from ".";
import { IItem } from "./items";

export interface ILineItem {
  SoId?: string;
  QuoteId?: string;

  id?: string;
  ItemId: any;
  index: number;
  description: string;
  quantity: number;
  price: number;
  tax: boolean;
  sort?: string;
  fru?: string;
  services: any[];
  group: number;
  i?: IItem;
}

export type records = "purchaseSo" | "purchasePo" | "so" | "quote" | "po";

export const getALineItem = (id: string) => get(`/lineitem/${id}`);

export const createLineItem = (record: records, recordId: string, data: ILineItem) =>
  post(`/${record}/${recordId}/lineitem`, data);

export const editLineItem = async (id: string, data: ILineItem) => patch(`/lineitem/${id}`, data);

export const deleteLineItem = async (id: string) => delete_(`/lineitem/${id}`);
