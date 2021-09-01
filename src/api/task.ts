import * as Yup from "yup";
import { delete_, get, patch, post } from ".";

export interface ITask {
    id: string;
    name: string;
    JobId: string;
    description: string;
    deadline: string;
    assigner: string;
    assignee: string;
    TPCId: string;
    priority?: string;
}

export const schema = Yup.object().shape({
    name: Yup.string().required(),
    JobId: Yup.string().required(),
});

export const getTasks = () => {
    return get("/task");
};

export const createTask = (data: ITask) => {
    return post("/task", data);
};

export const changeTaskDate = (id: string, date: string) => {
    return updateTask(id, { deadline: date } as any);
};

export const updateTask = (id: string, data: ITask) => {
    return patch(`/task/${id}`, data);
};

export const deleteTasks = (id: string) => {
    return delete_(`/task/${id}`);
};
