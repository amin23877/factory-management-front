import { delete_, post } from "api";

export type photoType = {
  id: string;
  path: string;
  createdAt: number;
  updatedAt: number;
  __v: number;
};

export const addPhoto = ({ model, id, photo }: { model: string; id: string; photo: any }) => {
  const formData = new FormData();
  formData.append("photo", photo);

  return post<photoType[]>(`/photo/${model}/${id}`, formData);
};

export const deletePhoto = (id: string) => {
  return delete_(`/photo/${id}`);
};
