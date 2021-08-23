import React, { useState } from "react";
import { Box, IconButton, ListItem } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import { AddRounded, DeleteRounded, PrintRounded } from "@material-ui/icons";

import BaseDataGrid from "../../app/BaseDataGrid";
import List from "../../app/SideUtilityList";
import { MyTab, MyTabs } from "../../app/Tabs";
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

    const cols: GridColDef[] = [{ field: "name", headerName: "Name" }];

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
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="List" />
                    <MyTab label="Details" disabled={!selectedVendor} />
                </MyTabs>
            </Box>
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
