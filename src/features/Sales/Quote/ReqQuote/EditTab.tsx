import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";

import BaseDataGrid from "../../../../app/BaseDataGrid";

import { IReqQuote } from "../../../../api/reqQuote";
import EditForm from "./EditForm";

export default function EditTab({ selectedQuote }: { selectedQuote: IReqQuote }) {
    const [activeTab, setActiveTab] = useState(0);

    const LICols = useMemo<GridColumns>(
        () => [
            { field: "NO.", valueFormatter: (r) => r.row?.no, width: 200 },
            { field: "ItemId", headerName: "Part Name", valueFormatter: (r) => r.row?.name, flex: 1 },
            { field: "Description", valueFormatter: (r) => r.row?.description, flex: 1 },
        ],
        []
    );

    return (
        <Box>
            <EditForm selectedQuote={selectedQuote} />
            <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="Line Item" />
            </Tabs>
            <Box p={2}>
                {activeTab === 0 && (
                    <>
                        <BaseDataGrid
                            cols={LICols}
                            rows={selectedQuote.devices || []}
                            onRowSelected={(r) => {}}
                            height={300}
                        />
                    </>
                )}
            </Box>
        </Box>
    );
}
