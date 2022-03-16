import { patch, post } from ".";

export type repType = {
  id: string;
  name: string;
  AddressId: string;
  phone: string;
  ext: string;
  email: string;
  number: string;
  active: boolean;
  type: "Rep" | "OEM" | "Buy/Resell";
  productLine: string;
  regularCommission: number;
  overageCommission: number;
  salesPerson: string;
};

export const createRep = (data: repType) => {
  return post("/rep", data);
};

export const updateRep = (id: string, data: Partial<repType>) => {
  return patch(`/rep/${id}`, data);
};
