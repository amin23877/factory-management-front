import { ISO } from "../../api/so";
import { formatDate } from "../utils";

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

const countNumberOfClientSOs = (data:ISO[], clientName:string) => {
    return data.filter(so => so.ClientId?.name === clientName).length
}

export const extractClientPieChartData = (data: ISO[]) => {
    let res: any[] = [],
        clientName:string | undefined = "",
        soBasedOnClients:any = {}

    for (const so of data) {
        clientName = so.ClientId?.name;
        if(!clientName) break;

        soBasedOnClients[clientName] = countNumberOfClientSOs(data, clientName);
    }
    
    for(clientName in soBasedOnClients){
        res.push({name:clientName, value:soBasedOnClients[clientName]})
    }
    
    return res;
};
