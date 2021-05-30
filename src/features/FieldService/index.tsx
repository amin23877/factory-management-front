import React, { useEffect, useState } from "react";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import { Box, IconButton, ListItem, Tabs, Tab, LinearProgress } from "@material-ui/core";
import AddRounded from "@material-ui/icons/AddRounded";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import PrintRounded from "@material-ui/icons/PrintRounded";
import CategoryRounded from "@material-ui/icons/CategoryRounded";

import { SearchBar } from "../../app/TextField";
import List from "../../app/SideUtilityList";

import AddServiceModal from "../../features/FieldService/AddServiceModal";
import ServiceFamilyModal from "../../features/FieldService/ServiceFamilyModal";
import FieldServiceDetails from "../../features/FieldService/Details";

import { getFieldServices, IFieldService } from "../../api/fieldService";

import BaseDataGrid from "../../app/BaseDataGrid";
import { fetcher } from "../../api";

export default function ServiceIndex() {
    const [activeTab, setActiveTab] = useState(0);
    const [addService, setAddService] = useState(false);
    const [serviceFamilyModal, setServiceFamilyModal] = useState(false);

    const [selectedFS, setSelectedFS] = useState<IFieldService>();

    const { data: fieldServices, mutate } = useSWR<IFieldService[]>("/service", fetcher);

    const cols: GridColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "price", headerName: "Price" },
        { field: "length", headerName: "Length" },
    ];

    if (!fieldServices) {
        return <LinearProgress />;
    }

    return (
        <Box flex={1}>
            <AddServiceModal open={addService} onClose={() => setAddService(false)} onDone={mutate} />
            <ServiceFamilyModal open={serviceFamilyModal} onClose={() => setServiceFamilyModal(false)} />

            <Box display="flex" alignItems="center" my={2}>
                <div style={{ flexGrow: 1 }} />
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedFS} />
                </Tabs>
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
                            <IconButton
                                onClick={() => {
                                    setServiceFamilyModal(true);
                                }}
                            >
                                <CategoryRounded />
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
                <Box flex={1} flexGrow={1} ml={2}>
                    {activeTab === 0 && (
                        <BaseDataGrid
                            cols={cols}
                            rows={fieldServices}
                            onRowSelected={(fs) => {
                                setSelectedFS(fs);
                                setActiveTab(1);
                            }}
                        />
                    )}
                    {activeTab === 1 && selectedFS && <FieldServiceDetails onDone={mutate} selectedFieldService={selectedFS} />}
                </Box>
            </Box>
        </Box>
    );
}
