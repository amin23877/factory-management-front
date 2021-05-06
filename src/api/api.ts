import Axios from 'axios';

export interface IApi {
    id:string,
    route: string,
    method: string,
    routerFile: string,
    validInputs: string[]
  }

export const getApis = async () => {
    try {
        const resp = await Axios.get('/api');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const filterRoleApis = (apis:IApi[], roleApis:IApi[]) => {
    return apis.filter(api => !roleApis.includes(api));
}