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
  no: string;
  name: string;
  description: string;
  category: string;
  type: string;
  approvedForSale: boolean;
  obsolete: boolean;
  rndOnly: boolean;
  archived: boolean;
  arvhiceDate: number;
  nonInventoryItem: boolean;
  dontTrackQoh: boolean;
  dontOrderOnPOs: boolean;
  pricing: IItemPricing[];
  engineeringApproval: boolean;
  bom: boolean;
  option: boolean;
  invalidCost: boolean;
  taxable: boolean;
  device: boolean;
  isUnit: boolean;
  overrideUse: boolean;
  override: number;
  bomCost: number;
  bomCostEstimate: number;
  bomCostEstimateUse: boolean;
  totalCost: number;
  retailPrice: number;
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
  preferredVendor: string;
  weight: number;
  notShippable: boolean;
  shippingChecklistRequired: boolean;
  shippableOnBOM: boolean;
  manufacturer: string;
  manufacturerProductNumber: number;
  qbType: string;
  qbId: string;
  assembly: boolean;
  productFamily: string;
  manufacturingTime: number;
  evaluateTime: number;
  testTime: number;
  laborCost: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  levels: any[];
  [key: string]: any;
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
