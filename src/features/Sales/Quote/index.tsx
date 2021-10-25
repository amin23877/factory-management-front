import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import useSWR from "swr";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";

import Confirm from "../../Modals/Confirm";
import EditTab from "./EditTab";
import AddQuote from "./AddQuote";
import QuoteDatagrid from "./Datagrid";
import ReqQuoteModal from "./ReqQuote/Modals";
import EmailModal from "../../Email/Modal";

import { deleteQuote, IQuote } from "../../../api/quote";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

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

    return (
        <Box>
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />
            <AddQuote open={addQ} onClose={() => setAddQ(false)} initialData={compQ} onDone={() => {}} />
            <ReqQuoteModal open={reqQuote} onClose={() => setReqQuote(false)} />
            <EmailModal open={emailModal} onClose={() => setEmailModal(false)} />
            <Box mb={2} display="flex" alignItems="center" style={{ gap: 10 }}>
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
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab
                        // label="List"
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                    <QuoteDatagrid
                        onRowSelected={(d) => {
                            setSelectedQuote(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selectedQuote && <EditTab selectedQuote={selectedQuote} />}
            </BasePaper>
        </Box>
    );
}
