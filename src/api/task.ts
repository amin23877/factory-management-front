import Axios from "axios";
import * as Yup from "yup";

export interface ITask {
    id: string;
    name: string;
    JobId: string;
    description: string;
    deadline: string;
    assigner: string;
    assignee: string;
    TPCId: string;
    priority?:string;
}

export const schema = Yup.object().shape({
    name: Yup.string().required(),
    JobId: Yup.string().required(),
});

export const getTasks = async () => {
    try {
        const resp = await Axios.get("/task");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createTask = async (data: ITask) => {
    try {
        const resp = await Axios.post("/task", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const changeTaskDate = async (id:string, date:string) => {
    try {
        const resp = await updateTask(id, { deadline: date } as any);
        return resp;
    } catch (error) {
        console.log(error);
    }
}

export const updateTask = async (id: string, data: ITask) => {
    try {
        const resp = await Axios.patch(`/task/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTasks = async (id: string) => {
    try {
        const resp = await Axios.delete(`/task/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
