import { delete_, get, patch, post } from "api";
import { IItem } from "./items";

export interface ITaskList {
  id: string;
  type: string;
  title: string;
  instruction: string;
  relatedParts?: string[] | IItem[];
  builtToStock: boolean;
}

export const deleteTaskList = (id: string) => delete_(`/task/${id}`);

export const createTask = (data: ITaskList) => {
  return post("/task", data);
};

export const changeTask = (id: string, data: any) => {
  return patch(`/task/${id}`, data);
};
