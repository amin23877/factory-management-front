import { get, post, patch, delete_ } from ".";

export const getFamilies = () => {
    return get("/itemfamily");
};

export const createFamily = (name: string) => {
    return post("/itemfamily", { name });
};

export const updateFamily = (familyId: string, name: string) => {
    return patch(`/itemfamily/${familyId}`, { name });
};

export const deleteFamily = (familyId: string) => {
    return delete_(`/itemfamily/${familyId}`);
};
