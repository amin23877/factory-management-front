import { patch, delete_ } from ".";

export interface IPQ {
    priority?: string;
    done?: boolean;
}

export const updatePQ = (PQId: string, data: IPQ) => {
    return patch(`/pq/${PQId}`, data);
};

export const deletePQ = (PQId: string) => {
    return delete_(`/pq/${PQId}`);
};
