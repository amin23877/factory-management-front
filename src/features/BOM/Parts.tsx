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
            { field: "no", headerName: "No.", valueFormatter: (params) => params.row?.ItemId?.no },
            { field: "name", headerName: "Name", valueFormatter: (params) => params.row?.ItemId?.name },
            { field: "revision", headerName: "Revision" },
            { field: "usage", headerName: "Usage" },
            { field: "fixedQty", headerName: "fixed Qty", type: "boolean" },
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
