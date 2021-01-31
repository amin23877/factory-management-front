import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Tabs,
    Tab,
    TextField,
    MenuItem,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    FormControl,
} from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";
import { useFormik } from "formik";

import { Gradients } from "../theme";

import { getClientTypes } from "../api/clientType";
import { editClient, getClients } from "../api/client";

import Snack from "../app/Snack";
import { BaseSelect } from "../app/Inputs";
import { BasePaper } from "../app/Paper";

import BaseDataGrid from "../app/BaseDataGrid";
import { IPhone } from "../api/phone";

const EditClientForm = ({ data }: { data: any }) => {
    const [clients, setClients] = useState([]);
    const [clientTypes, setClientTypes] = useState([]);
    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const { values, handleChange, handleBlur, setFieldValue, handleSubmit } = useFormik({
        initialValues: data,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const resp = await editClient(data.id, values);
                console.log(resp);

                if (resp.id) {
                    setShowSnack(true);
                    setMsg("Success");
                } else {
                    setShowSnack(true);
                    setMsg("Error " + resp.error);
                }

                setSubmitting(false);
            } catch (error) {
                setShowSnack(true);
                setMsg("Error " + error);
            }
        },
    });

    const refreshClients = async () => {
        try {
            const resp = await getClients();
            setClients(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshClientTypes = async () => {
        try {
            const resp = await getClientTypes();
            setClientTypes(resp);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshClients();
        refreshClientTypes();
    }, []);

    const specials = ["id", "createdAt", "updatedAt", "size", "prospect", "parent", "ClientTypeId"];
    let key: keyof typeof values;
    let fields: any[] = [];
    for (key in values) {
        if (!specials.includes(key)) {
            fields.push(
                <TextField
                    key={key}
                    name={key}
                    value={values[key]}
                    label={key}
                    placeholder={key}
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            );
        }
    }

    return (
        <Box>
            <Snack open={showSnack} onClose={() => setShowSnack(false)}>
                {msg}
            </Snack>

            <form onSubmit={handleSubmit}>
                <Box display="flex" justifyContent="space-between">
                    {[0, 1, 2, 3].map((i) => (
                        <Box key={i} display="flex" flexDirection="column" flex={1}>
                            {fields.slice(0 + 4 * i, 4 * (i + 1))}
                        </Box>
                    ))}
                </Box>
                <Box display="flex">
                    <FormControl fullWidth>
                        <FormLabel>Parent</FormLabel>
                        <BaseSelect fullWidth onChange={(e) => setFieldValue("parent", e.target.value)} value={values.parent}>
                            {clients.map((c: any) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </BaseSelect>
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Client Type</FormLabel>
                        <BaseSelect fullWidth onChange={(e) => setFieldValue("ClientTypeId", e.target.value)} value={values.ClientTypeId}>
                            {clientTypes.map((c: any) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </BaseSelect>
                    </FormControl>

                    <FormControl fullWidth style={{ margin: "0.5em" }}>
                        <FormLabel>Size</FormLabel>
                        <RadioGroup name="size" value={values.size} onChange={(e) => setFieldValue("size", e.target.value)}>
                            <FormControlLabel value="small" control={<Radio />} label="Small" />
                            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                            <FormControlLabel value="large" control={<Radio />} label="Large" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth style={{ margin: "0.5em" }}>
                        <FormLabel>Prospect</FormLabel>
                        <RadioGroup
                            name="prospect"
                            value={values.prospect}
                            onChange={(e) => setFieldValue("prospect", e.target.value === "true")}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Button type="submit" variant="contained" color="primary" style={{ background: Gradients.success }}>
                    Save
                </Button>
            </form>
        </Box>
    );
};

export default function ClientDetails({
    selectedRow,
    onNoteSelected,
    onDocSelected,
    onAddrSelected,
    onAgencySelected,
    agencies,
    addrs,
    notes,
    docs,
    divisions,
    phones,
    emails,
    contacts,
}: {
    selectedRow: any;
    onNoteSelected: (v: any) => void;
    onDocSelected: (v: any) => void;
    onAddrSelected: (v: any) => void;
    onAgencySelected: (v: any) => void;
    agencies: any;
    addrs: any;
    notes: any;
    docs: any;
    divisions: any;
    phones: any;
    emails: any;
    contacts: any;
}) {
    const [activeTab, setActiveTab] = useState(0);

    const noteCols: ColDef[] = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    const docCols: ColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    const addrCols: ColDef[] = [{ field: "address" }, { field: "city" }, { field: "state" }, { field: "zip" }, { field: "main" }];

    const agencyCols: ColDef[] = [{ field: "name" }];

    const phoneCols: ColDef[] = [{ field: "ext" }, { field: "phone" }, { field: "main" }, { field: "PhoneTypeId" }];

    const emailCols: ColDef[] = [{ field: "email" }, { field: "main" }];

    const contactsCols: ColDef[] = [
        { field: "firstName" },
        { field: "lastName" },
        { field: "title" },
        { field: "department" },
        { field: "instagram" },
        { field: "website" },
        { field: "active" },
        { field: "main" },
    ];

    return (
        <BasePaper>
            <EditClientForm data={selectedRow} />

            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="scrollable">
                <Tab label="Notes" />
                <Tab label="Documents" />
                <Tab label="Addresses" />
                <Tab label="Agencies" />
                <Tab label="Divisions" />
                <Tab label="Phones" />
                <Tab label="Emails" />
                <Tab label="Contacts" />
            </Tabs>
            <Box p={3}>
                {activeTab === 0 && <BaseDataGrid height={250} cols={noteCols} rows={notes} onRowSelected={(v) => onNoteSelected(v)} />}
                {activeTab === 1 && <BaseDataGrid height={250} cols={docCols} rows={docs} onRowSelected={(v) => onDocSelected(v)} />}
                {activeTab === 2 && <BaseDataGrid height={250} cols={addrCols} rows={addrs} onRowSelected={(v) => onAddrSelected(v)} />}
                {activeTab === 3 && (
                    <BaseDataGrid height={250} cols={agencyCols} rows={agencies} onRowSelected={(v) => onAgencySelected(v)} />
                )}
                {activeTab === 4 && <BaseDataGrid height={250} cols={agencyCols} rows={divisions} onRowSelected={(v) => v} />}
                {activeTab === 5 && <BaseDataGrid height={250} cols={phoneCols} rows={phones} onRowSelected={(v) => v} />}
                {activeTab === 6 && <BaseDataGrid height={250} cols={emailCols} rows={emails} onRowSelected={(v) => v} />}
                {activeTab === 7 && <BaseDataGrid height={250} cols={contactsCols} rows={contacts} onRowSelected={(v) => v} />}
            </Box>
        </BasePaper>
    );
}
