import { patch } from ".";

export interface IMonitorVariable {
    name: string;
    target: string;
    lname: string;
}

export interface IMonitorRule {
    MatriceIds: string[];
    vars: IMonitorVariable[];
    engAP: boolean;
    enable: boolean;
    id: string;
    section: string;
    levelName: string;
    name: string;
    description: string;
    date: string;
    assertion: string;
}

export const updateRule = (ruleId: string, data:IMonitorRule) => {
    return patch(`/monitor/${ruleId}`, data);
};
