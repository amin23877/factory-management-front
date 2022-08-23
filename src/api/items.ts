import { get, delete_, patch, post } from ".";

export interface IBomRecord {
  id: string;
  BOMId: string;
  name?: string;
  ItemId: {
    id: string;
    name: string;
    no: string;
  };
}

export interface IItemPricing {
  label: string;
  price: number;
  nonCommissionable: boolean;
}

export interface IItem {
  id: string;
  // start detail section
  recId: string;
  no: string;
  name: string;
  description: string;
  category: string;
  type: string;
  approvedForSale: boolean;
  obsolete: boolean;
  rndOnly: boolean;
  archived: boolean;
  archiveDate: number;
  nonInventoryItem: boolean;
  dontTrackQoh: boolean;
  dontOrderOnPOs: boolean;
  class: string;
  canBom: boolean;
  // end detail section

  // start pricing section
  pricing: { id?: string; label: string; price: number; nonCommissionable: boolean }[];
  engineeringApproval: boolean;
  bom: boolean;
  option: boolean;
  invalidCost: boolean;
  taxable: boolean;
  device: boolean;
  isUnit: boolean;
  overrideUse: boolean;
  override: number;
  totalCost: number;
  totalCostBackup: number;
  retailPrice: number;
  bomCost: number;
  bomCostEstimate: number;
  bomCostEstimateUse: boolean;
  // end pricing section

  // start quantity section
  onOrderQty: number;
  onHandQty: number;
  allocatedQty: number;
  availableQty: number;
  totalQty: number;
  triggerQty: number;
  reorderQty: number;
  leadTime: number;
  lastUsedInJOB: number;
  lastCount: number;
  usedInQuarter: number;
  usedInHalf: number;
  usedInYear: number;
  usedInQuarterAdj: number;
  usedInHalfAdj: number;
  usedInYearAdj: number;
  recentPurchasePriceBy: number;
  qohValue: number;
  qohMismatch: boolean;
  // end quantity section

  // start shipping section
  preferredVendor: string;
  weight: number;
  notShippable: boolean;
  shippingChecklistRequired: boolean;
  shippableOnBOM: boolean;
  // end shipping section

  // start attributes section
  manufacturer: string;
  manufacturerProductNumber: number;
  // end attributes section

  // start more info
  qbType: string;
  qbId: string;
  // end more info

  assembly: boolean;
  productFamily: string;
  clusterValue: string;
  levels: { level: string; value: string }[];

  manufacturingTime: number;
  evaluateTime: number;
  testTime: number;
  laborCost: number;

  services: any[];
}

export const AddItemInitialValues = {};

export const createItem = (itemData: any) => {
  return post("/item", itemData);
};
export const addImage = (itemId: string, file: any) => {
  const data = new FormData();
  data.append("photo", file);

  return patch(`/item/${itemId}`, data);
};

export const updateAnItem = (itemId: string, itemData: any) => {
  return patch(`/item/${itemId}`, itemData);
};

export const deleteAnItem = (itemId: string) => {
  return delete_(`/item/${itemId}`);
};

export const getItems = () => {
  return get("/item");
};

export const getItemsByQuery = (params: any) => {
  return get("/item", { params });
};

export const getItemQuotes = (itemId: string) => {
  return get(`/item/${itemId}/quote`);
};

export const getItemSOs = (itemId: string) => {
  return get(`/item/${itemId}/so`);
};

export const addManualCount = (ItemId: string, count: number, date: string) => {
  return post("/manualCount", { ItemId, count, date });
};

export interface IQuantity {
  qtyOnHand: string;
  qtyAvailable: string;
  qtyOnOrder: string;
  qtyAllocated: string;
  qtyRemain: string;
}

export const updateItemQuantity = (ItemId: string, data: IQuantity) => {
  return patch(`/item/${ItemId}/qty`, data);
};

export const convertToItem = (serviceId: string) => {
  return patch(`/service/${serviceId}/convert`, {});
};

export const convertToService = (itemId: string) => {
  return patch(`/item/${itemId}/convert`, {});
};
