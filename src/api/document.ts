import { delete_, get, patch, post } from ".";

export interface IDocument {
  id?: string;
  path?: string;
  file: File | string;
  description: string;
}

export const getAllModelDocuments = (model: string, id: string) => {
  return get(`/document/${model}/${id}`);
};

// export const createAModelDocument = (model: string, id: string, file: any, description: string, fileName?: string) => {
export const createAModelDocument = ({
  model,
  id,
  description,
  file,
  fileName,
  number,
  name,
}: {
  model: string;
  id: string;
  file: any;
  description: string;
  fileName?: string;
  name?: string;
  number?: string;
}) => {
  const formData = new FormData();

  formData.append("document", file);
  formData.append("description", description);
  fileName && formData.append("fileName", fileName);
  number && formData.append("number", number);
  name && formData.append("name", name);

  return post(`/document/${model}/${id}`, formData);
};

export const updateAModelDocument = (docid: string, file: any, description: string) => {
  const formData = new FormData();
  formData.append("document", file);
  formData.append("description", description);

  return patch(`/document/${docid}`, formData);
};

export const deleteAModelDocument = (docid: string) => {
  return delete_(`/document/${docid}`);
};
