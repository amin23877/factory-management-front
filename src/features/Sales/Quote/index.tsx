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

import { deleteQuote, IQuote } from "../../../api/quote";

export default function QuotePanel() {
    const [selectedQuote, setSelectedQuote] = useState<IQuote>();
    const [activeTab, setActiveTab] = useState(0);
    const [addQ, setAddQ] = useState(false);
    const [compQ] = useState<any>();
    const [confirm, setConfirm] = useState(false);

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

            <Box mb={2} display="flex" alignItems="center">
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
                    Add Quote
                </Button>
                {selectedQuote ? (
                    <div>
                        <Button kind="delete" onClick={() => setConfirm(true)} disabled={!selectedQuote}>
                            Delete Quote
                        </Button>
                    </div>
                ) : null}
                <div style={{ flexGrow: 1 }} />
            </Box>

            <BasePaper>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedQuote} />
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
