import { patch, delete_ } from ".";

export const updateJobRecord = (id: string, data: any) => {
  return patch(`/jobrecord/${id}`, data);
};

export const deleteJobRecord = (id: string) => {
  return delete_(`/jobrecord/${id}`);
};
