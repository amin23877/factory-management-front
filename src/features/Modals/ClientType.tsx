import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

import Dialog from "../../app/Dialog";
import { GeneralForm } from "../../app/Forms";

import { addClientType, deleteClientType, editClientType, getClientTypes } from "../../api/clientType";
import { addEmailAddressType, deleteEmailAddressType, editEmailAddressType, getEmailAddressTypes } from "../../api/emailAddressType";
import { addContactType, deleteContactType, editContactType, getContactTypes } from "../../api/contactType";
import { addPhoneType, deletePhoneType, editPhoneType, getPhoneTypes } from "../../api/phoneType";
import { addAddressType, deleteAddressType, editAddressType, getAddressTypes } from "../../api/addressType";

export const AllClientTypesModal = ({ open, onClose, onCTDone }: { onCTDone: () => void; open: boolean; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" title="Add client types">
            <Box m={1}>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
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
                        onDone={onCTDone}
                    />
                )}
                {activeTab === 1 && (
                    <GeneralForm
                        type="Email address type"
                        addRecord={addEmailAddressType}
                        deleteRecord={deleteEmailAddressType}
                        getRecord={getEmailAddressTypes}
                        updateRecord={editEmailAddressType}
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
