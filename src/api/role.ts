import Axios from 'axios';

export interface IRole {
    id: string,
    name: string
}

export const addRole = async (name:string) => {
    try {
        const resp = await Axios.post('/role', {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const assignApiToRole = async (roleId:string, apiId:string) => {
    try {
        const resp = await Axios.post(`/role/${roleId}/api/${apiId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}
export const deassignApiToRole = async (roleId:string, apiId:string) => {
    try {
        const resp = await Axios.delete(`/role/${roleId}/api/${apiId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getRoles = async () => {
    try {
        const resp = await Axios.get('/role');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getRoleApis = async (id:string) => {
    try {
        const resp = await Axios.get(`/role/${id}/api`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getEmployeesRoles = async () => {
    try {
        const resp = await Axios.get('/employee/roles');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateRole = async (id:string, name:string) => {
    try {
        const resp = await Axios.patch(`/role/${id}`, {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteRole = async (id:string) => {
    try {
        const resp = await Axios.delete(`/role/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}