import { post, patch, delete_ } from ".";

export type customerPoType = {
  id: string;
  number: string;
  SOId: string;
  QuoteId: string;
  RepId: string;
  requester: string;
  ClientId: string;
  contact: string;
};

export function createCustomerPo(data: Omit<customerPoType, "id">) {
  return post("/customerPo", data);
}

export function updateCustomerPo(data: customerPoType) {
  return patch(`/customerPo/${data.id}`, data);
}

export function deleteCustomerPo(id: string) {
  return delete_(`/customerPo/${id}`);
}
