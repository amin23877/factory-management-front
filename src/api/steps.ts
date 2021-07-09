import Axios from "axios";


export const createAManStep = async (ItemId: string, name: string, file: any, description: string, number: any, hours: any) => {
    try {
        const formData = new FormData();
        console.log(file);
        for (const f of file) {
            formData.append("illustration", f);
        };
        formData.append("name", name);
        formData.append("ItemId", ItemId);
        formData.append("number", number);
        formData.append("hours", hours);
        formData.append("description", description);
        const resp = await Axios.post(`/manstep`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createAEvalStep = async (ItemId: string, name: string, file: any, description: string, number: any, hours: any) => {
    try {
        const formData = new FormData();
        for (const f of file) {
            formData.append("illustration", f);
        };
        formData.append("name", name);
        formData.append("ItemId", ItemId);
        formData.append("number", number);
        formData.append("hours", hours);
        formData.append("description", description);
        const resp = await Axios.post(`/evalStep`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createATestStep = async (ItemId: string, name: string, file: any, description: string, number: any, hours: any) => {
    try {
        const formData = new FormData();
        for (const f of file) {
            formData.append("illustration", f);
        };
        formData.append("name", name);
        formData.append("ItemId", ItemId);
        formData.append("number", number);
        formData.append("hours", hours);
        formData.append("description", description);
        const resp = await Axios.post(`/teststep`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createAFieldStep = async (ItemId: string, name: string, file: any, description: string, number: any, hours: any) => {
    try {
        const formData = new FormData();
        for (const f of file) {
            formData.append("illustration", f);
        };
        formData.append("name", name);
        formData.append("ItemId", ItemId);
        formData.append("number", number);
        formData.append("hours", hours);
        formData.append("description", description);
        const resp = await Axios.post(`/fieldStartUpStep`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};


export const updateAManStep = async (stepid: string, name: string, file: any, description: string, number: any, hours: any) => {
    try {
        const formData = new FormData();
        for (const f of file) {
            formData.append("illustration", f);
        };
        formData.append("name", name);
        formData.append("number", number);
        formData.append("hours", hours);
        formData.append("description", description);
        const resp = await Axios.patch(`/manStep/${stepid}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAEvalStep = async (stepid: string, name: string, file: any, description: string, number: any, hours: any) => {
    try {
        const formData = new FormData();
        for (const f of file) {
            formData.append("illustration", f);
        };
        formData.append("name", name);
        formData.append("number", number);
        formData.append("hours", hours);
        formData.append("description", description);
        const resp = await Axios.patch(`/evalStep/${stepid}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateATestStep = async (stepid: string, name: string, file: any, description: string, number: any, hours: any) => {
    try {
        const formData = new FormData();
        for (const f of file) {
            formData.append("illustration", f);
        };
        formData.append("name", name);
        formData.append("number", number);
        formData.append("hours", hours);
        formData.append("description", description);
        const resp = await Axios.patch(`/testStep/${stepid}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAFieldStep = async (stepid: string, name: string, file: any, description: string, number: any, hours: any) => {
    try {
        const formData = new FormData();
        for (const f of file) {
            formData.append("illustration", f);
        };
        formData.append("name", name);
        formData.append("number", number);
        formData.append("hours", hours);
        formData.append("description", description);
        const resp = await Axios.patch(`/fieldStartUpStep/${stepid}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAManStep = async (stepid: string) => {
    try {
        const resp = await Axios.delete(`/manStep/${stepid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAEvalStep = async (stepid: string) => {
    try {
        const resp = await Axios.delete(`/evalStep/${stepid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteATestStep = async (stepid: string) => {
    try {
        const resp = await Axios.delete(`/testStep/${stepid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAFieldStep = async (stepid: string) => {
    try {
        const resp = await Axios.delete(`/fieldStartUpStep/${stepid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};