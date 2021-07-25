import { post, delete_ } from ".";

export interface IManufacturingStep {
    number: number;
    [key: string]: string | number;
}

export type stepType = "manufacturing" | "eval" | "test" | "fieldstartup";
type stepRequestType = { TaskId: string; steps: IManufacturingStep[]; rename?: any; unset?: any };

export const createStep = (type: stepType, data: stepRequestType) => {
    return post(`/engineering/${type}/step`, data);
};

export const deleteStep = (type: stepType, taskId: string, stepNumber: string) => {
    return delete_(`/engineering/${type}/step/${stepNumber}`, { TaskId: taskId });
};

export const addFileToStep = (type: stepType, taskId: string, stepNumber: string, files: File) => {
    const formData = new FormData();
    formData.append(stepNumber, files);

    return post(`engineering/${type}/step/${taskId}/file`, formData);
};

export const deleteFileFromStep = (type: stepType, taskId: string, url: string) => {
    return delete_(`engineering/${type}/step/${taskId}/file`, null, { data: { url } });
};
