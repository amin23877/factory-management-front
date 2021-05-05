import Axios from "axios";

export interface IPO {
    id?: number;
    path?: string;
    number?: string;
    file?: any;
    senderNumber?: string;
    reciever?: number;
    ContactId?: number;
    ClientId?: number;
    EmployeeId?: number;
    ProjectId?: number;
}

export const createPO = async (data: IPO) => {
    try {
        const formData = new FormData();
        formData.append("file", data.file);
        data.number && formData.append("number", data.number);
        data.reciever && formData.append("reciever", String(data.reciever));
        data.ContactId && formData.append("ContactId", String(data.ContactId));
        data.ClientId && formData.append("ClientId", String(data.ClientId));
        data.EmployeeId && formData.append("EmployeeId", String(data.EmployeeId));
        data.ProjectId && formData.append("ProjectId", String(data.ProjectId));

        const resp = await Axios.post(`/po`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updatePO = async (id: number, data: IPO) => {
    try {
        const formData = new FormData();
        formData.append("file", data.file);
        data.number && formData.append("number", data.number);
        data.reciever && formData.append("reciever", String(data.reciever));
        data.ContactId && formData.append("ContactId", String(data.ContactId));
        data.ClientId && formData.append("ClientId", String(data.ClientId));
        data.EmployeeId && formData.append("EmployeeId", String(data.EmployeeId));
        data.ProjectId && formData.append("ProjectId", String(data.ProjectId));

        const resp = await Axios.patch(`/po/${id}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getPO = async () => {
    try {
        const resp = await Axios.get("/po");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deletePO = async (id: number) => {
    try {
        const resp = await Axios.delete(`/po/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
