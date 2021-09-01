import { delete_, get, patch, post } from ".";

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

export const getActivities = () => {
    return get("/activity");
};

export const getClientActivities = (clientId: string) => {
    return get(`/activity/client/${clientId}`);
};

export const getQuoteActivities = (quoteId: string) => {
    return get(`/activity/quote/${quoteId}`);
};

export const getProjectActivities = (projectId: string) => {
    return get(`/activity/project/${projectId}`);
};

export const createActivity = (data: IActivity) => {
    return post("/activity", data);
};

export const updateActivity = (id: string, data: IActivity) => {
    return patch(`/activity/${id}`, data);
};

export const deleteActivity = (id: string) => {
    return delete_(`/activity/${id}`);
};
