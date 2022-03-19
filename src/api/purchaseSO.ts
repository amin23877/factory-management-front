import { delete_, get, patch, post } from ".";

import { ILineItem } from "./lineItem";

export type IPurchaseSO = {
  id: string;
  file?: any;
  number: string;
  path?: string;
  requester: string;
  VendorId: string;
  ContactId: string;
  EmployeeId: string;
  estimatedObtainDate: string;
  status: string;
  obtained: boolean;
};

export const getPurchaseSOs = () => {
  return get("/purchaseSo");
};

export const createPurchaseSO = (data: IPurchaseSO) => {
  const formData = new FormData();
  data.file && formData.append("file", data.file);
  data.requester && formData.append("requester", String(data.requester));
  data.VendorId && formData.append("VendorId", String(data.VendorId));
  data.ContactId && formData.append("ContactId", String(data.ContactId));
  data.estimatedObtainDate && formData.append("estimatedObtainDate", String(data.estimatedObtainDate));
  data.status && formData.append("status", String(data.status));
  data.obtained && formData.append("obtained", String(data.obtained));

  return post(`/purchaseSo`, formData);
};

export const updatePurchaseSO = (id: string, data: IPurchaseSO) => {
  return patch(`/purchaseSo/${id}`, data);
};

export const deletePurchaseSO = (id: string) => {
  return delete_(`/purchaseSo/${id}`);
};

export const getPurchaseSOLines = (PurchaseSOId: string) => {
  return get(`/lineitem`, { params: { PurchaseSOId } });
};

export const createPurchaseSOLine = (id: string, data: ILineItem) => {
  return post(`/purchaseSo/${id}/lineitem`, data);
};

export const updatePurchaseSOLine = (id: string, data: ILineItem) => {
  return patch(`/lineitem/${id}`, data);
};

export const deletePurchaseSOLine = (id: string) => {
  return delete_(`/lineitem/${id}`);
};
