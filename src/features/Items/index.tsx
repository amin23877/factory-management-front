import React, { useState, useEffect } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";
import { useFormik } from "formik";

import Snackbar from "../../app/Snack";
import { AddItemSchema, updateAnItem, getItemQuotes, getItemSOs } from "../../api/items";

import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
import VendorsTable from "./VandorsTable";

import { MoreInfo, Quantity, Shipping, General } from "./Forms";
import { SalesReport } from "./Reports";

import ManualCountModal from "./ManualCountModal";
import SOTable from "./SOTable";
import { getItemVendors } from "../../api/vendor";

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
    const [itemQuotes, setItemQuotes] = useState([]);
    const [itemSos, setItemSos] = useState([]);
    const [vendors, setVendors] = useState([]);

    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [manualCountModal, setManualCountModal] = useState(false);

    const refreshVendors = async () => {
        try {
            const resp = await getItemVendors(selectedRow.id);
            resp && setVendors(resp);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (selectedRow && selectedRow.id) {
            refreshVendors();

            getItemQuotes(selectedRow.id)
                .then((d) => d && setItemQuotes(d))
                .catch((e) => console.log(e));

            getItemSOs(selectedRow.id)
                .then((d) => d && setItemSos(d))
                .catch((e) => console.log(e));
        }
    }, [selectedRow]);

    const quoteCols: ColDef[] = [
        { field: "number", headerName: "Number" },
        { field: "location", headerName: "Location", width: 180 },
        { field: "department", headerName: "Department" },
        { field: "entryDate", headerName: "Entry date", width: 180 },
        { field: "expireDate", headerName: "Expire date", width: 180 },
    ];

    const noteCols: ColDef[] = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    const docCols: ColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "EmployeeId", headerName: "Employee" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Date", width: 300 },
    ];

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: { ...selectedRow },
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
            <ManualCountModal
                open={manualCountModal}
                onClose={() => setManualCountModal(false)}
                itemId={selectedRow.id}
                onDone={() => {
                    setSnackMsg("Record added");
                    setShowSnack(true);
                }}
            />

            <Snackbar onClose={() => setShowSnack(false)} open={showSnack}>
                {snackMsg}
            </Snackbar>

            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item md={8} xs={12} style={{ padding: "1em" }}>
                        <BasePaper>
                            <General
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                            />
                        </BasePaper>
                    </Grid>
                    <Grid item md={4} xs={12} style={{ padding: "1em" }}>
                        <BasePaper style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Tabs value={moreInfoTab} variant="scrollable" textColor="primary" onChange={(e, v) => setMoreInfoTab(v)}>
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
                                    handleManualCount={() => setManualCountModal(true)}
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
                            <div style={{ flexGrow: 1 }} />
                        </BasePaper>
                    </Grid>
                </Grid>
            </form>
            <BasePaper style={{ margin: "1em 0" }}>
                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} textColor="primary" variant="scrollable">
                    <Tab label="Notes" />
                    <Tab label="Documents" />
                    <Tab label="Vendors" />
                    <Tab label="Quote History" />
                    <Tab label="Sales order History" />
                    <Tab label="Sales Report" />
                </Tabs>
                <Box p={3}>
                    {activeTab === 0 && <BaseDataGrid height={250} cols={noteCols} rows={notes} onRowSelected={onNoteSelected} />}
                    {activeTab === 1 && <BaseDataGrid height={250} cols={docCols} rows={docs} onRowSelected={onDocSelected} />}
                    {activeTab === 2 && <VendorsTable selectedItem={selectedRow} rows={vendors} onRowSelected={() => {}} />}
                    {activeTab === 3 && <BaseDataGrid height={250} cols={quoteCols} rows={itemQuotes} onRowSelected={() => {}} />}
                    {activeTab === 4 && <SOTable rows={itemSos} />}
                    {activeTab === 5 && <SalesReport quotes={itemQuotes} salesOrders={itemSos} />}
                </Box>
            </BasePaper>
        </Box>
    );
}

export default ItemsDetails;
