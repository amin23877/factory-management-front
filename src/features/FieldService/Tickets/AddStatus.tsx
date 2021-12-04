import React, { useState } from "react";
import { Box, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { DeleteRounded, EditRounded } from "@material-ui/icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useSWR from "swr";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import Toast from "../../../app/Toast";

import { ITicketStatus, addTicketStatus, deleteTicketStatus, editTicketStatus } from "../../../api/ticketStatus";
import Confirm from "../../Modals/Confirm";

const schema = Yup.object().shape({
    name: Yup.string().required(),
});

export default function CustomerTypeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [confirm, setConfirm] = useState(false);
    const [selectedCT, setSelectedCT] = useState<string>();
    const { data: ticketStatus, mutate } = useSWR("/ticketStatus");

    const handleSubmit = async (d: ITicketStatus, { resetForm }: any) => {
        try {
            if (d.id) {
                await editTicketStatus(d.id, d.name);
                Toast("Record updated", "success");
                resetForm({ values: { name: "" } as ITicketStatus });
            } else {
                await addTicketStatus(d.name);
                Toast("Record added", "success");
                resetForm({ values: { name: "" } as ITicketStatus });
            }
        } catch (error) {
            console.log(error);
        } finally {
            mutate();
        }
    };

    const handleDelete = async () => {
        try {
            if (selectedCT) {
                await deleteTicketStatus(selectedCT);
                Toast("Record deleted", "success");
                setConfirm(false);
                mutate();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth title="Add Ticket Status">
                <Box m={1}>
                    <Formik
                        initialValues={{} as { name: string; id?: string }}
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                    >
                        {({ getFieldProps, errors, touched, setValues, values, resetForm }) => (
                            <Form>
                                <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                                    <Box display="grid" gridTemplateColumns="3fr 1fr 1fr" gridGap={10}>
                                        <TextField
                                            {...getFieldProps("name")}
                                            placeholder="Name"
                                            error={Boolean(errors.name && touched.name)}
                                            helperText={errors.name}
                                        />
                                        <Button type="submit" kind="add">
                                            Save
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => resetForm({ values: { name: "" } as ITicketStatus })}
                                        >
                                            clear
                                        </Button>
                                    </Box>
                                    <List>
                                        {ticketStatus &&
                                            ticketStatus.map((ct: any) => (
                                                <ListItem key={ct.id}>
                                                    <ListItemText>{ct.name}</ListItemText>
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={() => setValues(ct)}>
                                                            <EditRounded />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => {
                                                                setSelectedCT(ct.id);
                                                                setConfirm(true);
                                                            }}
                                                        >
                                                            <DeleteRounded color="error" />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))}
                                    </List>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Dialog>
        </>
    );
}
