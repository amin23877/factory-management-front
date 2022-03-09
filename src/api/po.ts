import { delete_, get, patch, post } from ".";
import { lineItemType } from "features/Purchase/PO/AddPurchasePO/LineItems";

export interface IPO {
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

  lines?: lineItemType[];
  createdAt: number;
  updatedAt: number;
}

export const createPO = (data: IPO) => {
  return post(`/po`, data);
};

export const updatePO = (id: string, data: IPO) => {
  return patch(`/po/${id}`, data);
};

export const getPO = () => {
  return get("/po");
};

export const deletePO = (id: string) => {
  return delete_(`/po/${id}`);
};
