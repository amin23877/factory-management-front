import Axios from 'axios';

export interface ILogedinEmployee {
    employee: IEmployee;
    token: string;
}

export interface IEmployee {
    id?: string;
    username: string;
    password: string;
}

export const getMe = async () => {
    try {
        const resp = await Axios.get('/employee/me');
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const login = async (data:IEmployee) => {
    try {
        const resp = await Axios.post('/employee/login', data)
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const addEmployee = async (emp:IEmployee) => {
    try {
        const resp = await Axios.post('/employee', emp);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllEmployees = async () => {
    try {
        const resp = await Axios.get('/employee');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getEmployeeRoles = async (id:string) => {
    try {
        const resp = await Axios.get(`/employee/${id}/role`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteEmployee = async (id:string) => {
    try {
        const resp = await Axios.delete(`/employee/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const addRoleToEmployee = async (empId:string, role:string) => {
    try {
        const resp = await Axios.post(`/employee/${empId}/${role}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteRoleFromEmployee = async (empId:string, role:string) => {
    try {
        const resp = await Axios.delete(`/employee/${empId}/${role}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}