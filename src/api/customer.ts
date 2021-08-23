import Axios from "axios";

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

export const getCustomers = async () => {
    try {
        const resp = await Axios.get("/customer");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const addCustomer = async (customer: ICustomer) => {
    try {
        const resp = await Axios.post("/customer", customer);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteCustomer = async (id: string) => {
    try {
        const resp = await Axios.delete(`/customer/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const editCustomer = async (id: string, data: ICustomer) => {
    try {
        const resp = await Axios.patch(`/customer/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
