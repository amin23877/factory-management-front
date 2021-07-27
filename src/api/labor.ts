import { post } from ".";

export interface ILabor {
    TPH: number;
    MPH: number;
    EPH: number;
}

export const postLabor = async (data: ILabor) => {
    return post("/labor", data);
};
