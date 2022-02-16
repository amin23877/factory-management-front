import { get, post, delete_, patch } from ".";

export interface IClient {
  id: string;
  name: string;
  location: string;
  phone: string;
  ext: string;
  website: string;
  type: string;
  qbid: string;
  parent: string;
  number: string;
  size: string;
  fax: string;
  billingAdressId: string;
  billingContactId: string;
  shippingAddress: string;
  ContactId: string;

  approved: boolean;
}

export const getClients = () => {
  return get("/client");
};

export const addClient = (client: IClient) => {
  return post("/client", client);
};

export const deleteClient = (id: string) => {
  return delete_(`/client/${id}`);
};

export const editClient = (id: string, data: Partial<IClient>) => {
  return patch(`/client/${id}`, data);
};
