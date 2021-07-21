import { delete_, patch, post } from ".";

export interface IManufaturingTask {
    ItemId: string;
    name: string;
    date: any;
    hours?: number;
    description?: string;
    priority?: string;
    buildToStock?: boolean;
    engAP?: boolean;
    relatedPartName?: string;
}

export const createAManTask = (data: IManufaturingTask) => {
    return post(`/engineering/manufacturing/task`, data);
};

export const createAEvalTask = (data: IManufaturingTask) => {
    return post(`/engineering/eval/task`, data);
};

export const createATestTask = (data: IManufaturingTask) => {
    return post(`/engineering/test/task`, data);
};

export const createAFieldTask = (data: IManufaturingTask) => {
    return post(`/engineering/fieldstartup/task`, data);
};

export const updateAManTask = (taskId:string, data: IManufaturingTask) => {
    return patch(`/engineering/manufacturing/task/${taskId}`, data);
};

export const updateAEvalTask = (taskId:string, data: IManufaturingTask) => {
    return patch(`/engineering/eval/task/${taskId}`, data);
};

export const updateATestTask = (taskId:string, data: IManufaturingTask) => {
    return patch(`/engineering/test/task/${taskId}`, data);
};

export const updateAFieldTask = (taskId:string, data: IManufaturingTask) => {
    return patch(`/engineering/fieldstartup/task/${taskId}`, data);
};

export const deleteAManTask = (taskId: string) => {
    return delete_(`/engineering/manufacturing/task/${taskId}`);
};

export const deleteAEvalTask = (taskId: string) => {
    return delete_(`/engineering/eval/task/${taskId}`);
};

export const deleteATestTask = (taskId: string) => {
    return delete_(`/engineering/test/task/${taskId}`);
};

export const deleteAFieldTask = (taskId: string) => {
    return delete_(`/engineering/fieldstartup/task/${taskId}`);
};
