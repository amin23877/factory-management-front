import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Button,
    TextField,
    List,
    ListItem,
    RadioGroup,
    Radio,
    FormControlLabel,
    Tabs,
    Tab,
    Divider,
    Typography,
    MenuItem,
    Snackbar,
} from "@material-ui/core";
import { EditRounded, NoteRounded, FileCopyRounded, PrintRounded } from "@material-ui/icons";
import { useFormik } from "formik";

import { Gradients } from "../theme";
import { AddItemInitialValues, AddItemSchema, updateAnItem } from "../api/items";
import { getCategories } from "../api/category";
import { getTypes } from "../api/types";
import { getFamilies } from "../api/family";

import { NoteModal } from "./Modals/NoteModals";
import { DocumentModal, EditDocumentModal } from "./Modals/DocumentModals";

import { RecordNotes } from "./DataGrids/NoteDataGrids";
import { RecordDocuments } from "./DataGrids/DocumentDataGrids";

import { BasePaper } from "../app/Paper";
import { BaseSelect, BaseTextInput } from "../app/Inputs";
import BOMModal from "./BOM/BomModal";

const MoreInfo = ({
    values,
    error,
    onChange,
    onBlur,
    touched,
    selectedRow,
    onChangeType,
}: {
    values: any;
    error: any;
    onChange: any;
    onBlur: any;
    touched: any;
    selectedRow: any;
    onChangeType: (arg0: string) => void;
}) => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box>
                <BaseTextInput
                    name="version"
                    placeholder="version"
                    value={values.version}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ margin: "4px 0" }}
                />
                <BaseTextInput
                    name="keywords"
                    placeholder="keywords"
                    value={values.keywords}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ marginBottom: 3 }}
                />
                <BaseTextInput
                    name="url"
                    placeholder="url"
                    value={values.url}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ marginBottom: 3 }}
                />
                <BaseTextInput
                    name="cost"
                    placeholder="cost"
                    value={values.cost}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ marginBottom: 3 }}
                />
                <BaseTextInput
                    name="retailPrice"
                    placeholder="Retail Price"
                    value={values.retailPrice}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ marginBottom: 3 }}
                />
                <Divider />
                <Typography style={{ fontWeight: "bold", textAlign: "center" }}> Markup 200 %</Typography>
            </Box>
            <Box mx={2}>
                <RadioGroup name="mode" value={values.mode} onChange={onChange}>
                    <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                    <FormControlLabel value="Bundle" control={<Radio />} label="Bundle" />
                    <FormControlLabel value="Kit" control={<Radio />} label="Kit" />
                </RadioGroup>
            </Box>
            <Box>
                <Box style={{ padding: "4em 3em", border: "2px dashed gray", borderRadius: 20 }}></Box>
            </Box>
        </Box>
    );
};

const Quantity = ({
    values,
    error,
    onChange,
    onBlur,
    touched,
    selectedRow,
    onChangeType,
}: {
    values: any;
    error: any;
    onChange: any;
    onBlur: any;
    touched: any;
    selectedRow: any;
    onChangeType: (arg0: string) => void;
}) => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box flex={2} mr={2}>
                <Typography>Quantity on hand</Typography>
                <BaseTextInput
                    name="qoh"
                    placeholder={selectedRow.qoh}
                    value={values.qoh}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ marginBottom: 3 }}
                />
                <Typography>Minimum</Typography>
                <BaseTextInput
                    name="minimum"
                    placeholder={selectedRow.minimum}
                    value={values.minimum}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ margin: "3px 0" }}
                />
                <Typography>Maximum</Typography>
                <BaseTextInput
                    name="maximum"
                    placeholder={selectedRow.maximum}
                    value={values.maximum}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ marginBottom: 3 }}
                />
            </Box>
        </Box>
    );
};

