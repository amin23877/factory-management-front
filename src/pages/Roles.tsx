import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Checkbox, List, ListItem, Typography } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";

import { getAllEmployees } from "../api/employee";

import { AddEmployeeModal, EmployeeDetailsModal } from "../features/Modals/EmployeeModal";
import { BasePaper } from "../app/Paper";

export default function Roles() {
    const [addEmpModal, setAddEmpModal] = useState(false);
    const [details, setDetails] = useState(false);
    const [emps, setEmps] = useState([]);
    const [selEmp, setSelEmp] = useState<any>();

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

    useEffect(() => {
        refreshEmployees();
    }, []);

    return (
        <>
            <AddEmployeeModal open={addEmpModal} onClose={() => setAddEmpModal(false)} onDone={refreshEmployees} />
            {selEmp && <EmployeeDetailsModal open={details} onClose={() => setDetails(false)} employee={selEmp} />}

            <Box>
                <Box display="flex" my={2}>
                    <Button onClick={() => setAddEmpModal(true)}>Add Employee</Button>
                    {/* <Button onClick={() => setAddEmpModal(true)}>Add Role</Button> */}
                </Box>
                <BasePaper>
                    <List>
                        {emps &&
                            emps.map((e: any) => (
                                <ListItem key={e.id}>
                                    <IconButton style={{ color: "red" }}>
                                        <DeleteRounded />
                                    </IconButton>
                                    <Button
                                        onClick={() => {
                                            setDetails(true);
                                            setSelEmp(e);
                                        }}
                                    >
                                        {e.username}
                                    </Button>
                                </ListItem>
                            ))}
                    </List>
                </BasePaper>
            </Box>
        </>
    );
}
