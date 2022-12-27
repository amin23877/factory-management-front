import { get, post, delete_, patch } from ".";

export interface IRole {
  id: string;
  name: string;
}

export const addRole = (name: string) => {
  return post("/role", { name });
};

export const assignApiToRole = (roleId: string, apis: any) => {
  return post(`/role/${roleId}/api`, apis);
};
export const deassignApiToRole = (roleId: string, apiId: string) => {
  return delete_(`/role/${roleId}/api/${apiId}`);
};

export const getRoles = () => {
  return get("/role");
};

export const getRoleApis = (id: string) => {
  return get(`/role/${id}/api`);
};

export const getEmployeesRoles = () => {
  return get("/employee/roles");
};

export const updateRole = (id: string, data: any) => {
  return patch(`/role/${id}`, data);
};

export const deleteRole = (id: string) => {
  return delete_(`/role/${id}`);
};
