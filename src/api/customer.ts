import Axios from "axios";

export interface ICustomer {
    id: string;

    name: string;
    abbr: string;
    location: string;
    refferedBy: string;
    linkedIn: string;
    facebook: string;
    instagram: string;
    website: string;
    prospect: boolean;
    size: "small" | "medium" | "large";
    fax: string;
    parent: number | null;
    defaultBillingContact?: string;
    preferredCompany: string;
    preferredService: string;
    account: string;
    specialInstructions: string;
    allowedShippingPercentOverUnder: number;
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
