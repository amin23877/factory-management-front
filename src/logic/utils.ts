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