import { formatDate } from "./utils";

export const engApData = (data: any[]) => {
    let res: any[] = [];
    let cnt = 1;
    res = data.reduce((_, curVal) => {
        console.log(curVal);
        return { [formatDate(curVal.createdAt, "yy-MMMM-dd")]: ++cnt };
    });

    res = Object.keys(res).map((k) => ({
        createdAt: k,
        units: res[k as any],
    }));

    console.log(res);
    return res;
};

export const FSHData = (data: any[]) => {
    let res: any[] = [];
    let cnt = 1;
    res = data.reduce((_, curVal) => {
        return { [formatDate(curVal.fsh.createdAt, "yy-MMMM-dd")]: ++cnt };
    });

    res = Object.keys(res).map((k) => ({
        createdAt: k,
        units: res[k as any],
    }));

    console.log(res);
    return res;
};
