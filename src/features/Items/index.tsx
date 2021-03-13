import React, { useState, useEffect } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";
import { useFormik } from "formik";

import Snackbar from "../../app/Snack";
import { AddItemSchema, updateAnItem, getItemQuotes, getItemSOs } from "../../api/items";

import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";

import { MoreInfo, Quantity, Shipping, General } from "./Forms";
import { SalesReport } from "./Reports";

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
    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    useEffect(() => {
        if (selectedRow && selectedRow.id) {
            getItemQuotes(selectedRow.id)
                .then((d) => d && setItemQuotes(d))
                .catch((e) => console.log(e));

            getItemSOs(selectedRow.id)
                .then((d) => d && setItemSos(d))
                .catch((e) => console.log(e));
        }
    }, [selectedRow]);

    const quoteCols: ColDef[] = [
        { field: "number" },
        { field: "location", width: 180 },
        { field: "department" },
        { field: "entryDate", width: 180 },
        { field: "expireDate", width: 180 },
    ];

    const soCols: ColDef[] = [
        { field: "number" },
        { field: "quotenumber" },
        { field: "location", width: 180 },
        { field: "estShipDate", width: 180 },
        { field: "actShipDate", width: 180 },
    ];

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
    const {
        name,
        no,
        active,
        approvedForSales,
        obsolete,
        rndOnly,
        nonInventoryItem,
        dontTrackQOH,
        dontOrderPO,
        archived,

        archiveDate,
        lastCount,

        engineeringApproval,
        taxable,
        invalidCost,
        option,
        lead,
        qbtype,
        qbid,
        sku,
        upc,
        manufacturer,
        jobDays,
        color,
        description,
        size,
        specialNote,
        version,
        revision,
        keywords,
        url,
        cost,
        retailPrice,
        BOM,
        bomCost,
        totalQoh,
        allocatedQoh,
        availableQoh,
        triggerQoh,
        recentPurchasePrice,
        uom,
        reorderQty,
        minOrder,
        perShipment,
        location,
        prefVendor,
        prefVendorNote,
        additionalShippingFee,
        shippingNote,
        weightOz,
        weightLb,
        shippingOz,
        shippingLb,
        shippingInstruction,
        shippableOnBom,
        notShippable,
        ItemCategoryId,
        ItemTypeId,
        ItemFamilyId,
    } = selectedRow;

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            name,
            no,
            active,
            approvedForSales,
            obsolete,
            rndOnly,
            nonInventoryItem,
            dontTrackQOH,
            dontOrderPO,
            archived,

            archiveDate,
            lastCount,

            engineeringApproval,
            taxable,
            invalidCost,
            option,
            lead,
            qbtype,
            qbid,
            sku,
            upc,
            manufacturer,
            jobDays,
            color,
            description,
            size,
            specialNote,
            version,
            revision,
            keywords,
            url,
            cost,
            retailPrice,
            BOM,
            bomCost,
            totalQoh,
            allocatedQoh,
            availableQoh,
            triggerQoh,
            recentPurchasePrice,
            uom,
            reorderQty,
            minOrder,
            perShipment,
            location,
            prefVendor,
            prefVendorNote,
            additionalShippingFee,
            shippingNote,
            weightOz,
            weightLb,
            shippingOz,
            shippingLb,
            shippingInstruction,
            shippableOnBom,
            notShippable,
            ItemCategoryId,
            ItemTypeId,
            ItemFamilyId,
        },
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
                            <Tabs value={moreInfoTab} textColor="primary" onChange={(e, v) => setMoreInfoTab(v)}>
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
                            <div style={{ flexGrow: 1 }} />
                        </BasePaper>
                    </Grid>
                </Grid>
            </form>
            <BasePaper style={{ margin: "1em 0" }}>
                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} textColor="primary" variant="scrollable">
                    <Tab label="Notes" />
                    <Tab label="Documents" />
                    <Tab label="Related Quotes" />
                    <Tab label="Related Sales orders" />
                    <Tab label="Sales Report" />
                </Tabs>
                <Box p={3}>
                    {activeTab === 0 && <BaseDataGrid height={250} cols={noteCols} rows={notes} onRowSelected={onNoteSelected} />}
                    {activeTab === 1 && <BaseDataGrid height={250} cols={docCols} rows={docs} onRowSelected={onDocSelected} />}
                    {activeTab === 2 && <BaseDataGrid height={250} cols={quoteCols} rows={itemQuotes} onRowSelected={() => {}} />}
                    {activeTab === 3 && <BaseDataGrid height={250} cols={soCols} rows={itemSos} onRowSelected={(d) => console.log(d)} />}
                    {activeTab === 4 && <SalesReport quotes={itemQuotes} salesOrders={itemSos} />}
                </Box>
            </BasePaper>
        </Box>
    );
}

export default ItemsDetails;
