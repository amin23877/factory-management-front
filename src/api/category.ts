import {get, post, patch, delete_ } from ".";

export const getCategories = () => {
    return get("/itemcategory");
};

export const createCategory = (name: string) => {
    return post("/itemcategory", { name });
};

export const updateCategory = (catId: string, name: string) => {
    return patch(`/itemcategory/${catId}`, { name });
};

export const deleteCategory = (catId: string) => {
    return delete_(`/itemcategory/${catId}`);
};
