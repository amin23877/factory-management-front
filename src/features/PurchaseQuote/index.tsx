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

import { getPurchaseQuotes } from "../../api/purchaseQuote";

function Index() {
    const [activeTab, setActiveTab] = useState(0);
    const [addPQ, setAddPQ] = useState(false);
    const [pqs, setPqs] = useState([]);

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

    useEffect(() => {
        refreshPQs();
    }, []);

    return (
        <Box display="grid" gridTemplateColumns="1fr 11fr">
            <AddPQuoteModal open={addPQ} onClose={() => setAddPQ(false)} onDone={() => {}} />

            <Box>
                <List>
                    <ListItem>
                        <IconButton onClick={() => setAddPQ(true)}>
                            <AddRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton>
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
                <Tabs style={{ marginBottom: "1em" }} value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled />
                </Tabs>
                {activeTab === 0 && <BaseDataGrid cols={cols} rows={pqs} onRowSelected={() => {}} />}
                {activeTab === 1 && <Details />}
            </Box>
        </Box>
    );
}

export default Index;
