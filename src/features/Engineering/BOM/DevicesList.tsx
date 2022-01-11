import React from "react";
import useSWR from "swr";
import BaseDataGrid from "../../../app/BaseDataGrid";

export default function DevicesList({ onDeviceSelected }: { onDeviceSelected: (row: any) => void }) {
    const cols = [
        { field: "name", flex: 1, headerName: "Name" },
        { field: "description", flex: 1, headerName: "Description" },
    ];
    const { data: families } = useSWR("/pfdesc");
    return (
        <BaseDataGrid rows={families || []} cols={cols} onRowSelected={onDeviceSelected} height="calc(100vh - 200px)" />
    );
}
