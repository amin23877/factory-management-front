import React, { FormEvent, useEffect, useState } from "react";
import { Dialog, Box, TextField, Button, MenuItem, DialogTitle, List, ListItem } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { getRoles } from "../../api/role";
import { addRoleToEmployee, getEmployeeRoles } from "../../api/employee";

import { BaseSelect } from "../../app/Inputs";
import { addEmployee } from "../../api/employee";

export const EmployeeDetailsModal = ({
    open,
    onClose,
    employee,
}: {
    open: boolean;
    onClose: () => void;
    employee: { id: number; username: string };
}) => {
    const [role, setRole] = useState(0);
    const [roles, setRoles] = useState([]);
    const [empRoles, setEmpRoles] = useState([]);

    const refreshEmpRoles = async () => {
        try {
            const resp = await getEmployeeRoles(employee.id);
            if (resp) {
                console.log(resp);

                setEmpRoles(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRoles()
            .then((d) => setRoles(d))
            .catch((e) => console.log(e));
        refreshEmpRoles();
    }, [employee]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const resp = await addRoleToEmployee(employee.id, role);
            if (resp) {
                refreshEmpRoles();
            }
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{employee.username}'s details</DialogTitle>
            <Box m={2}>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" alignItems="center">
                        <BaseSelect onChange={(e: any) => setRole(e.target.value)}>
                            {roles.map((r: any) => (
                                <MenuItem key={r.id} value={r.id}>
                                    {r.name}
                                </MenuItem>
                            ))}
                        </BaseSelect>
                        <Button type="submit">Add</Button>
                    </Box>
                </form>
                <List>
                    {empRoles.map((er: any) => (
                        <ListItem key={er.id}>{er.name}</ListItem>
                    ))}
                </List>
            </Box>
        </Dialog>
    );
};

export const AddEmployeeModal = ({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) => {
    const schema = Yup.object().shape({
        username: Yup.string().required().min(3),
        password: Yup.string().required().min(4),
    });

    const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: (v: boolean) => void }) => {
        try {
            const resp = await addEmployee(data);
            if (resp) {
                onDone();
                setSubmitting(false);
                console.log(resp);
                onClose();
            }
        } catch (error) {
            console.log(data);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add new employee</DialogTitle>
            <Box m={2}>
                <Formik initialValues={{ username: "", password: "" }} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, touched, errors, handleChange, handleBlur, isSubmitting }) => (
                        <Form>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.username && touched.username)}
                                helperText={errors.username}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="password"
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.password && touched.password)}
                                helperText={errors.password}
                            />

                            <Button
                                fullWidth
                                disabled={isSubmitting}
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ margin: "2em 0" }}
                            >
                                Add
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
