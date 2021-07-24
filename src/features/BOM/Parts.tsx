import React, { useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import Dialog from "../../app/Dialog";
import BaseDataGrid from "../../app/BaseDataGrid";

import { IBom } from "../../api/bom";

function Parts({ open, onClose, bom }: { open: boolean; onClose: () => void; bom: IBom }) {
    const { data: bomRecords } = useSWR(bom ? `/bomrecord?BOMId=${bom.id}` : null);

    const bomRecordCols = useMemo<GridColumns>(
        () => [
            { field: "no", headerName: "No.", valueFormatter: (params) => params.row?.ItemId?.no, flex: 1 },
            { field: "name", headerName: "Name", valueFormatter: (params) => params.row?.ItemId?.name, flex: 1 },
            { field: "revision", headerName: "Revision", flex: 1 },
            { field: "usage", headerName: "Usage", width: 80 },
            { field: "fixedQty", headerName: "fixed Qty", type: "boolean", flex: 1 },
        ],
        []
    );

    return (
        <Dialog open={open} onClose={onClose} title="Parts" maxWidth="lg" fullWidth>
            <BaseDataGrid cols={bomRecordCols} rows={bomRecords || []} onRowSelected={() => {}} />
        </Dialog>
    );
}

export default Parts;
