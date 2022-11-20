import { post } from ".";

export const verifyEmailReq = (employeeId: string, data: any) => {
  return post(`/employee/${employeeId}/verifyemail/req`, data);
};

export const verifyCode = (employeeId: string, data: any) => {
  return post(`/employee/${employeeId}/verifyemail/code`, data);
};
