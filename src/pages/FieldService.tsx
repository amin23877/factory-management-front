import React, { useEffect, useState } from "react";
import { Container, Box, IconButton, ListItem } from "@material-ui/core";
import AddRounded from "@material-ui/icons/AddRounded";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import PrintRounded from "@material-ui/icons/PrintRounded";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";
import List from "../app/SideUtilityList";

import ServiceIndex from "../features/Service";
import AddServiceModal from "../features/Service/AddServiceModal";
import { getFieldServices, IFieldService } from "../api/fieldService";
import FieldServiceDetails from "../features/Service/Details";

export default function Purchase() {
    const [activeTab, setActiveTab] = useState(0);
    const [addService, setAddService] = useState(false);
    const [fieldServices, setFieldServices] = useState([]);
    const [selectedFS, setSelectedFS] = useState<IFieldService>();

    const refreshFieldServices = async () => {
        try {
            const resp = await getFieldServices();
            if (resp) {
                setFieldServices(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshFieldServices();
    }, []);

    return (
        <Box>
            <AddServiceModal open={addService} onClose={() => setAddService(false)} onDone={refreshFieldServices} />

            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="List" />
                    <MyTab label="Details" disabled={!selectedFS} />
                </MyTabs>
            </Box>
            <Box display="flex">
                <Box>
                    <List>
                        <ListItem>
                            <IconButton
                                onClick={() => {
                                    setAddService(true);
                                    setSelectedFS(undefined);
                                    setActiveTab(0);
                                }}
                            >
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
                    {activeTab === 0 && (
                        <ServiceIndex
                            fieldServices={fieldServices}
                            onFieldServiceSelected={(d) => {
                                setSelectedFS(d);
                                setActiveTab(1);
                            }}
                        />
                    )}
                    {activeTab === 1 && selectedFS && (
                        <FieldServiceDetails onDone={refreshFieldServices} selectedFieldService={selectedFS} />
                    )}
                </Box>
            </Box>
        </Box>
    );
}
