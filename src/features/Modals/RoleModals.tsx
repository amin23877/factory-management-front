import React from "react";
import { Dialog, DialogTitle, TextField, Button } from "@material-ui/core";

import { GeneralForm } from "../../app/Forms";
import { addRole, deleteRole, getRoles, updateRole } from "../../api/role";

export const AddRoleModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <div>
                <GeneralForm addRecord={addRole} deleteRecord={deleteRole} getRecord={getRoles} updateRecord={updateRole} type="Role" />
            </div>
        </Dialog>
    );
};
