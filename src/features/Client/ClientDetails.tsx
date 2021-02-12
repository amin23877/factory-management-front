import React, { useState } from "react";
import { Box, Tabs, Tab, FormControlLabel, FormLabel, RadioGroup, Radio, FormControl } from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";

import { editClient, getClients } from "../../api/client";

import Snack from "../../app/Snack";
import { ObjectSelect, FieldSelect } from "../../app/Inputs";
import { BasePaper } from "../../app/Paper";

import BaseDataGrid from "../../app/BaseDataGrid";

const EditClientForm = ({ clientTypes, data, onDone }: { clientTypes: any; data: any; onDone: () => void }) => {
    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const schema = Yup.object().shape({
        ClientTypeId: Yup.number().required(),
    });

    const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: data,
        validationSchema: schema,
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

                onDone();
                setSubmitting(false);
            } catch (error) {
                setShowSnack(true);
                setMsg("Error " + error);
            }
        },
    });

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
                    <Box display="flex" flexDirection="column" flex={1}>
                        <FieldSelect
                            request={getClients}
                            itemTitleField="name"
                            itemValueField="id"
                            fullWidth
                            name="parent"
                            onChange={handleChange}
                            value={values.parent}
                            label="Parent"
                            error={Boolean(errors.parent)}
                        />

                        <ObjectSelect
                            items={clientTypes}
                            itemTitleField="name"
                            itemValueField="id"
                            fullWidth
                            name="ClientTypeId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.parent}
                            label="Client Type"
                            error={Boolean(errors.ClientTypeId)}
                        />
                    </Box>

                    <Box display="flex" flexDirection="column" justifyContent="center" ml={1} flex={1}>
                        <FormControl fullWidth style={{ margin: "0.5em" }}>
                            <FormLabel>Size</FormLabel>
                            <RadioGroup
                                style={{ display: "flex", flexDirection: "row" }}
                                name="size"
                                value={values.size}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="small" control={<Radio />} label="Small" />
                                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                <FormControlLabel value="large" control={<Radio />} label="Large" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth style={{ margin: "0.5em" }}>
                            <FormLabel>Prospect</FormLabel>
                            <RadioGroup
                                style={{ display: "flex", flexDirection: "row" }}
                                name="prospect"
                                value={String(values.prospect)}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Button type="submit" kind="edit">
                            Save
                        </Button>
                    </Box>
                </Box>
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
    onContactSelected,
    onDivSelected,
    onEmailSelected,
    onPhoneSelected,
    agencies,
    addrs,
    notes,
    docs,
    divisions,
    phones,
    emails,
    contacts,
    clientTypes,
    onDone,
}: {
    selectedRow: any;
    onDone: () => void;
    onNoteSelected: (v: any) => void;
    onDocSelected: (v: any) => void;
    onAddrSelected: (v: any) => void;
    onAgencySelected: (v: any) => void;
    onDivSelected: (v: any) => void;
    onPhoneSelected: (v: any) => void;
    onEmailSelected: (v: any) => void;
    onContactSelected: (v: any) => void;
    agencies: any;
    addrs: any;
    notes: any;
    docs: any;
    divisions: any;
    phones: any;
    emails: any;
    contacts: any;
    clientTypes: any;
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

    const agencyCols: ColDef[] = [{ field: "name", width: 220 }];

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
            <EditClientForm onDone={onDone} data={selectedRow} clientTypes={clientTypes} />

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
                {activeTab === 4 && <BaseDataGrid height={250} cols={agencyCols} rows={divisions} onRowSelected={onDivSelected} />}
                {activeTab === 5 && <BaseDataGrid height={250} cols={phoneCols} rows={phones} onRowSelected={onPhoneSelected} />}
                {activeTab === 6 && <BaseDataGrid height={250} cols={emailCols} rows={emails} onRowSelected={onEmailSelected} />}
                {activeTab === 7 && <BaseDataGrid height={250} cols={contactsCols} rows={contacts} onRowSelected={onContactSelected} />}
            </Box>
        </BasePaper>
    );
}
