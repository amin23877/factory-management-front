import { getWeekOfMonth } from "date-fns";

import { formatDate } from "../utils";

import { ISO } from "../../api/so";
import { IUnit } from "../../api/units";

export const extractChartData = (data: any[]) => {
    let res: any[] = [];
    let cnt = 1;
    res = data.reduce((_, curVal) => {
        return { [formatDate(curVal.so?.createdAt, "yy-MMMM")]: ++cnt };
    }, {});

    res = Object.keys(res).map((k) => ({
        createdAt: k,
        units: res[k as any],
    }));

    return res;
};

const countProperty = (data: any[], value:string, propGetter: (item:any) => any) => {
    return data.filter((item) => propGetter(item) === value).length;
};
const countNumberOfClientSOs = (data: ISO[], clientName: string) => {
    return data.filter((so) => so.ClientId?.name === clientName).length;
};

export const extractClientPieChartData = (data: ISO[]) => {
    let res: any[] = [],
        clientName: string | undefined = "",
        soBasedOnClients: any = {};

    for (const so of data) {
        clientName = so.ClientId?.name;
        if (!clientName) break;

        soBasedOnClients[clientName] = countNumberOfClientSOs(data, clientName);
    }

    for (clientName in soBasedOnClients) {
        res.push({ name: clientName, value: soBasedOnClients[clientName] });
    }

    return res;
};

export const extractSalesVsWeek = (data: ISO[]) => {
    return data.map((so) => ({ week: getWeekOfMonth(so.createdAt), totalAmount: so.totalAmount || 0 }));
};

export const extractDevicesSales = (data: IUnit[]) => {
    let res: any[] = [],
        productFamily: string | undefined = "",
        devices: any = {};

    for (const unit of data) {
        productFamily = (unit.ItemId as any)["Product Family"] || "";
        if (!productFamily) break;

        devices[productFamily] = countProperty(data, productFamily, (item) => item.ItemId["Product Family"] || "");
    }

    for (productFamily in devices) {
        res.push({ name:productFamily, value: devices[productFamily] });
    }

    return res;
};
