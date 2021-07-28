import React, { useMemo } from "react";
import BaseDataGrid from "../../../app/BaseDataGrid";
import { GridColDef, GridColumns } from "@material-ui/data-grid";

import Dialog from "../../../app/Dialog";
import { General } from "./FlagForms";

import useSWR, { mutate } from "swr";
import { useState } from "react";

interface IFlagModal {
    open: boolean;
    itemId: string;
    flag?: any;
    onClose: () => void;
}

export default function FlagModal({ open, onClose, itemId, flag }: IFlagModal) {
    const [sFlag, setSFlag] = useState(flag);
    const [eOpen, setEOpen] = useState(false);
    const { data: qcflags, mutate: mutate } = useSWR(`/qcflag?ItemId=${itemId}`);
    const qcFlagCols = useMemo<GridColumns>(
        () => [
            { field: "number", headerName: "ID", width: 160 },
            { field: "name", headerName: "Name", flex: 3 },
            { field: "description", headerName: "Description", flex: 3 },
            { field: "section", headerName: "Section", flex: 2 },
        ],
        []
    );
    return (
        <Dialog title="Flag" open={open} onClose={onClose} maxWidth="lg" fullWidth>
            {sFlag && <EditFlagModal open={eOpen} onClose={() => setEOpen(false)} flag={sFlag} itemId={itemId} />}
            <General onClose={onClose} itemId={itemId} />
            <BaseDataGrid
                rows={qcflags || []}
                cols={qcFlagCols}
                onRowSelected={(d) => {
                    setEOpen(true);
                    setSFlag(d);
                }}
            />
        </Dialog>
    );
}

export const EditFlagModal = ({ open, onClose, itemId, flag }: IFlagModal) => {
    return (
        <Dialog title="Flag" open={open} onClose={onClose}>
            <General onClose={onClose} itemId={itemId} flag={flag} />
        </Dialog>
    );
};
