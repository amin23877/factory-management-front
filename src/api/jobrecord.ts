import { post, patch, delete_ } from ".";

export const updateJobRecord = (id: string, data: any) => {
  return patch(`/jobrecord/${id}`, data);
};

export const deleteJobRecord = (id: string) => {
  return delete_(`/jobrecord/${id}`);
};

export const createJobRecord = (data: { JOBId: string; parent: string; ItemId: string; usage: number }) => {
  return post(`/jobrecord`, data);
};
