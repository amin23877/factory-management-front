import Axios from "axios";


export const createAManStep = async (TaskId: string, name: string, file: any, description: string, number: any, relatedPartNumber: string) => {
    try {
        const formData = new FormData();
        if (file) {
            for (const f of file) {
                formData.append("illustration", f);
            };
        }
        formData.append("name", name);
        formData.append("relatedPartNumber", relatedPartNumber);
        formData.append("TaskId", TaskId);
        formData.append("number", number);
        formData.append("description", description);
        const resp = await Axios.post(`/engineering/manufacturing/step`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createAEvalStep = async (TaskId: string, name: string, file: any, description: string, number: any, relatedPartNumber: string) => {
    try {
        const formData = new FormData();
        if (file) {
            for (const f of file) {
                formData.append("illustration", f);
            };
        }
        formData.append("name", name);
        formData.append("relatedPartNumber", relatedPartNumber);
        formData.append("TaskId", TaskId);
        formData.append("number", number);
        formData.append("description", description);
        const resp = await Axios.post(`/engineering/eval/step`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createATestStep = async (TaskId: string, name: string, file: any, description: string, number: any, relatedPartNumber: string) => {
    try {
        const formData = new FormData();
        if (file) {
            for (const f of file) {
                formData.append("illustration", f);
            };
        }
        formData.append("name", name);
        formData.append("relatedPartNumber", relatedPartNumber);
        formData.append("TaskId", TaskId);
        formData.append("number", number);
        formData.append("description", description);
        const resp = await Axios.post(`/teststep`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
export const createAFieldStep = async (TaskId: string, name: string, file: any, description: string, number: any, relatedPartNumber: string) => {
    try {
        const formData = new FormData();
        if (file) {
            for (const f of file) {
                formData.append("illustration", f);
            };
        }
        formData.append("name", name);
        formData.append("relatedPartNumber", relatedPartNumber);
        formData.append("TaskId", TaskId);
        formData.append("number", number);
        formData.append("description", description);
        const resp = await Axios.post(`/fieldStartUpStep`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};


export const updateAManStep = async (stepid: string, name: string, file: any, description: string, number: any, relatedPartNumber: string) => {
    try {
        const formData = new FormData();
        if (file) {
            for (const f of file) {
                formData.append("illustration", f);
            };
        }
        formData.append("name", name);
        formData.append("relatedPartNumber", relatedPartNumber);
        formData.append("number", number);
        formData.append("description", description);
        const resp = await Axios.patch(`/engineering/manufacturing/step/${stepid}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAEvalStep = async (stepid: string, name: string, file: any, description: string, number: any, relatedPartNumber: string) => {
    try {
        const formData = new FormData();
        if (file) {
            for (const f of file) {
                formData.append("illustration", f);
            };
        }
        formData.append("name", name);
        formData.append("relatedPartNumber", relatedPartNumber);
        formData.append("number", number);
        formData.append("description", description);
        const resp = await Axios.patch(`/engineering/eval/step/${stepid}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateATestStep = async (stepid: string, name: string, file: any, description: string, number: any, relatedPartNumber: string) => {
    try {
        const formData = new FormData();
        if (file) {
            for (const f of file) {
                formData.append("illustration", f);
            };
        }
        formData.append("name", name);
        formData.append("relatedPartNumber", relatedPartNumber);
        formData.append("number", number);
        formData.append("description", description);
        const resp = await Axios.patch(`/testStep/${stepid}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAFieldStep = async (stepid: string, name: string, file: any, description: string, number: any, relatedPartNumber: string) => {
    try {
        const formData = new FormData();
        if (file) {
            for (const f of file) {
                formData.append("illustration", f);
            };
        }
        formData.append("name", name);
        formData.append("relatedPartNumber", relatedPartNumber);
        formData.append("number", number);
        formData.append("description", description);
        const resp = await Axios.patch(`/fieldStartUpStep/${stepid}`, formData);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAManStep = async (stepid: string) => {
    try {
        const resp = await Axios.delete(`/engineering/manufacturing/step/${stepid}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAEvalStep = async (stepid: string) => {
    try {
        const resp = await Axios.delete(`/engineering/eval/step/${stepid}`);
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