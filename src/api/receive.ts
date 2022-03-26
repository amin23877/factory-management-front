import { post } from ".";

export type receiveType = {
  id: string;
  POLineItemId: string;
  POId: string;
  quantity: number;
  ItemId: string;
};

export const postReceive = (data: receiveType) => {
  return post("/receive", data);
};
