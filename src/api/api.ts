import { get } from ".";

export interface IApi {
    id: string;
    route: string;
    method: string;
    routerFile: string;
    validInputs: string[];
}

export const getApis = () => {
    return get("/api");
};

export const filterRoleApis = (apis: IApi[], roleApis: IApi[]) => {
    return apis.filter((api) => !roleApis.includes(api));
};
