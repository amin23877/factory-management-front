import Axios from "axios";

export interface IActivity {
    id?: string;
    name: string;
    subject: string;
    location: string;
    notes: string;
    startTime: string;
    endTime: string;
    allDayActivity: boolean;
    doNotShowOnCalendar: boolean;
    recurring: boolean;
    notifyNow: boolean;
    notifyOnDay: boolean;

    OpportunityId?: number | null;
    
    ClientId: number | null;
    ContactId: number | null;
    ProjectId: number | null;
    EmployeeId: number | null;
    QuoteId: number | null;
    ActivityCategoryId: number | null;
    ActivityStatusId: number | null;
    ActivityPriorityId: number | null;
}

export const ActivityInit:any = {};

export const getActivities = async () => {
    try {
        const resp = await Axios.get("/activity");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getClientActivities = async (clientId:string) => {
    try {
        const resp = await Axios.get(`/activity/client/${clientId}`);
        return resp.data;
    } catch (error) {
        console.log(error); 
    }
}

export const getQuoteActivities = async (quoteId:string) => {
    try {
        const resp = await Axios.get(`/activity/quote/${quoteId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProjectActivities = async (projectId:string) => {
    try {
        const resp = await Axios.get(`/activity/project/${projectId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const createActivity = async (data: IActivity) => {
    try {
        const resp = await Axios.post("/activity", {
            ...data,
            startTime: data.startTime === "" ? null : new Date(data.startTime).toISOString(),
            endTime: data.endTime === "" ? null : new Date(data.endTime).toISOString(),
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateActivity = async (id: string, data: IActivity) => {
    try {
        const resp = await Axios.patch(`/activity/${id}`, {
            ...data,
            startTime: data.startTime === "" ? null : new Date(data.startTime).toISOString(),
            endTime: data.endTime === "" ? null : new Date(data.endTime).toISOString(),
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteActivity = async (id: string) => {
    try {
        const resp = await Axios.delete(`/activity/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
