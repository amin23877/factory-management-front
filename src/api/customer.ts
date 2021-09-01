import { get, post, delete_, patch } from ".";

export interface ICustomer {
    id: string;

    name: string;
    address: string;
    state: string;
    city: string;
    zipcode: string;
    phone: string;
    email: string;
    productLine: string;
    supportStaff: string;
    refferedBy: string;
    linkedId: string;
    facebook: string;
    instagram: string;
    website: string;
    size: string;
    fax: string;
    parent: string;
    status: string;
    regularCommissionPercentage: number;
    overageCommissionPercentage: number;
    CustomerTypeId: string;
}

export const getCustomers = () => {
    return get("/customer");
};

export const addCustomer = (customer: ICustomer) => {
    return post("/customer", customer);
};

export const deleteCustomer = (id: string) => {
    return delete_(`/customer/${id}`);
};

export const editCustomer = (id: string, data: ICustomer) => {
    return patch(`/customer/${id}`, data);
};
