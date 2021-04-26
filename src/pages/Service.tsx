import React, { useState } from "react";
import { Container, Box, IconButton, ListItem } from "@material-ui/core";
import AddRounded from "@material-ui/icons/AddRounded";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import PrintRounded from "@material-ui/icons/PrintRounded";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";
import List from "../app/SideUtilityList";

import ServiceIndex from "../features/Service";
import AddServiceModal from "../features/Service/AddServiceModal";

export default function Purchase() {
    const [activeTab, setActiveTab] = useState(0);
    const [addService, setAddService] = useState(false);

    return (
        <Box>
            <AddServiceModal open={addService} onClose={() => setAddService(false)} />

            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="List" />
                    <MyTab label="Details" disabled />
                </MyTabs>
            </Box>
            <Box display="flex">
                <Box>
                    <List>
                        <ListItem>
                            <IconButton onClick={() => setAddService(true)}>
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
                <Box flex={1} ml={2}>
                    {activeTab === 0 && <ServiceIndex />}
                </Box>
            </Box>
        </Box>
    );
}
