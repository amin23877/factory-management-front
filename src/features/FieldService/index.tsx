import React, { useState } from "react";

import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import AddRounded from "@material-ui/icons/AddRounded";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import PrintRounded from "@material-ui/icons/PrintRounded";
import CategoryRounded from "@material-ui/icons/CategoryRounded";

import List from "../../app/SideUtilityList";

import AddServiceModal from "../../features/FieldService/AddServiceModal";
import FieldServiceDetails from "../../features/FieldService/Details";

import { IFieldService } from "../../api/fieldService";
import { createServiceClass, deleteServiceClass, updateServiceClass } from "../../api/serviceClass";

import OneFieldModal from "../../components/OneFieldModal";
import { BasePaper } from "../../app/Paper";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import DataGrid from "../../app/NewDataGrid";

export default function ServiceIndex() {
    const [activeTab, setActiveTab] = useState(0);
    const [addService, setAddService] = useState(false);
    const [serviceClassModal, setServiceClassModal] = useState(false);

    const [selectedFS, setSelectedFS] = useState<IFieldService | undefined>({
        ItemId: "",
        ServiceClassId: "",
        name: "",
        period: 123,
        price: 456,
    });

    const cols = [
        { name: "name", header: "Name", flex: 1 },
        { name: "price", header: "Price", flex: 1, type: "number" },
        { name: "length", header: "Length", flex: 1 },
    ];

    return (
        <Box display="flex" height="100%" flex={1}>
            <BasePaper style={{ flex: 1 }}>
                <AddServiceModal open={addService} onClose={() => setAddService(false)} onDone={() => {}} />
                <OneFieldModal
                    title="Add/Edit Service Classes"
                    getUrl="/serviceClass"
                    open={serviceClassModal}
                    onClose={() => setServiceClassModal(false)}
                    postRecord={createServiceClass}
                    updateRecord={updateServiceClass}
                    deleteRecord={deleteServiceClass}
                />

                <Box display="flex" alignItems="center">
                    <Tabs
                        value={activeTab}
                        textColor="primary"
                        onChange={(e, nv) => setActiveTab(nv)}
                        style={{ marginBottom: 10 }}
                    >
                        <Tab
                            icon={
                                <span
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                                >
                                    <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                                </span>
                            }
                            wrapped
                        />
                        <Tab
                            disabled={!selectedFS}
                            icon={
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                                </span>
                            }
                        />
                    </Tabs>
                    <Box marginLeft="auto">
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
                </Box>
                <Box display="flex" height="90%">
                    {activeTab === 0 && (
                        <DataGrid
                            columns={cols}
                            url="/service"
                            onRowSelected={(fs) => {
                                setSelectedFS(fs);
                                setActiveTab(1);
                            }}
                        />
                    )}
                    {activeTab === 1 && selectedFS && (
                        <FieldServiceDetails onDone={() => {}} selectedFieldService={selectedFS} />
                    )}
                </Box>
            </BasePaper>
        </Box>
    );
}
