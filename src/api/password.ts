import { post } from ".";

export const verifyEmailReq = (employeeId: string, data: any) => {
  return post(`/employee/${employeeId}/verifyemail/req`, data);
};

export const verifyCode = (employeeId: string, data: any) => {
  return post(`/employee/${employeeId}/verifyemail/code`, data);
};

export const forgetPassReq = (data: any) => {
  return post(`/employee/forgetpass/req`, data);
};

export const forgetPassCode = (data: any) => {
  return post(`/employee/forgetpass/code`, data);
};
