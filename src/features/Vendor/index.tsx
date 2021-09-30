import React, { useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";

import { AddRounded, DeleteRounded, PrintRounded, PostAdd, LocalOfferRounded } from "@material-ui/icons";

import List from "../../app/SideUtilityList";
import Toast from "../../app/Toast";

import Details from "./Details";
import VendorModal from "./AddVendor";
import Vending from "./Vending/Modal";
import Confirm from "../Modals/Confirm";

import { deleteVendor, IVendor } from "../../api/vendor";
import VendorTypeModal from "./VendorType";
import FullDataGrid from "../../components/Datagrid/FullDataGrid";
import { mutate } from "swr";

export default function Vendors({ tech }: { tech: boolean }) {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedVendor, setSelectedVendor] = useState<IVendor>();

    const [addVendor, setAddVendor] = useState(false);
    const [addType, setAddType] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [vendingModal, setVendingModal] = useState(false);

    const handleDelete = async () => {
        try {
            if (selectedVendor && selectedVendor.id) {
                await deleteVendor(selectedVendor.id);

                mutate(`/vendor?tech=${tech}`);
                setConfirm(false);
                setActiveTab(0);
                Toast("Record deleted");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cols: GridColDef[] = [
        { field: "number", headerName: "Number", width: 100 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "address", headerName: "Address", width: 100 },
        { field: "city", headerName: "City", width: 90 },
        { field: "state", headerName: "State", width: 90 },
        { field: "zipcode", headerName: "Zip Code", width: 110 },
        { field: "Contact", width: 110, valueFormatter: (params) => params.row?.contact?.lastName },
        { field: "C. Phone", width: 110, valueFormatter: (params) => params.row?.contact?.phone },
        { field: "C. Email", width: 110, valueFormatter: (params) => params.row?.contact?.email },
        { field: "active", headerName: "Active", width: 90, type: "boolean" },
    ];

    return (
        <Box>
            <VendorModal
                tech={Boolean(tech)}
                open={addVendor}
                onClose={() => setAddVendor(false)}
                onDone={() => mutate(`/vendor?tech=${tech}`)}
            />
            <Confirm
                text={`Are you sure? You are going to delete vendor ${selectedVendor?.name}`}
                open={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
            />
            {selectedVendor && selectedVendor.id && (
                <Vending open={vendingModal} onClose={() => setVendingModal(false)} vendor={selectedVendor} />
            )}
            <VendorTypeModal open={addType} onClose={() => setAddType(false)} />

            <Box display="flex">
                <Box flex={1} m={1}>
                    <List>
                        <ListItem>
                            <IconButton onClick={() => setAddVendor(true)} title="Add Vendor">
                                <AddRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton
                                disabled={!selectedVendor}
                                onClick={() => setConfirm(true)}
                                title="delete Vendor"
                            >
                                <DeleteRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton onClick={() => setAddType(true)} title="Add VendorType">
                                <LocalOfferRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton
                                disabled={!selectedVendor}
                                onClick={() => setVendingModal(true)}
                                title="Add Item"
                            >
                                <PostAdd />
                            </IconButton>
                        </ListItem>

                        <ListItem>
                            <IconButton>
                                <PrintRounded />
                            </IconButton>
                        </ListItem>
                    </List>
                </Box>
                <Box flex={11} mt={1}>
                    <Box display="flex">
                        <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="primary">
                            <Tab label="List" />
                            <Tab label="Details" disabled={!selectedVendor} />
                        </Tabs>
                        <div style={{ flexGrow: 1 }} />
                    </Box>
                    {activeTab === 0 && (
                        <FullDataGrid
                            url="/vendor"
                            columns={cols}
                            defaultQueries={{ tech }}
                            onRowSelected={(d) => {
                                setSelectedVendor(d.data as any);
                                setActiveTab(1);
                            }}
                        />
                    )}
                    {activeTab === 1 && selectedVendor && <Details vendor={selectedVendor} />}
                </Box>
            </Box>
        </Box>
    );
}
