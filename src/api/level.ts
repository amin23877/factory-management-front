import { get, post, patch, delete_ } from ".";

export interface ILevel {
  id: string;
  name: string;
  clusterValueRef: string;
  valid: string[];
  createdAt: number;
  updatedAt: number;
  __v: number;
}

export const getLevels = () => {
  return get("/level");
};

export const getLevel = (id: string) => {
  return get(`/level/${id}`);
};

export const createLevel = (data: ILevel) => {
  return post("/level", data);
};

export const editLevel = (id: string, data: Partial<ILevel>) => {
  return patch(`/level/${id}`, data);
};

export const deleteLevel = (id: string) => {
  return delete_(`/level/${id}`);
};
