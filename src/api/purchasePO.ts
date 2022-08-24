import { get, delete_, patch, post } from ".";

import { ILineItem } from "./lineItem";
import { ILineService } from "./lineService";

export type IPurchasePO = {
  id: string;
  type: string;
  status: string;
  description: string;
  VendorId: string;
  vendorEmail: string;
  publicNote: string;
  date: number;
  number: string;
  sentDate: number;
  ackDate: number;
  privateNote: string;
  billingAddressId: string;
  billingAttn: string;
  billingPhone: string;
  billingExt: string;
  billingEmail: string;
  shippingAddressId: string;
  shippigAttn: string;
  shippigPhone: string;
  shippingExt: string;
  shippigEmail: string;
  SOId: string;
  QuoteId: string;
  dateRequired: number;
  vendorConfirmation: string;
  shippingConfirmation: number;
  freightCompany: string;
  freightCompanyWebsite: string;
  manualTrackingNumber: string;
  trackingConfirmation: string;
  statusNotes: string;
  terms: string;
  poConf: string;
};

export type IRequiredPO = {
  ItemId: string;
  UnitId?: string;
  SOId?: string;
  qty: number;
  expectedDate?: number;
  type: string;
};
export interface IPurchasePOComplete extends IPurchasePO {
  lines: ILineItem[];
  lineServices: ILineService[];
}

export const getPurchasePOs = () => {
  return get("/purchasePo");
};

export const createPurchasePOComplete = (data: IPurchasePOComplete) => {
  return post("/purchasePO", data);
};

export const createPurchasePO = (data: IPurchasePO) => {
  return post(`/purchasePo`, data);
};

export const createRequiredPurchasePO = (data: IRequiredPO) => {
  return post(`/requiredPo`, data);
};

export const updatePurchasePO = (id: string, data: IPurchasePO) => {
  return patch(`/purchasePo/${id}`, data);
};

export const deletePurchasePO = (id: string) => {
  return delete_(`/purchasePo/${id}`);
};

export const getPurchasePOLines = (PurchasePOId: string) => {
  return get(`/lineitem`, { params: { PurchasePOId } });
};

export const createPurchasePOLine = (id: string, data: ILineItem) => {
  return post(`/purchasePo/${id}/lineitem`, data);
};

export const acknowledgePurchasePO = (poId: string) => {
  return post(`/purchasepo/${poId}/acknowledge`, {});
};

export const updatePurchasePOLine = (id: string, data: ILineItem) => {
  return patch(`/lineitem/${id}`, data);
};

export const deletePurchasePOLine = (id: string) => {
  return delete_(`/lineitem/${id}`);
};
