import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import useSWR from "swr";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";

import Confirm from "../../Modals/Confirm";
import EditTab from "./EditTab";
import AddQuote from "./AddQuote";
import DataGrid from "../../../app/NewDataGrid";
import ReqQuoteModal from "./ReqQuote/Modals";
import EmailModal from "../../Email/Modal";

import { deleteQuote, IQuote } from "../../../api/quote";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { formatTimestampToDate } from "../../../logic/date";

export default function QuotePanel() {
    const [selectedQuote, setSelectedQuote] = useState<IQuote>();
    const [activeTab, setActiveTab] = useState(0);
    const [addQ, setAddQ] = useState(false);
    const [reqQuote, setReqQuote] = useState(false);
    const [compQ] = useState<any>();
    const [confirm, setConfirm] = useState(false);
    const [emailModal, setEmailModal] = useState(false);

    const { mutate: mutateQuotes } = useSWR("/quote");

    const handleDelete = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await deleteQuote(selectedQuote.id);
                if (resp) {
                    mutateQuotes();
                }
                setConfirm(false);
                setSelectedQuote(undefined);
                setActiveTab(0);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const columns = useMemo(
        () => [
            {
                name: "Date",
                render: ({ data }: any) => formatTimestampToDate(data.date),
                minWidth: 100,
            },
            { name: "number", header: "Quote ID", minWidth: 100 },
            {
                name: "client",
                header: "Client",
                minWidth: 100,
                render: ({ data }: any) => data.client?.name,
            },
            { name: "rep", header: "Rep", minWidth: 100, render: ({ data }: any) => data.repOrAgency?.name },
            {
                name: "state",
                header: "State",
                minWidth: 100,
                render: ({ data }: any) => data.repOrAgency?.state,
            },
            { name: "requesterName", header: "Requester", minWidth: 100 },
            {
                name: "project",
                header: "Project Name",
                minWidth: 100,
                render: ({ data }: any) => data.ProjectId?.name,
            },
            {
                name: "quotedBy",
                header: "Quoted By",
                minWidth: 100,
                render: ({ data }: any) => data.salesperson?.username,
            },
            { name: "so", header: "SO", minWidth: 100, render: ({ data }) => data.SOId?.number },
            { name: "status", header: "Status", minWidth: 100 },
            { name: "total", header: "Total Amount", flex: 1 },
        ],
        []
    );

    return (
        <Box>
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />
            <AddQuote open={addQ} onClose={() => setAddQ(false)} initialData={compQ} onDone={() => {}} />
            <ReqQuoteModal open={reqQuote} onClose={() => setReqQuote(false)} />
            <EmailModal open={emailModal} onClose={() => setEmailModal(false)} />
            <Box display="flex" alignItems="center" style={{ gap: 10 }} mb={1}>
                <Button
                    style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        padding: " 6px 15px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                    onClick={() => setAddQ(true)}
                >
                    <AddRoundedIcon />
                    Add Quote
                </Button>

                {selectedQuote ? (
                    <div>
                        <Button kind="delete" onClick={() => setConfirm(true)} disabled={!selectedQuote}>
                            Delete Quote
                        </Button>
                    </div>
                ) : null}
                <Button variant="outlined" onClick={() => setReqQuote(true)}>
                    Requested Quotes
                </Button>
                <Button variant="outlined" onClick={() => setEmailModal(true)}>
                    Send Email
                </Button>
                <div style={{ flexGrow: 1 }} />
            </Box>

            <BasePaper>
                <Box>
                    <Tabs
                        value={activeTab}
                        textColor="primary"
                        onChange={(e, nv) => setActiveTab(nv)}
                        style={{ marginBottom: "10px" }}
                    >
                        <Tab
                            // label="List"
                            icon={
                                <span
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                                >
                                    <ListAltRounded style={{ marginRight: "5px" }} /> List
                                </span>
                            }
                            wrapped
                        />
                        <Tab
                            // label="Details"
                            disabled={!selectedQuote}
                            icon={
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                                </span>
                            }
                        />
                    </Tabs>
                    {activeTab === 0 && (
                        <DataGrid
                            onRowSelected={(d) => {
                                setSelectedQuote(d);
                                setActiveTab(1);
                            }}
                            url="/quote"
                            columns={columns}
                        />
                    )}
                    {activeTab === 1 && selectedQuote && <EditTab selectedQuote={selectedQuote} />}
                </Box>
            </BasePaper>
        </Box>
    );
}
