import Axios from "axios";

export const getChildItems = async (parentItemId: string) => {
    try {
        const resp = await Axios.get(`/item/${parentItemId}/bundle`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const addChildItem = async (parentItemId: string, childItemId: string) => {
    try {
        const resp = await Axios.post(`/item/${parentItemId}/bundle`, { child: childItemId });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateChildItem = async (parentItemId: string, childItemId: string, qty: number, vendor: string) => {
    try {
        const resp = await Axios.patch(`/item/${parentItemId}/bundle`, { child: childItemId, qty, vendor });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAChildItem = async (parentItemId: string, childItemId: string) => {
    try {
        const resp = await Axios.delete(`/item/${parentItemId}/bundle`, { data: { child: childItemId } });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
