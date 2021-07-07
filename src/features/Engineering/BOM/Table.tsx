import React, { useMemo } from "react";

import { DataGrid, GridColumns, GridRowsProp } from "@material-ui/data-grid";
import { randomPhoneNumber, randomTraderName } from "@material-ui/x-grid-data-generator";
import { BasePaper } from "../../../app/Paper";

export default function BOMTable({
    cluster,
    levels,
    partnumbers,
}: {
    cluster: string;
    levels: string[];
    partnumbers: number;
}) {
    const rows = useMemo<GridRowsProp>(() => {
        const res: any = {};
        res.id = Math.floor(Math.random() * 100);
        res[cluster] = "Micro";
        levels.map((l) => (res[l] = "-level-"));
        for (let index = 0; index < partnumbers; index++) {
            res[`part${index}`] = randomPhoneNumber();
        }

        console.log([res]);
        return [res];
    }, [cluster, levels, partnumbers]);

    const columns = useMemo<GridColumns>(() => {
        const res = [];
        res.push({ field: cluster, headerName: cluster, type: "string", editable: false, width: 100 });
        levels.map((l) => res.push({ field: l, headerName: l, type: "string", editable: false }));
        for (let index = 0; index < partnumbers; index++) {
            res.push({ field: `part${index}`, headerName: `Part${index}`, type: "string", editable: true, flex: 1 });
        }

        return res;
    }, [cluster, levels, partnumbers]);

    return (
        <BasePaper style={{ height: 500, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} />
        </BasePaper>
    );
}
