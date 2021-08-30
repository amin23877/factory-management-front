import { delete_, get, patch, post } from ".";

export interface IPO {
    id?: string;
    path?: string;
    number?: string;
    file?: any;
    senderNumber?: string;
    reciever?: string;
    ContactId?: string;
    ClientId?: string;
    EmployeeId?: string;
    ProjectId?: string;
}

export const createPO = (data: IPO) => {
    const formData = new FormData();
    formData.append("file", data.file);
    data.number && formData.append("number", data.number);
    data.reciever && formData.append("reciever", String(data.reciever));
    data.ContactId && formData.append("ContactId", String(data.ContactId));
    data.ClientId && formData.append("ClientId", String(data.ClientId));
    data.EmployeeId && formData.append("EmployeeId", String(data.EmployeeId));
    data.ProjectId && formData.append("ProjectId", String(data.ProjectId));

    return post(`/po`, formData);
};

export const updatePO = (id: string, data: IPO) => {
    const formData = new FormData();
    formData.append("file", data.file);
    data.number && formData.append("number", data.number);
    data.reciever && formData.append("reciever", String(data.reciever));
    data.ContactId && formData.append("ContactId", String(data.ContactId));
    data.ClientId && formData.append("ClientId", String(data.ClientId));
    data.EmployeeId && formData.append("EmployeeId", String(data.EmployeeId));
    data.ProjectId && formData.append("ProjectId", String(data.ProjectId));

    return patch(`/po/${id}`, formData);
};

export const getPO = () => {
    return get("/po");
};

export const deletePO = (id: string) => {
    return delete_(`/po/${id}`);
};