const Shipping = ({
    values,
    error,
    onChange,
    onBlur,
    touched,
    selectedRow,
    onChangeType,
}: {
    values: any;
    error: any;
    onChange: any;
    onBlur: any;
    touched: any;
    selectedRow: any;
    onChangeType: (arg0: string) => void;
}) => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box>
                <Typography>Tiers</Typography>
                <BaseTextInput
                    name="tiers"
                    placeholder={selectedRow.tiers}
                    value={values.tiers}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ marginBottom: 3 }}
                />
                <Typography>Adittional Shipping Fee</Typography>
                <BaseTextInput
                    name="additionalShippingFee"
                    placeholder={selectedRow.additionalShippingFee}
                    value={values.additionalShippingFee}
                    onBlur={onBlur}
                    onChange={onChange}
                    style={{ marginBottom: 3 }}
                />
                <Divider style={{ margin: "1em 0" }} />
                <Box display="flex">
                    <Typography style={{ flex: 1 }}>Item Weight</Typography>
                    <Box textAlign="center">
                        <Typography>LB</Typography>
                        <BaseTextInput
                            name="weightLb"
                            placeholder={selectedRow.weightLb}
                            value={values.weightLb}
                            onBlur={onBlur}
                            onChange={onChange}
                            style={{ flex: 1 }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography>OZ</Typography>
                        <BaseTextInput
                            name="weightOz"
                            placeholder={selectedRow.weightOz}
                            value={values.weightOz}
                            onBlur={onBlur}
                            onChange={onChange}
                            style={{ flex: 1 }}
                        />
                    </Box>
                </Box>
                <Box display="flex" mt={1}>
                    <Typography style={{ flex: 1 }}>Shipping Weight</Typography>
                    <Box textAlign="center">
                        <Typography>LB</Typography>
                        <BaseTextInput
                            name="shippingLb"
                            placeholder={selectedRow.shippingLb}
                            value={values.shippingLb}
                            onBlur={onBlur}
                            onChange={onChange}
                            style={{ flex: 1 }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography>OZ</Typography>
                        <BaseTextInput
                            name="shippingOz"
                            placeholder={selectedRow.shippingOz}
                            value={values.shippingOz}
                            onBlur={onBlur}
                            onChange={onChange}
                            style={{ flex: 1 }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

function ItemsDetails({ selectedRow }: { selectedRow: any }) {
    const [editNoteModal, setEditNoteModal] = useState(false);
    const [editDocModal, setEditDocModal] = useState(false);
    const [addNoteModal, setAddNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);

    const [bomModal, setBomModal] = useState(false);

    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [cats, setCats] = useState([{ id: "0", name: "0" }]);
    const [types, setTypes] = useState([{ id: "0", name: "0" }]);
    const [families, setFamilies] = useState([{ id: "0", name: "0" }]);

    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [selectedNote, setSelectedNote] = useState({ id: "", subject: "", note: "", url: "" } as {
        id: any;
        subject: string;
        note: string;
        url?: string;
    });

    const [selectedDoc, setSelectedDoc] = useState({ id: "", path: "", name: "" } as { id: any; path: string; name: string });

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
                .finally(() => setSubmitting(false));
        },
    });

    useEffect(() => {
        getCategories()
            .then((d) => setCats(d))
            .catch((e) => console.log(e));

        getTypes()
            .then((d) => setTypes(d))
            .catch((e) => console.log(e));

        getFamilies()
            .then((d) => setFamilies(d))
            .catch((e) => console.log(e));
    }, []);

    return (
        <Box>
            <NoteModal
                noteData={selectedNote}
                itemId={selectedRow.id}
                model="item"
                open={editNoteModal}
                onClose={() => setEditNoteModal(false)}
            />
            <EditDocumentModal
                open={editDocModal}
                itemId={selectedRow.id}
                model="item"
                onClose={() => setEditDocModal(false)}
                docData={selectedDoc}
            />
            <NoteModal itemId={selectedNote.id} model="item" open={addNoteModal} onClose={() => setAddNoteModal(false)} />
            <DocumentModal open={addDocModal} onClose={() => setAddDocModal(false)} itemId={selectedDoc.id} model="item" />

            <BOMModal itemId={selectedRow.id} open={bomModal} onClose={() => setBomModal(false)} />

            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                onClose={() => setShowSnack(false)}
                open={showSnack}
                message={snackMsg}
                key="updateSnack"
            />
            <Box>
                <List style={{ display: "flex" }}>
                    <ListItem>
                        <Button
                            title="add item"
                            onClick={() => setAddNoteModal(true)}
                            color="secondary"
                            style={{ fontSize: 12, fontWeight: "bold" }}
                            fullWidth
                        >
                            <NoteRounded style={{ fontSize: 16, margin: "0 0.5em" }} />
                            Add New Note
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            title="add item"
                            onClick={() => setAddNoteModal(true)}
                            color="secondary"
                            style={{ fontSize: 12, fontWeight: "bold" }}
                            fullWidth
                        >
                            <NoteRounded style={{ fontSize: 16, margin: "0 0.5em" }} />
                            Edit/Delete Note
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            title="copy item"
                            color="secondary"
                            style={{ fontSize: 12, fontWeight: "bold" }}
                            onClick={() => setAddDocModal(true)}
                            fullWidth
                        >
                            <FileCopyRounded style={{ fontSize: 16, margin: "0 0.5em" }} />
                            Add Document
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            title="add item"
                            onClick={() => setAddNoteModal(true)}
                            color="secondary"
                            style={{ fontSize: 12, fontWeight: "bold" }}
                            fullWidth
                        >
                            <NoteRounded style={{ fontSize: 16, margin: "0 0.5em" }} />
                            Edit/Delete Document
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            onClick={() => setBomModal(true)}
                            title="print Bill of Material"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            <PrintRounded style={{ fontSize: 16, margin: "0 0.5em" }} />
                            BOM
                        </Button>
                    </ListItem>
                </List>
            </Box>

            <BasePaper>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item md={6} xs={12} style={{ border: "1px solid #ccc", borderRadius: "1em", padding: "1em" }}>
                            <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Box flex={1}>
                                    <TextField
                                        placeholder="Item name"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.name && touched.name)}
                                        value={values.name}
                                        variant="outlined"
                                    />
                                    <TextField
                                        placeholder="upc"
                                        name="upc"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.upc && touched.upc)}
                                        value={values.upc}
                                        variant="outlined"
                                    />
                                    <TextField
                                        placeholder="sku"
                                        name="sku"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.sku && touched.sku)}
                                        value={values.sku}
                                        variant="outlined"
                                    />
                                    <TextField
                                        placeholder="description"
                                        name="description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.description && touched.description)}
                                        value={values.description}
                                        variant="outlined"
                                    />
                                </Box>
                                <Box flex={1} display="flex" flexDirection="column" px={1} alignItems="center">
                                    <TextField
                                        value={values.no}
                                        name="no"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.no && touched.no)}
                                        placeholder={selectedRow.no}
                                        variant="outlined"
                                    />
                                    <BaseSelect
                                        style={{ margin: "0.4em" }}
                                        name="CategoryId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.CategoryId && touched.CategoryId)}
                                        value={values.CategoryId}
                                        placeholder={selectedRow.Category?.name}
                                    >
                                        {cats &&
                                            cats.map((cat) => (
                                                <MenuItem value={cat.id} key={cat.id}>
                                                    {cat.name}
                                                </MenuItem>
                                            ))}
                                    </BaseSelect>
                                    <BaseSelect
                                        style={{ margin: "0.4em" }}
                                        name="TypeId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.TypeId && touched.TypeId)}
                                        value={values.TypeId}
                                    >
                                        {types &&
                                            types.map((type) => (
                                                <MenuItem value={type.id} key={type.id}>
                                                    {type.name}
                                                </MenuItem>
                                            ))}
                                    </BaseSelect>
                                    <BaseSelect
                                        style={{ margin: "0.4em" }}
                                        name="FamilyId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.SubtypeId && touched.SubtypeId)}
                                        value={values.SubtypeId}
                                    >
                                        {families &&
                                            families.map((f: any) => (
                                                <MenuItem value={f.id} key={f.id}>
                                                    {f.name}
                                                </MenuItem>
                                            ))}
                                    </BaseSelect>
                                </Box>
                                <Box flex={1}>
                                    <TextField
                                        placeholder="mfgr"
                                        name="mfgr"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.mfgr && touched.mfgr)}
                                        value={values.mfgr}
                                        variant="outlined"
                                    />
                                    <TextField
                                        placeholder="color"
                                        name="color"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.color && touched.color)}
                                        value={values.color}
                                        variant="outlined"
                                    />
                                    <TextField
                                        placeholder="size"
                                        name="size"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.size && touched.size)}
                                        value={values.size}
                                        variant="outlined"
                                    />
                                    <TextField
                                        placeholder="variance"
                                        name="variance"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.variance && touched.variance)}
                                        value={values.variance}
                                        variant="outlined"
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <RadioGroup
                                    style={{ flexDirection: "row" }}
                                    name="item active radios"
                                    value={selectedRow.active}
                                    onChange={(e) => e}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Active" />
                                    <FormControlLabel value={false} control={<Radio />} label="InActive" />
                                </RadioGroup>
                                <Box display="flex">
                                    <TextField
                                        value={selectedRow.specialNote}
                                        style={{ marginRight: "1em", flex: 5 }}
                                        fullWidth
                                        placeholder={selectedRow.specialNote}
                                        name="specialNote"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.specialNote && touched.specialNote)}
                                        variant="outlined"
                                        multiline
                                    />
                                    <Button
                                        disabled={isSubmitting}
                                        title="add item"
                                        variant="contained"
                                        type="submit"
                                        onClick={() => console.log(errors)}
                                        style={{ color: "#fff", background: Gradients.success, flex: 1 }}
                                        fullWidth
                                    >
                                        <EditRounded /> Update
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6} xs={12} style={{ border: "1px solid #ccc", borderRadius: "1em", padding: "1em" }}>
                            <Tabs value={moreInfoTab} onChange={(e, v) => setMoreInfoTab(v)}>
                                <Tab label="More Info." />
                                <Tab label="Quantity" />
                                <Tab label="Shipping" />
                            </Tabs>
                            {moreInfoTab === 0 && (
                                <MoreInfo
                                    values={values}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors}
                                    touched={touched}
                                    selectedRow={selectedRow}
                                    onChangeType={() => {}}
                                />
                            )}
                            {moreInfoTab === 1 && (
                                <Quantity
                                    values={values}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors}
                                    touched={touched}
                                    selectedRow={selectedRow}
                                    onChangeType={() => {}}
                                />
                            )}
                            {moreInfoTab === 2 && (
                                <Shipping
                                    values={values}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors}
                                    touched={touched}
                                    selectedRow={selectedRow}
                                    onChangeType={() => {}}
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
                    {activeTab === 0 && (
                        <RecordNotes
                            model="item"
                            itemId={selectedRow.id}
                            onRowSelected={(d) => {
                                console.log(d);
                                setSelectedNote({ id: d.data.id, subject: d.data.subject, note: d.data.note, url: d.data.url });
                            }}
                        />
                    )}
                    {activeTab === 1 && (
                        <RecordDocuments
                            model="item"
                            itemId={selectedRow.id}
                            onRowSelected={(d) => setSelectedDoc({ id: d.data.id, name: d.data.name, path: d.data.path })}
                        />
                    )}
                </Box>
            </BasePaper>
        </Box>
    );
}

export default ItemsDetails;
