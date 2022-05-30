import { patch, post, delete_ } from "api";

export type clusterType = {
  id: string;
  clusterValue: string;
  deviceName: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  __v: number;
};

export const createCluster = (data: Omit<clusterType, "id">) => {
  return post("/cluster", data);
};

export const updateCluster = (id: string, data: Partial<clusterType>) => {
  return patch(`/cluster/${id}`, data);
};

export const deleteCluster = (id: string) => delete_(`/cluster/${id}`);
