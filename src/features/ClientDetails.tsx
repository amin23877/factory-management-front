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
import { useFormik } from "formik";

import { Gradients } from "../theme";

import { getClientTypes } from "../api/clientType";
import { editClient, getClients } from "../api/client";

import Snack from "../app/Snack";
import { TabTable } from "../app/Table";
import { BaseSelect } from "../app/Inputs";
import { BasePaper } from "../app/Paper";

import { RecordNotes } from "../features/DataGrids/NoteDataGrids";
import { RecordDocuments } from "../features/DataGrids/DocumentDataGrids";

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
                if (typeof resp === "object") {
                    setShowSnack(true);
                    setMsg("Success");
                } else {
                    setShowSnack(true);
                    setMsg("Error " + resp);
                }
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
}: {
    selectedRow: any;
    onNoteSelected: (v: any) => void;
    onDocSelected: (v: any) => void;
}) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <BasePaper>
            <EditClientForm data={selectedRow} />

            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
                <Tab label="Notes" />
                <Tab label="Documents" />
            </Tabs>
            <Box p={3}>
                {activeTab === 0 && <RecordNotes model="client" itemId={selectedRow.id} onRowSelected={onNoteSelected} />}
                {activeTab === 1 && <RecordDocuments model="client" itemId={selectedRow.id} onRowSelected={onDocSelected} />}
            </Box>
        </BasePaper>
    );
}
