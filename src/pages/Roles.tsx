import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, FormControlLabel, Checkbox, List, ListItem } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";

import { getRoles, getEmployeesRoles } from "../api/role";
import { addRoleToEmployee, deleteRoleFromEmployee } from "../api/employee";

import { AddEmployeeModal } from "../features/Modals/EmployeeModal";
import { AddRoleModal } from "../features/Modals/RoleModals";
import RoleManagement from "../features/Modals/RoleManagement";

import { BasePaper } from "../app/Paper";
import Snack from "../app/Snack";

export default function Roles() {
    const [addEmpModal, setAddEmpModal] = useState(false);
    const [addRoleModal, setAddRoleModal] = useState(false);
    const [roleManagement, setRoleManagement] = useState(false);

    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const [empsAndRoles, setEmpsAndRoles] = useState([]);
    const [roles, setRoles] = useState([]);

    const refreshEmpsRoles = async () => {
        try {
            const resp = await getEmployeesRoles();
            setEmpsAndRoles(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshRoles = async () => {
        try {
            const resp = await getRoles();
            setRoles(resp);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshRoles();
        refreshEmpsRoles();
    }, [addRoleModal]);

    const toggleRole = async (id: number, role: number, v: boolean) => {
        try {
            if (v) {
                const resp = await addRoleToEmployee(id, role);
                setMsg("Role added !");
                setSnack(true);
                refreshEmpsRoles();
                console.log(resp);
            } else {
                const resp = await deleteRoleFromEmployee(id, role);
                setMsg("Role Removed !");
                setSnack(true);
                refreshEmpsRoles();
                console.log(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AddEmployeeModal open={addEmpModal} onClose={() => setAddEmpModal(false)} onDone={refreshEmpsRoles} />
            <AddRoleModal open={addRoleModal} onClose={() => setAddRoleModal(false)} />
            <RoleManagement open={roleManagement} onClose={() => setRoleManagement(false)} />

            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>

            <Box>
                <Box display="flex" my={2}>
                    <Button onClick={() => setAddEmpModal(true)}>Add Employee</Button>
                    <Button onClick={() => setAddRoleModal(true)}>Add Role</Button>
                    <Button onClick={() => setRoleManagement(true)}>Manage Roles</Button>
                </Box>
                <BasePaper>
                    <List>
                        {empsAndRoles &&
                            empsAndRoles.map((emp: any) => (
                                <ListItem key={emp.id}>
                                    <IconButton style={{ color: "red" }}>
                                        <DeleteRounded />
                                    </IconButton>
                                    <Typography>{emp.username}</Typography>
                                    <Box display="flex" alignItems="center" justifyContent="flex-end" flex={1}>
                                        {roles &&
                                            roles.map((role: any) => (
                                                <FormControlLabel
                                                    onChange={(e: any) => toggleRole(emp.id, role.id, e.target.checked)}
                                                    key={role.id}
                                                    label={role.name}
                                                    control={
                                                        <Checkbox
                                                            checked={Boolean(emp.Roles.find((r: any) => parseInt(r.id) === role.id))}
                                                        />
                                                    }
                                                />
                                            ))}
                                    </Box>
                                </ListItem>
                            ))}
                    </List>
                </BasePaper>
            </Box>
        </>
    );
}
