import { delete_, post } from ".";

export type receiveType = {
  id: string;
  POLineItemId: string;
  POId: string;
  quantity: number;
  ItemId: string;
};

export const createReceive = (data: receiveType) => {
  return post("/receive", data);
};

export const updateReceive = (id: string, data: Partial<receiveType>) => {
  return post(`/receive/${id}`, data);
};

export const deleteReceive = (id: string) => {
  return delete_(`/receive/${id}`);
};
