import React, { useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import { AddRounded, DeleteRounded, PrintRounded } from "@material-ui/icons";

import BaseDataGrid from "../../app/BaseDataGrid";
import List from "../../app/SideUtilityList";
import Toast from "../../app/Toast";

import Details from "./Details";
import VendorModal from "./AddVendor";

import Confirm from "../Modals/Confirm";

import { deleteVendor, IVendor } from "../../api/vendor";

export default function Vendors() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedVendor, setSelectedVendor] = useState<IVendor>();

    const { data: vendors, mutate: mutateVendors } = useSWR<IVendor[]>("/vendor");

    const [addVendor, setAddVendor] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            if (selectedVendor && selectedVendor.id) {
                await deleteVendor(selectedVendor.id);

                mutateVendors();
                setConfirm(false);
                setActiveTab(0);
                Toast("Record deleted");
            }
        } catch (error) {
            console.log(error);
        }
    };
    //	Zip Code	Contact	Contact Phone	 Contact Email	Active

    const cols: GridColDef[] = [
        { field: "number", headerName: "Number", width: 110 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "address", headerName: "Address", flex: 1 },
        { field: "city", headerName: "City", width: 110 },
        { field: "state", headerName: "State", width: 110 },
        { field: "zipcode", headerName: "Zip Code", width: 110 },
        { field: "active", headerName: "Active", width: 110, type: "boolean" },
    ];

    return (
        <Box>
            <VendorModal open={addVendor} onClose={() => setAddVendor(false)} onDone={mutateVendors} />
            <Confirm
                text={`Are you sure? You are going to delete vendor ${selectedVendor?.name}`}
                open={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
            />

            <Box display="flex">
                <Box flex={1} m={1}>
                    <List>
                        <ListItem>
                            <IconButton onClick={() => setAddVendor(true)}>
                                <AddRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setConfirm(true)}>
                                <DeleteRounded />
                            </IconButton>
                        </ListItem>
                        {/* <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setAddressModal(true)}>
                                <MapOutlined />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setPhoneModal(true)}>
                                <PhoneOutlined />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setContactModal(true)}>
                                <ContactsOutlined />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setEmailModal(true)}>
                                <MailOutline />
                            </IconButton>
                        </ListItem> */}
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
                        <BaseDataGrid
                            rows={vendors || []}
                            cols={cols}
                            onRowSelected={(d) => {
                                setSelectedVendor(d);
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
