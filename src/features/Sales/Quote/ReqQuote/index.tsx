import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import useSWR from "swr";

import Button from "../../../../app/Button";
import { BasePaper } from "../../../../app/Paper";

import EditTab from "./EditTab";
import AddQuote from "../AddQuote";

import BaseDataGrid from "../../../../app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";
import { formatTimestampToDate } from "../../../../logic/date";
// import { IQuoteRequest, IReqQuoteComplete } from "../../../../api/reqQuote";
import General from "./Forms";

export default function ReqQuotePanel() {
    const [selectedQuote, setSelectedQuote] = useState<any>();
    const [activeTab, setActiveTab] = useState(0);
    const [addQ, setAddQ] = useState(false);

    const { data: reqQuotes } = useSWR("/quoterequest");

    const QCols = useMemo<GridColumns>(
        () => [
            {
                field: "Date",
                valueFormatter: (r) => formatTimestampToDate(r.row?.createdAt),
                width: 100,
            },
            { field: "number", headerName: "NO.", width: 100 },
            {
                field: "quote",
                headerName: "Quote ID",
                width: 100,
                valueFormatter: (r) => r.row?.QuoteId?.number,
            },
            {
                field: "client",
                headerName: "Client",
                flex: 1,
                valueFormatter: (params) => params.row?.client?.name,
            },
            { field: "rep", headerName: "Rep", flex: 1, valueFormatter: (params) => params.row?.repOrAgency?.name },
            {
                field: "state",
                headerName: "State",
                width: 100,
                valueFormatter: (params) => params.row?.repOrAgency?.name,
            },
            { field: "requesterName", headerName: "Requester", flex: 1 },
            { field: "requesterMail", headerName: "Req. Mail", flex: 1 },
            { field: "requesterPhone", headerName: "Req. Phone", width: 120 },
            { field: "total", headerName: "Total", width: 100 },
        ],
        []
    );

    return (
        <Box>
            {selectedQuote && (
                <AddQuote
                    open={addQ}
                    onClose={() => setAddQ(false)}
                    initialData={{
                        QuoteRequestId: selectedQuote?.id,
                        repOrAgency: selectedQuote?.repOrAgency?.id,
                        client: selectedQuote?.client?.id,
                        requesterName: selectedQuote?.requesterName,
                        requesterMail: selectedQuote?.requesterMail,
                        requesterPhone: selectedQuote?.requesterPhone,
                        devices: selectedQuote?.devices,
                    }}
                    addFromReq={true}
                    onDone={() => {}}
                />
            )}

            <Box mb={2} display="flex" alignItems="center">
                {selectedQuote && (
                    <Button
                        style={{
                            backgroundColor: "#1a73e8",
                            color: "#fff",
                            margin: "0 0.5em",
                            padding: " 6px 15px",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }}
                        onClick={() => setAddQ(true)}
                    >
                        <AddRoundedIcon />
                        Add Quote For This Request
                    </Button>
                )}

                <div style={{ flexGrow: 1 }} />
            </Box>

            <BasePaper>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedQuote} />
                    <Tab label="Add" disabled={activeTab === 0} />
                </Tabs>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={QCols}
                        rows={reqQuotes || []}
                        onRowSelected={(d) => {
                            setSelectedQuote(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selectedQuote && <EditTab selectedQuote={selectedQuote} />}
                {activeTab === 2 && selectedQuote && <General requestedQuote={selectedQuote} />}
            </BasePaper>
        </Box>
    );
}
