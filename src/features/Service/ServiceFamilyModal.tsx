import { Box } from "@material-ui/core";
import React from "react";
import { createServiceFamily, getServiceFamilies, updateServiceFamily, deleteServiceFamily } from "../../api/serviceFamily";

import Dialog from "../../app/Dialog";
import { GeneralForm } from "../../app/Forms";

export default function ServiceFamilyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <Box m={2}>
                <GeneralForm
                    type="serviceFamily"
                    addRecord={createServiceFamily}
                    updateRecord={updateServiceFamily as any}
                    getRecord={getServiceFamilies}
                    deleteRecord={deleteServiceFamily as any}
                />
            </Box>
        </Dialog>
    );
}
