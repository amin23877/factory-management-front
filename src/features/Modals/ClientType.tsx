import React, { useState } from "react";
import { Dialog, DialogTitle, Box, Tabs, Tab } from "@material-ui/core";

import { GeneralForm } from "../../app/Forms";

import { addClientType, deleteClientType, editClientType, getClientTypes } from "../../api/clientType";
import { addEmailType, deleteEmailType, editEmailType, getEmailTypes } from "../../api/emailType";
import { addContactType, deleteContactType, editContactType, getContactTypes } from "../../api/contactType";
import { addPhoneType, deletePhoneType, editPhoneType, getPhoneTypes } from "../../api/phoneType";
import { addAddressType, deleteAddressType, editAddressType, getAddressTypes } from "../../api/addressType";

export const AllClientTypesModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg">
            <DialogTitle>All Client Types</DialogTitle>
            <Box m={1}>
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Client Type" />
                    <Tab label="Email Type" />
                    <Tab label="Contact Type" />
                    <Tab label="Phone Type" />
                    <Tab label="Address Type" />
                </Tabs>
                {activeTab === 0 && (
                    <GeneralForm
                        type="Client Type"
                        addRecord={addClientType}
                        deleteRecord={deleteClientType}
                        getRecord={getClientTypes}
                        updateRecord={editClientType}
                    />
                )}
                {activeTab === 1 && (
                    <GeneralForm
                        type="Email Type"
                        addRecord={addEmailType}
                        deleteRecord={deleteEmailType}
                        getRecord={getEmailTypes}
                        updateRecord={editEmailType}
                    />
                )}
                {activeTab === 2 && (
                    <GeneralForm
                        type="Contact Type"
                        addRecord={addContactType}
                        deleteRecord={deleteContactType}
                        getRecord={getContactTypes}
                        updateRecord={editContactType}
                    />
                )}
                {activeTab === 3 && (
                    <GeneralForm
                        type="Phone Type"
                        addRecord={addPhoneType}
                        deleteRecord={deletePhoneType}
                        getRecord={getPhoneTypes}
                        updateRecord={editPhoneType}
                    />
                )}
                {activeTab === 4 && (
                    <GeneralForm
                        type="Address Type"
                        addRecord={addAddressType}
                        deleteRecord={deleteAddressType}
                        getRecord={getAddressTypes}
                        updateRecord={editAddressType}
                    />
                )}
            </Box>
        </Dialog>
    );
};
