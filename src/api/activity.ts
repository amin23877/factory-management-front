import Axios from "axios";

export interface IActivity {
    id?: number;
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

export const ActivityInit: IActivity = {
    name: "",
    subject: "",
    location: "",
    notes: "",
    startTime: "",
    endTime: "",
    allDayActivity: false,
    doNotShowOnCalendar: false,
    recurring: false,
    notifyNow: false,
    notifyOnDay: false,
    
    // OpportunityId: null,

    ActivityCategoryId: null,
    ClientId: null,
    ContactId: null,
    ProjectId: null,
    EmployeeId: null,
    QuoteId: null,
    ActivityStatusId: null,
    ActivityPriorityId: null,
};

export const getActivities = async () => {
    try {
        const resp = await Axios.get("/activity");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const getClientActivities = async (clientId:number) => {
    try {
        const resp = await Axios.get(`/activity/client/${clientId}`);
        return resp.data;
    } catch (error) {
        console.log(error); 
    }
}

export const getQuoteActivities = async (quoteId:number) => {
    try {
        const resp = await Axios.get(`/activity/quote/${quoteId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProjectActivities = async (projectId:number) => {
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

export const updateActivity = async (id: number, data: IActivity) => {
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

export const deleteActivity = async (id: number) => {
    try {
        const resp = await Axios.delete(`/activity/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
