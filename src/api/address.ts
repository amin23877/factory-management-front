import { delete_, get, patch, post } from ".";

export interface IAddress {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export const getAddresses = () => {
  return get("/address");
};

export const getAllModelAddress = (model: string, id: string) => {
  return get(`/address/${model}/${id}`);
};

export const createAModelAddress = (model: string, id: string, data: IAddress) => {
  return post(`/address/${model}/${id}`, data);
};

export const updateAModelAddress = (id: string, data: IAddress) => {
  return patch(`/address/${id}`, data);
};

export const deleteAModelAddress = (id: string) => {
  return delete_(`/address/${id}`);
};
