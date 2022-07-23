import { delete_, patch, post } from "api";
import { ITaskList } from "./taskList";

export interface IProcess {
  id: string;
  title: string;
  description: string;
  no: string;
  type: string;
  ItemId: string;
  realeased: boolean;
  tasks?: any[];
}
export interface ITask {
  id: string;
  TaskId: ITaskList | string;
  majorStep: number;
  minorStep: number;
}

export const deleteProcess = (id: string) => delete_(`/process/${id}`);

export const createProcess = (data: IProcess) => {
  return post("/process", data);
};

export const changeProcess = (id: string, data: IProcess) => {
  return patch(`/process/${id}`, data);
};
export const deleteSubProcess = (id: string, major: number, minor: number) =>
  delete_(`/process/${id}/step/${major}/${minor}`);

export const createSubProcess = (id: string, TaskId: string, data: ITask) => {
  return post(`/process/${id}/step/${TaskId}`, data);
};

export const changeSubProcess = (id: string, major: number, minor: number, data: ITask) => {
  return patch(`/process/${id}/step/${major}/${minor}`, data);
};
