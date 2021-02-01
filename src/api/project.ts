import Axios from 'axios';

export const getProjects = async () => {
    try {
        const resp = await Axios.get('/project');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const createProject = async (name:string) => {
    try {
        const resp = await Axios.post('/project',{name});
    return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateProject = async (pId:number, data:any) => {
    try {
        const resp = await Axios.patch(`/project/${pId}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProject = async (pId:number) => {
    try {
        const resp = await Axios.delete(`/project/${pId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}