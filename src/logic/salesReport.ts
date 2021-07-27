import { formatDate } from "./utils";

export const extractChartData = (data: any[]) => {
    let res: any[] = [];
    let cnt = 1;
    res = data.reduce((_, curVal) => {
        return { [formatDate(curVal.date, "yy-MMMM")]: ++cnt };
    });

    res = Object.keys(res).map((k) => ({
        createdAt: k,
        units: res[k as any],
    }));

    console.log(res);
    return res;
};
