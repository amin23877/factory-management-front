import Axios from "axios";

export interface IProject {
    id: string;
    name?: string;
    EmployeeId?: string;
    start?: number;
    days?: number;
    note?: string;
    done?: number;
    ProjectId?: string
}

export const createProject = async (data: IProject) => {
    try {
        const resp = await Axios.post("engineering/project", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateProject = async (id: string, data: IProject) => {
    try {
        const resp = await Axios.patch(`engineering/project/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProject = async (id: string) => {
    try {
        const resp = await Axios.delete(`engineering/project/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
