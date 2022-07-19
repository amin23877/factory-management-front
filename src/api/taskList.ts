import { delete_ } from "api";

export interface ITaskList {
  id: string;
  type: string;
  title: string;
  instruction: string;
  relatedPart: string;
  builtToStock: boolean;
}

export const deleteTaskList = (id: string) => delete_(`/task/${id}`);
