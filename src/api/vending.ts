import { get, post, patch, delete_ } from ".";

export type IVending = {
  id?: string;
  VendorId: string;
  ItemId: string;
  leadTime: number;
  comment: string;
  serialNo: string;
  lastReplenishTime: number;
  lastQuantityOrdered: number;
  cost: number;
};

export const createVending = (data: IVending) => {
  return post(`/vendor/${data.VendorId}/item/${data.ItemId}`, data);
};

export const getVendings = () => {
  return get("/vending");
};

export const updateVending = (id: string, data: IVending) => {
  return patch(`/vending/${id}`, data);
};

export const deleteVending = (id: string) => {
  return delete_(`/vending/${id}`);
};
