import Axios from "axios";

export interface IJob {
    id: string;
    name: string;
    ContactId: string;
    LineServiceRecordId: string;
    tags: string;
    callTime: number;
    description: string;
    status: string;
    deadline: number;
}

export const getJobs = async () => {
    try {
        const resp = await Axios.get("/job");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createJob = async (data: IJob) => {
    try {
        const resp = await Axios.post("/job", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateJob = async (id: string, data: IJob) => {
    try {
        const resp = await Axios.patch(`/job/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteJobs = async (id: string) => {
    try {
        const resp = await Axios.delete(`/job/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
