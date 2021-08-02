import { formatDate } from "./utils";

export const extractChartData = (data: any[]) => {
    // FIXME: new algorithm
    let res: any[] = [];
    let cnt = 1;
    // res = data.reduce((_, curVal) => {
    //     return { [formatDate(curVal.so?.createdAt, "yy-MMMM")]: ++cnt };
    // });

    // console.log(res);
    // res = Object.keys(res).map((k) => ({
    //     createdAt: k,
    //     units: res[k as any],
    // }));

    return res;
};
