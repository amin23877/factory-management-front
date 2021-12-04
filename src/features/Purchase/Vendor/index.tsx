import React, { useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";

import {
    AddRounded,
    DeleteRounded,
    PrintRounded,
    PostAdd,
    LocalOfferRounded,
    ListAltRounded,
    FindInPageRounded,
} from "@material-ui/icons";

import List from "../../../app/SideUtilityList";
import Toast from "../../../app/Toast";

import Details from "./Details";
import VendorModal from "./AddVendor";
import Vending from "./Vending/Modal";
import Confirm from "../../Modals/Confirm";

import { deleteVendor, IVendor } from "../../../api/vendor";
import VendorTypeModal from "./VendorType";
import DataGrid from "../../../app/NewDataGrid";
import { mutate } from "swr";
import { BasePaper } from "../../../app/Paper";

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

    const cols = [
        { name: "number", header: "ID", width: 90 },
        { name: "name", header: "Name", flex: 1 },
        { name: "address", header: "Address", minWidth: 230 },
        { name: "city", header: "City", minWidth: 90 },
        { name: "state", header: "State", width: 90 },
        { name: "zipcode", header: "Zip Code", width: 90 },
        { name: "mcLastName", minWidth: 110, header: "Contact" },
        { name: "mcPhone", minWidth: 110, header: "Phone" },
        { name: "mcEmail", minWidth: 110, header: "Email" },
        { name: "active", header: "Active", minWidth: 90, type: "boolean" },
    ];

    return (
        <>
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

            <BasePaper>
                <Box display="flex">
                    <Box flex={1} flexGrow={1}>
                        <Box display="flex">
                            <Tabs
                                style={{ marginBottom: 10 }}
                                value={activeTab}
                                onChange={(e, nv) => setActiveTab(nv)}
                                textColor="primary"
                            >
                                <Tab
                                    // label="List"
                                    icon={
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                                        </span>
                                    }
                                    wrapped
                                />
                                <Tab
                                    // label="Details"
                                    disabled={!selectedVendor}
                                    icon={
                                        <span
                                            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                        >
                                            <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                                        </span>
                                    }
                                />
                            </Tabs>
                            <div style={{ flexGrow: 1 }} />
                            <Box>
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
                        </Box>
                        {activeTab === 0 && (
                            <DataGrid
                                style={{ minHeight: "calc(100vh - 160px)" }}
                                url="/vendor"
                                columns={cols}
                                initParams={tech ? { tech: true } : {}}
                                onRowSelected={(d) => {
                                    setSelectedVendor(d.data as any);
                                    setActiveTab(1);
                                }}
                            />
                        )}
                        {activeTab === 1 && selectedVendor && <Details vendor={selectedVendor} />}
                    </Box>
                </Box>
            </BasePaper>
        </>
    );
}
