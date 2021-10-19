import { format } from "date-fns";

export const formatDate = (date: string, dateFormat: string) => {
    return format(new Date(date), dateFormat);
};

export const getModifiedValues = (values: any, initialValues: any) => {
    let modifiedValues: any = {};

    if (values) {
        Object.entries(values).forEach((entry) => {
            let key = entry[0];
            let value = entry[1];

            if (value !== initialValues[key]) {
                modifiedValues[key as any] = value;
            }
        });
    }

    return Object.keys(modifiedValues).length === 0 ? null : modifiedValues;
};

export const countProperty = (data: any[], value: string, propGetter: (item: any) => any) => {
    return data.filter((item) => propGetter(item) === value).length;
};

export type ParameterType = {
    [key: string]: string | number | boolean | null | undefined;
};

export const generateQuery = (params: ParameterType) => {
    const queryArray = [];
    let paramValue: any = "";
    
    
    for (const paramName in params) {
        paramValue = params[paramName];
        
        if (paramValue !== null && paramValue !== undefined && paramValue !== "") {
            queryArray.push(`${paramName}=${paramValue}`);
        }
    }
    
    return queryArray.join("&");
};
