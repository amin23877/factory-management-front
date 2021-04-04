import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AddRounded, DeleteRounded, PrintRounded } from "@material-ui/icons";
import { ColDef } from "@material-ui/data-grid";

import List from "../../app/SideUtilityList";
import BaseDataGrid from "../../app/BaseDataGrid";

import AddPQuoteModal from "./AddPQuoteModal";
import Details from "./Details";

import { deletePurchaseQuote, getPurchaseQuotes, IPurchaseQuote } from "../../api/purchaseQuote";
import Confirm from "../Modals/Confirm";

function Index() {
    const [activeTab, setActiveTab] = useState(0);
    const [addPQ, setAddPQ] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [pqs, setPqs] = useState([]);

    const [selPQ, setSelPQ] = useState<IPurchaseQuote>();

    const cols: ColDef[] = [
        { field: "number", headerName: "Number" },
        { field: "requester", headerName: "Requester" },
        { field: "VendorId" },
        { field: "ContactId" },
        { field: "EmployeeId" },
    ];

    const refreshPQs = async () => {
        try {
            const resp = await getPurchaseQuotes();
            resp && setPqs(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            if (selPQ && selPQ.id) {
                const resp = await deletePurchaseQuote(selPQ.id);
                if (resp) {
                    refreshPQs();
                    setConfirm(false);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshPQs();
    }, []);

    return (
        <Box display="grid" gridTemplateColumns="1fr 11fr">
            <AddPQuoteModal open={addPQ} onClose={() => setAddPQ(false)} onDone={refreshPQs} />
            {selPQ && (
                <Confirm
                    open={confirm}
                    onClose={() => setConfirm(false)}
                    onConfirm={handleDelete}
                    text={`Are you sure? You are going to delete purchase quote ${selPQ?.number}`}
                />
            )}

            <Box>
                <List>
                    <ListItem>
                        <IconButton
                            onClick={() => {
                                setSelPQ(undefined);
                                setAddPQ(true);
                            }}
                        >
                            <AddRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton onClick={() => setConfirm(true)}>
                            <DeleteRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton>
                            <PrintRounded />
                        </IconButton>
                    </ListItem>
                </List>
            </Box>
            <Box>
                <Tabs style={{ marginBottom: "1em" }} textColor='primary' value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selPQ} />
                </Tabs>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={cols}
                        rows={pqs}
                        onRowSelected={(d) => {
                            setSelPQ(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && <Details />}
            </Box>
        </Box>
    );
}

export default Index;
