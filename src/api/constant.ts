import { patch } from "api";

export interface IConstant {
  type?: string;
  values: string[];
  key: string;
  id: string;
}

export const updateAConstant = (id: string, data: any) => {
  return patch(`/constant/${id}`, data);
};
