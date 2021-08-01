import { patch, delete_ } from ".";

export interface IFSQ {
    priority?: string;
    done?: boolean;
}

export const updateFSQ = (FSQId: string, data: IFSQ) => {
    return patch(`/fsh/${FSQId}`, data);
};

export const deleteFSQ = (FSQId: string) => {
    return delete_(`/fsh/${FSQId}`);
};
