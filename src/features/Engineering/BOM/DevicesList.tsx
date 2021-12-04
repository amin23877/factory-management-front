import React from "react";
import DataGrid from "../../../app/NewDataGrid";

export default function DevicesList({ onDeviceSelected }: { onDeviceSelected: (row: any) => void }) {
    const cols = [
        { name: "name", flex: 1, header: "Name" },
        { name: "description", flex: 1, header: "Description" },
    ];

    return (
        <DataGrid
            url="/item"
            initParams={{ device: true }}
            columns={cols}
            // onRowSelected={(params) => onDeviceSelected(params.data)}
            onRowSelected={onDeviceSelected}
            style={{ minHeight: "calc(100vh - 160px)" }}
        />
    );
}
