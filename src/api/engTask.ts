import Axios from "axios";

export const createAManTask = async (
    ItemId: string,
    name: string,
    date: any,
    hours: number,
    description: string,
    priority: any,
    buildToStock: any,
    engAP: any,
    relatedPartNumber: string
) => {
    try {
        const newDate = new Date(date);
        const resp = await Axios.post(`/engineering/manufacturing/task`, {
            ItemId,
            name,
            date,
            hours,
            description,
            priority,
            buildToStock,
            engAP,
            relatedPartNumber,
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createAEvalTask = async (
    ItemId: string,
    name: string,
    date: any,
    hours: number,
    description: string,
    priority: any,
    buildToStock: any,
    engAP: any,
    relatedPartNumber: string
) => {
    try {
        const resp = await Axios.post(`/engineering/eval/task`, {
            ItemId,
            name,
            date,
            hours,
            description,
            priority,
            buildToStock,
            engAP,
            relatedPartNumber,
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createATestTask = async (
    ItemId: string,
    name: string,
    date: any,
    hours: number,
    description: string,
    priority: any,
    buildToStock: any,
    engAP: boolean,
    relatedPartNumber: string
) => {
    try {
        const resp = await Axios.post(`/testTask`, {
            ItemId,
            name,
            date,
            hours,
            description,
            priority,
            buildToStock,
            engAP,
            relatedPartNumber,
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createAFieldTask = async (
    ItemId: string,
    name: string,
    date: any,
    hours: number,
    description: string,
    priority: any,
    buildToStock: any,
    engAP: any,
    relatedPartNumber: string
) => {
    try {
        const resp = await Axios.post(`/fieldStartUpTask`, {
            ItemId,
            name,
            date,
            hours,
            description,
            priority,
            buildToStock,
            engAP,
            relatedPartNumber,
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAManTask = async (
    Taskid: string,
    name: string,
    date: any,
    hours: number,
    description: string,
    priority: any,
    buildToStock: any,
    engAP: any,
    relatedPartNumber: string
) => {
    try {
        const resp = await Axios.patch(`/engineering/manufacturing/task/${Taskid}`, {
            name,
            date,
            hours,
            description,
            priority,
            buildToStock,
            engAP,
            relatedPartNumber,
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAEvalTask = async (
    Taskid: string,
    name: string,
    date: any,
    hours: number,
    description: string,
    priority: any,
    buildToStock: any,
    engAP: any,
    relatedPartNumber: string
) => {
    try {
        const resp = await Axios.patch(`/engineering/eval/task/${Taskid}`, {
            name,
            date,
            hours,
            description,
            priority,
            buildToStock,
            engAP,
            relatedPartNumber,
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateATestTask = async (
    Taskid: string,
    name: string,
    date: any,
    hours: number,
    description: string,
    priority: any,
    buildToStock: any,
    engAP: any,
    relatedPartNumber: string
) => {
    try {
        const resp = await Axios.patch(`/testTask/${Taskid}`, {
            name,
            date,
            hours,
            description,
            priority,
            buildToStock,
            engAP,
            relatedPartNumber,
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAFieldTask = async (
    Taskid: string,
    name: string,
    date: any,
    hours: number,
    description: string,
    priority: any,
    buildToStock: any,
    engAP: any,
    relatedPartNumber: string
) => {
    try {
        const resp = await Axios.patch(`/fieldStartUpTask/${Taskid}`, {
            name,
            date,
            hours,
            description,
            priority,
            buildToStock,
            engAP,
            relatedPartNumber,
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAManTask = async (Taskid: string) => {
    try {
        const resp = await Axios.delete(`/engineering/manufacturing/task/${Taskid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAEvalTask = async (Taskid: string) => {
    try {
        const resp = await Axios.delete(`/engineering/eval/task/${Taskid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteATestTask = async (Taskid: string) => {
    try {
        const resp = await Axios.delete(`/testTask/${Taskid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAFieldTask = async (Taskid: string) => {
    try {
        const resp = await Axios.delete(`/fieldStartUpTask/${Taskid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
