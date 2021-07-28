import { delete_, patch, post } from ".";

export interface IQCFlag {
    ItemId: string;
    name: string;
    number: any;
    description?: string;
    section?: string;
}

export const createFlag = (data: IQCFlag) => {
    return post(`/qcflag`, data);
};

export const updateFlag = (flagId: string, data: IQCFlag) => {
    return patch(`/qcflag/${flagId}`, data);
};

export const deleteFlag = (flagId: string) => {
    return delete_(`/qcflag/${flagId}`);
};
