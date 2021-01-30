import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, FormControlLabel, Checkbox, List, ListItem } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";

import { getRoles, getEmployeesRoles } from "../api/role";
import { getAllEmployees, addRoleToEmployee, deleteRoleFromEmployee, getEmployeeRoles } from "../api/employee";

import { AddEmployeeModal, EmployeeDetailsModal } from "../features/Modals/EmployeeModal";
import { AddRoleModal } from "../features/Modals/RoleModals";

import { BasePaper } from "../app/Paper";
import Snack from "../app/Snack";

export default function Roles() {
    const [addEmpModal, setAddEmpModal] = useState(false);
    const [addRoleModal, setAddRoleModal] = useState(false);

    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const [details, setDetails] = useState(false);
    const [selEmp, setSelEmp] = useState<any>();
    const [empsAndRoles, setEmpsAndRoles] = useState([]);
    const [emps, setEmps] = useState([]);
    const [roles, setRoles] = useState([]);

    const refreshEmpsRoles = async () => {
        try {
            const resp = await getEmployeesRoles();
            setEmpsAndRoles(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshEmployees = async () => {
        try {
            const resp = await getAllEmployees();
            if (resp) {
                setEmps(resp);
            }
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

    useEffect(() => {
        // refreshEmployees();
    }, []);

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
            <AddEmployeeModal open={addEmpModal} onClose={() => setAddEmpModal(false)} onDone={refreshEmployees} />
            <AddRoleModal open={addRoleModal} onClose={() => setAddRoleModal(false)} />
            {selEmp && <EmployeeDetailsModal open={details} onClose={() => setDetails(false)} employee={selEmp} />}

            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>

            <Box>
                <Box display="flex" my={2}>
                    <Button onClick={() => setAddEmpModal(true)}>Add Employee</Button>
                    <Button onClick={() => setAddRoleModal(true)}>Add Role</Button>
                </Box>
                <BasePaper>
                    <List>
                        {empsAndRoles &&
                            empsAndRoles.map((emp: any) => (
                                <ListItem key={emp.id}>
                                    <IconButton style={{ color: "red" }}>
                                        <DeleteRounded />
                                    </IconButton>
                                    <Button
                                        onClick={() => {
                                            setDetails(true);
                                            setSelEmp(emp);
                                        }}
                                    >
                                        {emp.username}
                                    </Button>
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
                                                    // control={<Checkbox />}
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
