import { get, post, delete_, patch } from ".";

export interface ILogedinEmployee {
  employee: IEmployee;
  token: string;
}

export interface IEmployee {
  id: string;
  username: string;
  password: string;
  email?: string;
  department?: string;
  roles: any[];
  role?: string;
  name?: string;
  lastName?: string;
}

export const getMe = () => {
  return get("/employee/me");
};

export const login = (data: IEmployee) => {
  return post("/employee/login", data);
};

export const addEmployee = (emp: IEmployee) => {
  return post("/employee", emp);
};

export const getAllEmployees = () => {
  return get("/employee");
};

export const getEmployeeRoles = (id: string) => {
  return get(`/employee/${id}/role`);
};

export const deleteEmployee = (id: string) => {
  return delete_(`/employee/${id}`);
};

export const updateEmployee = (id: string, emp: any) => {
  return patch(`/employee/${id}`, emp);
};

export const updateEmployeePassword = (id: string, emp: any) => {
  return post(`/employee/${id}/changepassword`, emp);
};

export const addRoleToEmployee = (empId: string, role: string) => {
  return post(`/employee/${empId}/${role}`, {});
};

export const deleteRoleFromEmployee = (empId: string, role: string) => {
  return delete_(`/employee/${empId}/${role}`);
};
