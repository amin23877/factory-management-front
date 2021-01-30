import Axios from 'axios';

export const addRole = async (name:string) => {
    try {
        const resp = await Axios.post('/role', {name});
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

export const getEmployeesRoles = async () => {
    try {
        const resp = await Axios.get('/employee/roles');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateRole = async (id:number, name:string) => {
    try {
        const resp = await Axios.patch(`/role/${id}`, {name});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteRole = async (id:number) => {
    try {
        const resp = await Axios.delete(`/role/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}