import React, { useState } from "react";
import {
    Box,
    Grid,
    List,
    ListItem,
    Button,
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
    Tabs,
    Tab,
    Divider,
    Typography,
    MenuItem,
    useMediaQuery,
    Snackbar,
} from "@material-ui/core";
import { EditRounded, NoteRounded, FileCopyRounded, PrintRounded } from "@material-ui/icons";
import { useFormik } from "formik";

import { Gradients } from "../theme";
import { AddItemInitialValues, AddItemSchema, updateAnItem } from "../api/items";
import { getCategories } from "../api/category";
import { getAllSubTypes, getAllTypes } from "../api/types";

import { AddItemModal } from "./Modals/ItemModals";
import { NoteModal } from "../features/Modals/NoteModals";
import { DocumentModal, EditDocumentModal } from "../features/Modals/DocumentModals";
import { AddChildItem } from "../features/Modals/ChildItemModal";
// import { CategoryModal } from "../features/Modals/CategoryModals";

import { RecordNotes } from "./DataGrids/NoteDataGrids";
import { RecordDocuments } from "./DataGrids/DocumentDataGrids";
import { RecordChildItems } from "./DataGrids/BundleDataGrid";

import { BasePaper } from "../app/Paper";
import { BaseSelect, BaseTextInput } from "../app/Inputs";

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
    const matches = useMediaQuery("(max-width: 1250px)");

    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [cats, setCats] = useState([{ id: "0", name: "0" }]);
    const [types, setTypes] = useState([{ id: "0", name: "0" }]);
    const [subtypes, setSubtypes] = useState([{ id: "0", name: "0" }]);

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

    const [addNoteModal, setAddNoteModal] = useState(false);
    const [editNoteModal, setEditNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);
    const [editDocModal, setEditDocModal] = useState(false);
    const [addChildItem, setAddChildItem] = useState(false);

    React.useEffect(() => {
        getCategories().then((d) => setCats(d));
        getAllTypes().then((d) => setTypes(d));
        getAllSubTypes().then((d) => setSubtypes(d));
    }, []);

    return (
        <Grid container spacing={3}>
            <NoteModal itemId={selectedRow.id} model="item" open={addNoteModal} onClose={() => setAddNoteModal(false)} />
            <NoteModal
                noteData={selectedNote}
                itemId={selectedRow.id}
                model="item"
                open={editNoteModal}
                onClose={() => setEditNoteModal(false)}
            />

            <DocumentModal open={addDocModal} onClose={() => setAddDocModal(false)} itemId={selectedRow.id} model="item" />
            <EditDocumentModal
                open={editDocModal}
                itemId={selectedRow.id}
                model="item"
                onClose={() => setEditDocModal(false)}
                docData={selectedDoc}
            />

            <AddChildItem
                parentItemId={selectedRow.id}
                parentItemName={selectedRow.name}
                open={addChildItem}
                onClose={() => setAddChildItem(false)}
            />

            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                onClose={() => setShowSnack(false)}
                open={showSnack}
                message={snackMsg}
                key="updateSnack"
            />

            <Grid item xs={12} lg={2}>
                <List style={{ display: matches ? "flex" : "block" }}>
                    <ListItem>
                        <Button title="add item" onClick={() => setAddNoteModal(true)} variant="contained" color="primary" fullWidth>
                            <NoteRounded />
                            Add New Note
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            title="add item"
                            onClick={() => selectedNote.subject && setEditNoteModal(true)}
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            <NoteRounded />
                            Edit / Remove Note
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button title="copy item" variant="contained" color="primary" onClick={() => setAddDocModal(true)} fullWidth>
                            <FileCopyRounded />
                            Add Document
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            title="copy item"
                            variant="contained"
                            color="primary"
                            onClick={() => selectedDoc.name && setEditDocModal(true)}
                            fullWidth
                        >
                            <FileCopyRounded />
                            Edit / Remove Document
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button title="copy item" variant="contained" color="primary" onClick={() => setAddChildItem(true)} fullWidth>
                            <FileCopyRounded />
                            Add Child Item
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button disabled title="print Bill of Material" variant="contained" color="primary" fullWidth>
                            <PrintRounded />
                            BOM
                        </Button>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} lg={10}>
                <BasePaper>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item md={6} xs={12} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
                                        placeholder={selectedRow.Category.name}
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
                                        name="SubtypeId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.SubtypeId && touched.SubtypeId)}
                                        value={values.SubtypeId}
                                    >
                                        {subtypes &&
                                            subtypes.map((subtype) => (
                                                <MenuItem value={subtype.id} key={subtype.id}>
                                                    {subtype.name}
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
                            </Grid>
                            <Grid item md={6} xs={12}>
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
                            <Grid item xs={12} style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                <TextField
                                    value={selectedRow.specialNote}
                                    style={{ marginRight: "1em" }}
                                    fullWidth
                                    placeholder={selectedRow.specialNote}
                                    name="specialNote"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.specialNote && touched.specialNote)}
                                    variant="outlined"
                                    multiline
                                />
                                <Box>
                                    <RadioGroup name="item active radios" value={selectedRow.active} onChange={(e) => e}>
                                        <FormControlLabel value={true} control={<Radio />} label="Active" />
                                        <FormControlLabel value={false} control={<Radio />} label="InActive" />
                                    </RadioGroup>
                                    <Button
                                        disabled={isSubmitting}
                                        title="add item"
                                        variant="contained"
                                        type="submit"
                                        onClick={() => console.log(errors)}
                                        style={{ color: "#fff", background: Gradients.success }}
                                        fullWidth
                                    >
                                        <EditRounded /> Update
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                    <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="scrollable">
                        <Tab label="Kit / Bundle" />
                        <Tab label="Notes" />
                        <Tab label="Documents" />
                    </Tabs>
                    <Box p={3}>
                        {activeTab === 0 && <RecordChildItems parentItemId={selectedRow.id} onRowSelected={(d) => console.log(d)} />}
                        {activeTab === 1 && (
                            <RecordNotes
                                model="item"
                                itemId={selectedRow.id}
                                onRowSelected={(d) => {
                                    console.log(d);
                                    setSelectedNote({ id: d.data.id, subject: d.data.subject, note: d.data.note, url: d.data.url });
                                }}
                            />
                        )}
                        {activeTab === 2 && (
                            <RecordDocuments
                                model="item"
                                itemId={selectedRow.id}
                                onRowSelected={(d) => setSelectedDoc({ id: d.data.id, name: d.data.name, path: d.data.path })}
                            />
                        )}
                    </Box>
                </BasePaper>
            </Grid>
        </Grid>
    );
}

export default ItemsDetails;
