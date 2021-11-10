import React, { useState } from "react";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import { Box, IconButton, ListItem, Tabs, Tab, LinearProgress } from "@material-ui/core";
import AddRounded from "@material-ui/icons/AddRounded";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import PrintRounded from "@material-ui/icons/PrintRounded";
import CategoryRounded from "@material-ui/icons/CategoryRounded";

import List from "../../app/SideUtilityList";

import AddServiceModal from "../../features/FieldService/AddServiceModal";
import FieldServiceDetails from "../../features/FieldService/Details";

import { IFieldService } from "../../api/fieldService";
import { createServiceClass, deleteServiceClass, updateServiceClass } from "../../api/serviceClass";

import BaseDataGrid from "../../app/BaseDataGrid";
import OneFieldModal from "../../components/OneFieldModal";
import { BasePaper } from "../../app/Paper";

export default function ServiceIndex() {
    const [activeTab, setActiveTab] = useState(0);
    const [addService, setAddService] = useState(false);
    const [serviceClassModal, setServiceClassModal] = useState(false);

    const [selectedFS, setSelectedFS] = useState<IFieldService>();

    const { data: fieldServices, mutate } = useSWR<IFieldService[]>("/service");

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
            <BasePaper>
                <AddServiceModal open={addService} onClose={() => setAddService(false)} onDone={mutate} />
                <OneFieldModal
                    title="Add/Edit Service Classes"
                    getUrl="/serviceClass"
                    open={serviceClassModal}
                    onClose={() => setServiceClassModal(false)}
                    postRecord={createServiceClass}
                    updateRecord={updateServiceClass}
                    deleteRecord={deleteServiceClass}
                />

                <Tabs
                    value={activeTab}
                    textColor="primary"
                    onChange={(e, nv) => setActiveTab(nv)}
                    style={{ marginBottom: 10 }}
                >
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedFS} />
                </Tabs>
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
                                        setServiceClassModal(true);
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
                            <BasePaper>
                                <BaseDataGrid
                                    cols={cols}
                                    rows={fieldServices}
                                    height="73vh"
                                    onRowSelected={(fs) => {
                                        setSelectedFS(fs);
                                        setActiveTab(1);
                                    }}
                                />
                            </BasePaper>
                        )}
                        {activeTab === 1 && selectedFS && (
                            <FieldServiceDetails onDone={mutate} selectedFieldService={selectedFS} />
                        )}
                    </Box>
                </Box>
            </BasePaper>
        </Box>
    );
}
