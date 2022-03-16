import { get, post, patch, delete_ } from ".";

export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  mi: string;
  prefix: string;
  number: string;
  active: boolean;
  title: string;
  department: string;
  phones: {
    phone: string;
    phoneType: string;
    ext: string;
    main: boolean;
  }[];
  emails: {
    email: string;
    emailType: string;
    main: boolean;
  }[];
  type: string;
  AddressId: string;
}

export const getContacts = () => {
  return get("/contact");
};

export const getAllModelContact = (model: string, id: string) => {
  return get(`/contact/${model}/${id}`);
};

export const createAModelContact = (model: string, id: string, data: IContact) => {
  return post(`/contact/${model}/${id}`, data);
};

export const updateAModelContact = (id: string, data: IContact) => {
  return patch(`/contact/${id}`, data);
};

export const deleteAModelContact = (id: string) => {
  return delete_(`/contact/${id}`);
};
