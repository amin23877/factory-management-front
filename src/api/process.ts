import { delete_, patch, post } from "api";

export interface IProcess {
  id: string;
  title: string;
  description: string;
  no: string;
  type: string;
  ItemId: string;
  realeased: boolean;
}

// export const deleteTaskList = (id: string) => delete_(`/process/${id}`);

export const createProcess = (data: IProcess) => {
  return post("/process", data);
};

// export const changeTask = (id: string, data: IProcess) => {
//   return patch(`/task/${id}`, data);
// };
