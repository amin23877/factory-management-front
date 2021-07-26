import React, { useMemo, useEffect, useState } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";

import Dialog from "../../../app/Dialog";
import BaseDataGrid from "../../../app/BaseDataGrid";
import Suggestions from "./Suggestions";

function HistoryInfo({ open, data, onClose }: { open: boolean; onClose: () => void; data: any }) {
    const [rows, setRows] = useState<any[]>([]);
    const [suggestionsModal, setSuggestionsModal] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>();

    // useEffect(() => {
    //     const res = [];
    //     data.map((row: any) => {
    //         const rules = row.data.map((params: any) => ({ JOBid: params.UBOMId, ItemNo: params.ItemId }));
    //     });
    // }, [data]);

    const cols = useMemo<GridColumns>(
        () => [
            { field: "ItemId", headerName: "Item NO.", flex: 1, valueFormatter: (params) => params.row.rec.ItemId },
            // { field: "UBOMId", headerName: "Job ID", flex: 1, valueFormatter: (params) => params.row.rec.UBOMId },
            { field: "partName", headerName: "Part Name", flex: 1, valueFormatter: (params) => params.row.rec.name },
            {
                field: "ruleName",
                headerName: "Rule Name",
                flex: 1,
                valueFormatter: (params) => params.row.result[0]?.rule.name,
            },
            {
                field: "pass",
                headerName: "Pass / Fail",
                width: 100,
                disableColumnMenu: true,
                type: "boolean",
                valueFormatter: (params) => params.row.result[0]?.pass,
            },
            {
                field: "reason",
                headerName: "Reason",
                flex: 1,
                valueFormatter: (params) => params.row.result[0]?.reason,
            },
        ],
        []
    );

    return (
        <Dialog open={open} onClose={onClose} title="Rule history details" fullWidth maxWidth="lg">
            {suggestions && suggestions.length > 0 && (
                <Suggestions
                    open={suggestionsModal}
                    onClose={() => setSuggestionsModal(false)}
                    suggestions={suggestions}
                />
            )}

            <Box m={2}>
                <Box mb={1}>
                    <h3>Form</h3>
                </Box>
                <BaseDataGrid
                    cols={cols}
                    rows={data.assertions.map((r: any, i: any) => ({ ...r, id: i })) || []}
                    onRowSelected={(d) => {
                        setSuggestions(d.result.length > 0 ? d.result[0].suggestions : []);
                        setSuggestionsModal(true);
                    }}
                    height={300}
                />
            </Box>
        </Dialog>
    );
}

export default HistoryInfo;
