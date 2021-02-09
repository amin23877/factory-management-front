import React, { useState, useEffect } from "react";
import { Box, Button, Tabs, Tab } from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";

import { getQuotes, IQuote } from "../../api/quote";

import BaseDataGrid from "../../app/BaseDataGrid";
import EditTab from "./EditTab";
import AddQuoteModal from "./Modals";
import Snack from "../../app/Snack";

export const QuotePanel = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [quotes, setQuotes] = useState([]);
    const [addQ, setAddQ] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState<IQuote>();

    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const quoteCols: ColDef[] = [
        { field: "entryDate", width: 150 },
        { field: "expireDate", width: 150 },
        { field: "location" },
        { field: "leadTime" },
        { field: "salesperson" },
        { field: "requester" },
        { field: "client" },
        { field: "shippingAddress" },
        { field: "shippingContact" },
        { field: "billingAddress" },
        { field: "billingContact" },
        { field: "department" },
        { field: "acctStatus" },
        { field: "creditTerms" },
        { field: "quoteStatus" },
    ];

    const refreshQuotes = async () => {
        try {
            const resp = await getQuotes();
            setQuotes(resp);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshQuotes();
    }, []);

    return (
        <div>
            <AddQuoteModal open={addQ} onClose={() => setAddQ(false)} onDone={refreshQuotes} />
            <Snack open={showSnack} onClose={() => setShowSnack(false)}>
                {msg}
            </Snack>

            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Button onClick={() => setAddQ(true)}>Add Quote</Button>
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedQuote} />
                </Tabs>
            </Box>
            <Box>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={quoteCols}
                        rows={quotes}
                        onRowSelected={(d) => {
                            setSelectedQuote(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selectedQuote && (
                    <EditTab
                        onDone={() => {
                            setShowSnack(true);
                            setMsg("Record updated");
                            refreshQuotes();
                        }}
                        selectedQuote={selectedQuote}
                    />
                )}
            </Box>
        </div>
    );
};
