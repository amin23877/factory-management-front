import React, { useState } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";
import { useFormik } from "formik";

import Snackbar from "../../app/Snack";
import { AddItemInitialValues, AddItemSchema, updateAnItem } from "../../api/items";

import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";

import { MoreInfo, Quantity, Shipping, General } from "./Forms";

function ItemsDetails({
    selectedRow,
    onNoteSelected,
    onDocSelected,
    notes,
    docs,
    onDone,
}: {
    notes: any;
    docs: any;
    selectedRow: any;
    onDone?: () => void;
    onNoteSelected: (a: any) => void;
    onDocSelected: (a: any) => void;
}) {
    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

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

    let init: any = { ...AddItemInitialValues };
    for (let attrname in init) {
        init[attrname] = selectedRow[attrname];
    }

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting } = useFormik({
        initialValues: init,
        validationSchema: AddItemSchema,
        onSubmit: (d, { setSubmitting }) => {
            // console.log(d);
            updateAnItem(selectedRow.id, d)
                .then((d) => {
                    console.log(d);
                    setShowSnack(true);
                    setSnackMsg(`Updated item ${d.id}...`);
                })
                .catch((e) => {
                    console.log(e);
                    setShowSnack(true);
                    setSnackMsg(`Error: ${e.error}`);
                })
                .finally(() => {
                    setSubmitting(false);
                    onDone && onDone();
                });
        },
    });

    return (
        <Box my={2}>
            <Snackbar onClose={() => setShowSnack(false)} open={showSnack}>
                {snackMsg}
            </Snackbar>

            <BasePaper>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item md={6} xs={12} style={{ padding: "1em" }}>
                            <General
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                            />
                        </Grid>
                        <Grid item md={6} xs={12} style={{ padding: "1em" }}>
                            <Tabs value={moreInfoTab} onChange={(e, v) => setMoreInfoTab(v)}>
                                <Tab label="More Info." />
                                <Tab label="Quantity" />
                                <Tab label="Shipping" />
                            </Tabs>
                            {moreInfoTab === 0 && (
                                <MoreInfo
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                />
                            )}
                            {moreInfoTab === 1 && (
                                <Quantity
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                />
                            )}
                            {moreInfoTab === 2 && (
                                <Shipping
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                />
                            )}
                        </Grid>
                    </Grid>
                </form>
                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="scrollable">
                    <Tab label="Notes" />
                    <Tab label="Documents" />
                </Tabs>
                <Box p={3}>
                    {activeTab === 0 && <BaseDataGrid height={250} cols={noteCols} rows={notes} onRowSelected={onNoteSelected} />}
                    {activeTab === 1 && <BaseDataGrid height={250} cols={docCols} rows={docs} onRowSelected={onDocSelected} />}
                </Box>
            </BasePaper>
        </Box>
    );
}

export default ItemsDetails;
