import { getWeek } from "date-fns";

import { formatDate, countProperty } from "../utils";

import { ISO } from "../../api/so";
import { IUnit } from "../../api/units";

export const extractChartData = (data: any[]) => {
    let res: any[] = [];
    let cnt = 1;
    res =
        data.reduce &&
        data.reduce((_, curVal) => {
            return { [formatDate(curVal.so?.date, "yy-MMMM")]: ++cnt };
        }, {});

    res =
        res &&
        Object.keys(res).map((k) => ({
            date: k,
            units: res[k as any],
        }));

    return res;
};

export const extractSalesVsWeek = (data: ISO[]) => {
    let res: any[] = [],
        totalAmounts: any = {};
    const filtered = data.filter((so) => Boolean(so.totalAmount));
    filtered.forEach((so) => (totalAmounts[getWeek(so.date).toString()] = 0));

    for (const so of filtered) {
        totalAmounts[getWeek(so.date).toString()] += so.totalAmount;
    }

    for (const week in totalAmounts) {
        res.push({ week, totalAmount: totalAmounts[week] });
    }

    return res;
};

export const extractClientPieChartData = (data: any[]) => {
    let res: any[] = [],
        clientName: string | undefined = "",
        soBasedOnClients: any = {};
    const filtered = data.filter((c) => Boolean(c.client));

    for (const so of filtered) {
        soBasedOnClients[so.client.name] = countProperty(filtered, so.client.name, (item) => item.client.name);
    }

    for (clientName in soBasedOnClients) {
        res.push({ name: clientName, value: soBasedOnClients[clientName] });
    }

    return res;
};

export const extractDevicesSales = (data: IUnit[]) => {
    let res: any[] = [],
        productFamily: string | undefined = "",
        devices: any = {};

    for (const unit of data) {
        productFamily = unit.ItemId ? (unit.ItemId as any)["Product Family"] : "";
        if (!productFamily) break;

        devices[productFamily] = countProperty(data, productFamily, (item) => {
            return item.itemProductFamily || "";
        });
    }

    for (productFamily in devices) {
        res.push({ name: productFamily, value: devices[productFamily] });
    }

    return res;
};

export const extractSalesLocation = (data: ISO[]) => {
    let res: any[] = [],
        sales: any = {};
    const filtered = data.filter((so) => Boolean(so.location));

    for (const so of filtered) {
        sales[so.location] = countProperty(data, so.location, (item) => item.location);
    }

    for (const so in sales) {
        res.push({ name: so, value: sales[so] });
    }

    return res;
};

export const extractSalesRep = (data: any[]) => {
    let res: any[] = [],
        sales: any = {};
    const filtered = data.filter((so) => Boolean(so.repOrAgency));

    for (const so of filtered) {
        sales[so.repOrAgency.name] = countProperty(filtered, so.repOrAgency.name, (item) => item.repOrAgency.name);
    }

    for (const so in sales) {
        res.push({ name: so, value: sales[so] });
    }

    return res;
};
