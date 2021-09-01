import { post, patch, delete_ } from ".";

export interface IProject {
    id: string;
    name?: string;
    EmployeeId?: string;
    start?: number;
    days?: number;
    note?: string;
    done?: number;
    ProjectId?: string;
}

export const createProject = (data: IProject) => {
    return post("engineering/project", data);
};

export const updateProject = (id: string, data: IProject) => {
    return patch(`engineering/project/${id}`, data);
};

export const deleteProject = (id: string) => {
    return delete_(`engineering/project/${id}`);
};
