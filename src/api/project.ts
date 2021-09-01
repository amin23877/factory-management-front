import {get, post, patch, delete_ } from ".";

export interface IProject {
    id?: string;
    name: string;
}

export const getProjects = () => {
    return get("/project");
};

export const createProject = (name: string) => {
    return post("/project", { name });
};

export const updateProject = (pId: string, data: any) => {
    return patch(`/project/${pId}`, data);
};

export const deleteProject = (pId: string) => {
    return delete_(`/project/${pId}`);
};
