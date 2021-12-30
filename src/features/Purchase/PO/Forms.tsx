import React, { useState, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "../../../app/TextField";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Tabs, Tab, useMediaQuery, Popover } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import { BasePaper } from "../../../app/Paper";

import { getPPOTypes } from "../../../api/purchasePoType";
import {
    AddRounded,
    CheckRounded,
    ClearRounded,
    DeleteRounded,
    MoreVertRounded,
    WarningRounded,
} from "@material-ui/icons";

import { getContacts, IContact } from "../../../api/contact";
import { getAllEmployees, IEmployee } from "../../../api/employee";
import { IPurchasePOComplete, createPurchasePOComplete, IPurchasePO } from "../../../api/purchasePO";
import { getVendors, IVendor } from "../../../api/vendor";
import { ILineItem } from "../../../api/lineItem";
import { createAModelDocument } from "../../../api/document";

import { FieldSelect, ArraySelect } from "../../../app/Inputs";
import Button from "../../../app/Button";
import { LinearProgress } from "@material-ui/core";

import { exportPdf } from "../../../logic/pdf";

import "../../../styles/splash.css";
import { getSO } from "../../../api/so";

import PurchasePO from "../../../PDFTemplates/PurchasePO";
import { formatTimestampToDate } from "../../../logic/date";
import DateTimePicker from "../../../app/DateTimePicker";
import { IItem } from "../../../api/items";
import "../../../styles/main.css";
import LinkSelect from "../../../app/Inputs/LinkFields";
import Dialog from "../../../app/Dialog";
import { getItemService } from "../../../api/fieldService";

export const DocumentForm = ({
    createdPO,
    data,
    onDone,
}: {
    onDone: () => void;
    data: IPurchasePOComplete;
    createdPO: IPurchasePO;
}) => {
    const divToPrint = useRef<HTMLElement | null>();
    const [contact, setContact] = useState<IContact>();
    const [vendor, setVendor] = useState<IVendor>();
    const [requester, setRequester] = useState<IEmployee>();

    const [canSave, setCanSave] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    let sum = 0;
    data.lines.forEach((l) => (sum += l.price * l.quantity));

    const setData = async () => {
        try {
            const contacts = await getContacts();
            const vendors = await getVendors();
            const emps = await getAllEmployees();

            let fcontact = contacts.find((c: any) => c.id === data.ContactId);
            setContact(fcontact);

            let fvendor = vendors.find((v: any) => v.id === data.VendorId);
            setVendor(fvendor);

            let femp = emps.find((e: any) => e.id === data.requester);
            setRequester(femp);

            if (fcontact && fvendor && femp) {
                setCanSave(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setData();
    }, []);

    const handleSaveDocument = async () => {
        try {
            setCanSave(false);
            setIsUploading(true);
            if (divToPrint.current && createdPO.id) {
                const generatedPdf = await exportPdf(divToPrint.current);

                console.log(generatedPdf);
                const resp = await createAModelDocument(
                    "purchasePO",
                    createdPO.id,
                    generatedPdf,
                    `${new Date().toJSON().slice(0, 19)} - ${createdPO.number}`,
                    `PO_${createdPO.number}.pdf`
                );
                if (resp) {
                    onDone();
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCanSave(true);
            setIsUploading(false);
        }
    };

    return (
        <Box>
            <Typography>We made a pdf from your PO, now you can save it</Typography>
            <div style={{ height: 400, overflowY: "auto" }}>
                <div id="myMm" style={{ height: "1mm" }} />
                <div
                    id="divToPrint"
                    ref={(e) => (divToPrint.current = e)}
                    style={{
                        backgroundColor: "#fff",
                        color: "black",
                        width: "835px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minHeight: "1200px",
                    }}
                >
                    <PurchasePO vendor={vendor as any} contact={contact as any} lines={data.lines} sum={sum} />
                </div>
            </div>
            <Box textAlign="right">
                <Button disabled={!canSave} kind="add" onClick={handleSaveDocument}>
                    Save
                </Button>
                {isUploading && <LinearProgress />}
            </Box>
        </Box>
    );
};

export const FinalForm = ({
    onDone,
    onBack,
    data,
}: {
    onDone: (a: any) => void;
    onBack: () => void;
    data: IPurchasePOComplete;
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const handleSubmit = async () => {
        try {
            // const { ContactId, requester, status, VendorId, lines } = data;
            const { lines } = data;
            let newLines = [...lines];
            newLines.forEach(function (v: any) {
                delete v.date;
                delete v.id;
                delete v.PurchasePOId;
                delete v.PurchaseSOId;
                delete v.QuoteId;
                delete v.SOId;
                delete v.updatedAt;
            });
            const resp = await createPurchasePOComplete({
                ...data,
                lines: newLines,
            } as IPurchasePOComplete);
            if (resp) {
                console.log(resp);
                onDone(resp);
            }
        } catch (error: any) {
            console.log(error);
            console.log(error.response.data.error);
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box height="85%" display="flex" flexDirection="column">
            <Typography variant="h5">Are you sure?</Typography>
            <Typography variant="subtitle1" style={{ margin: "1em 0" }}>
                If you finalize your Purchase order, You can't update it, So if you want to update it you should make
                new version or add new one
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {loading && <LinearProgress />}
            <div style={{ flexGrow: 1 }} />
            <Box display="flex" justifyContent="space-between" mt={4}>
                <Button disabled={loading} onClick={onBack} color="secondary" variant="contained">
                    Back to lines
                </Button>
                <Button disabled={loading} onClick={handleSubmit} color="primary" variant="contained">
                    Finalize
                </Button>
            </Box>
        </Box>
    );
};
const style = {
    padding: "10px 20px",
    borderBottom: "1px solid whiteSmoke",
    color: "white",
};
export const LinesForm = ({
    devices,
    createdItems,
    handleSubmit,
    handleDelete,
    handleAddService,
}: {
    devices?: IItem[];
    createdItems: ILineItem[];
    handleSubmit: (lineItem: ILineItem, item: IItem | undefined) => void;
    handleDelete: (index: number) => void;
    handleAddService: (lineItem: ILineItem, index: any, service: any) => void;
}) => {
    const [selectedItem, setSelectedItem] = useState<IItem>();
    const [addService, setAddService] = useState<any>(false);
    const [addOption, setAddOption] = useState<any>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [index, setIndex] = React.useState<any>();
    const [clickedItem, setClickedItem] = useState<any>();
    const [displayItems, setDisplayItems] = useState<ILineItem[]>();

    const handleClick = (e: any, id: any, i: any) => {
        setClickedItem(id);
        setIndex(i);
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const renderTable = () => {
        let counter = 0;
        const display = createdItems.map((item: any, i: number) => {
            if (!item.belongsTo) {
                counter++;
            }
            return { ...item, group: counter };
        });
        setDisplayItems(display);
    };
    useEffect(() => {
        renderTable();
    }, [createdItems]);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const schema = Yup.object().shape({
        ItemId: Yup.string().required(),
        quantity: Yup.number().required().min(1),
        price: Yup.number().required().min(0.0001),
    });
    return (
        <BasePaper style={{ height: "50.5vh", overflow: "auto" }}>
            <Dialog
                onClose={() => {
                    setAddService(false);
                }}
                open={addService}
                title="Add Service"
                maxWidth="xs"
                fullWidth
            >
                <AddServiceForm
                    onClose={() => setAddService(false)}
                    itemId={addService}
                    handleAddService={(d: ILineItem, i: IItem) => {
                        handleAddService(d, index + 1, i);
                    }}
                />
            </Dialog>
            <Dialog
                onClose={() => {
                    setAddOption(false);
                }}
                open={addOption}
                title="Add Option"
                maxWidth="xs"
                fullWidth
            >
                <AddServiceForm
                    onClose={() => setAddOption(false)}
                    itemId={addOption}
                    handleAddService={(d: ILineItem, i: IItem) => {
                        handleAddService(d, index + 1, i);
                    }}
                    option
                />
            </Dialog>
            <Box display="flex" width="100%" mr={1} pr={1}>
                <Box flex={1}>
                    <Formik
                        initialValues={{} as ILineItem}
                        validationSchema={schema}
                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values, selectedItem);
                        }}
                    >
                        {({ values, handleChange, setFieldValue, handleBlur, errors }) => (
                            <Form>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#373a4d", color: "white" }}>
                                        <TableRow>
                                            <TableCell style={{ color: "white" }}>Group</TableCell>
                                            <TableCell style={{ color: "white" }}>Sort</TableCell>
                                            <TableCell style={{ color: "white" }}>Part Number</TableCell>
                                            <TableCell style={{ color: "white" }}>Qty</TableCell>
                                            <TableCell style={{ color: "white" }}>Price</TableCell>
                                            <TableCell width={50} style={{ color: "white", padding: "2px" }}>
                                                Tax
                                            </TableCell>
                                            <TableCell width={80} style={{ color: "white", padding: "0px" }}>
                                                Total
                                            </TableCell>
                                            <TableCell width={50} style={{ color: "white" }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayItems?.map((item: any, i: number) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{item.belongsTo ? "" : item.group}</TableCell>
                                                    <TableCell>{item.sort}</TableCell>
                                                    <TableCell style={{ position: "relative" }}>
                                                        <span>{item.i.no}</span>
                                                        <span
                                                            style={{
                                                                color: "orange",
                                                                position: "absolute",
                                                                right: 0,
                                                            }}
                                                        >
                                                            {!item.i.engineeringApproved && <WarningRounded />}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>{item.price}</TableCell>
                                                    <TableCell style={{ padding: "2px" }}>
                                                        {item.tax ? <CheckRounded /> : <ClearRounded />}
                                                    </TableCell>
                                                    <TableCell style={{ padding: "0px" }}>
                                                        {item.quantity * item.price}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.belongsTo ? (
                                                            <div
                                                                onClick={() => handleDelete(i)}
                                                                style={{ color: "red", cursor: "pointer" }}
                                                            >
                                                                <DeleteRounded />
                                                            </div>
                                                        ) : (
                                                            <span
                                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                                                    handleClick(e, item, i)
                                                                }
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <MoreVertRounded />
                                                            </span>
                                                        )}
                                                        <Popover
                                                            id={id}
                                                            open={open}
                                                            anchorEl={anchorEl}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: "top",
                                                                horizontal: "right",
                                                            }}
                                                            transformOrigin={{
                                                                vertical: "top",
                                                                horizontal: "right",
                                                            }}
                                                        >
                                                            <Box
                                                                display="flex"
                                                                flexDirection="column"
                                                                style={{
                                                                    background: "#373a4d",
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                <span
                                                                    style={style}
                                                                    onClick={(e) => {
                                                                        setAddService(clickedItem.ItemId);
                                                                        handleClose();
                                                                    }}
                                                                >
                                                                    Add Service
                                                                </span>
                                                                <span
                                                                    style={style}
                                                                    onClick={(e) => {
                                                                        setAddOption(clickedItem.ItemId);
                                                                        handleClose();
                                                                    }}
                                                                >
                                                                    {" "}
                                                                    Add Option
                                                                </span>
                                                                <span
                                                                    style={{ ...style, border: "none" }}
                                                                    onClick={() => {
                                                                        handleClose();
                                                                        handleDelete(index);
                                                                    }}
                                                                >
                                                                    Delete
                                                                </span>
                                                            </Box>
                                                        </Popover>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow>
                                            <TableCell width={50}>
                                                <IconButton type="submit" style={{ padding: "0px" }}>
                                                    <AddRounded htmlColor="green" />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell width={50}></TableCell>
                                            <TableCell style={{ padding: "2px" }}>
                                                <LinkSelect
                                                    filterLabel="no"
                                                    path="/item?salesApproved=true"
                                                    value={
                                                        typeof values.ItemId === "string"
                                                            ? values.ItemId
                                                            : values.ItemId?.id
                                                    }
                                                    label=""
                                                    getOptionList={(resp) => (devices ? devices : resp?.result)}
                                                    getOptionLabel={(item) => (devices ? item.number.no : item?.no)}
                                                    getOptionValue={(item) => item?.id}
                                                    onChange={(e, nv) => {
                                                        setFieldValue("ItemId", devices ? nv.number.id : nv.id);
                                                        setSelectedItem(nv);
                                                    }}
                                                    onBlur={handleBlur}
                                                    url="/panel/inventory"
                                                />
                                            </TableCell>
                                            <TableCell width={90} style={{ padding: "2px" }}>
                                                <TextField
                                                    type="number"
                                                    name="quantity"
                                                    value={values.quantity}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={Boolean(errors.quantity)}
                                                />
                                            </TableCell>
                                            <TableCell width={90} style={{ padding: "2px" }}>
                                                <TextField
                                                    type="number"
                                                    name="price"
                                                    value={values.price}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={Boolean(errors.price)}
                                                />
                                            </TableCell>
                                            <TableCell style={{ padding: "2px" }}>
                                                <FormControlLabel
                                                    style={{ width: "100%" }}
                                                    checked={values.tax}
                                                    label=""
                                                    name="tax"
                                                    onChange={handleChange}
                                                    control={<CheckBox />}
                                                />
                                            </TableCell>
                                            <TableCell style={{ padding: "0px" }}></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </BasePaper>
    );
};

export const AddServiceForm = ({
    itemId,
    handleAddService,
    onClose,
    option,
}: {
    itemId: any;
    handleAddService: any;
    onClose: any;
    option?: boolean;
}) => {
    const [selectedItem, setSelectedItem] = useState<IItem>();

    const handleSubmit = (d: ILineItem) => {
        handleAddService(d, selectedItem);
        onClose();
    };
    const schema = Yup.object().shape({
        ItemId: Yup.string().required(),
        quantity: Yup.number().required().min(1),
        price: Yup.number().required().min(0.0001),
    });

    return (
        <Box>
            <Box display="flex">
                <Box flex={1} mr={2}>
                    <Formik initialValues={{} as ILineItem} validationSchema={schema} onSubmit={handleSubmit}>
                        {({ values, handleChange, setFieldValue, handleBlur, errors }) => (
                            <Form>
                                <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                    {itemId && (
                                        // <FieldSelect
                                        //     request={() => getItemService(itemId)}
                                        //     itemTitleField="no"
                                        //     itemValueField="id"
                                        //     label="Service"
                                        //     name="ItemId"
                                        //     value={typeof values.ItemId == "string" ? values.ItemId : values.ItemId?.id}
                                        //     onChange={(e) => {
                                        //         handleChange(e);
                                        //         console.log(e);
                                        //     }}
                                        //     onBlur={handleBlur}
                                        //     error={Boolean(errors.ItemId)}
                                        //     fullWidth
                                        // />
                                        <LinkSelect
                                            filterLabel="no"
                                            path={option ? "/item?option=true" : `/item/${itemId}/service`}
                                            value={
                                                typeof values.ItemId === "string" ? values.ItemId : values.ItemId?.id
                                            }
                                            label={option ? "Option" : "Service"}
                                            getOptionList={(resp) => (option ? resp.result : resp)}
                                            getOptionLabel={(item) => item?.no}
                                            getOptionValue={(item) => item?.id}
                                            onChange={(e, nv) => {
                                                setFieldValue("ItemId", nv.id);
                                                setSelectedItem(nv);
                                            }}
                                            onBlur={handleBlur}
                                            url={option ? "/panel/inventory" : "/panel/service"}
                                        />
                                    )}
                                    <TextField
                                        name="quantity"
                                        label={option ? "quantity" : "Period"}
                                        value={values.quantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.quantity)}
                                    />
                                    <TextField
                                        name="price"
                                        label="Price"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.price)}
                                    />
                                    <TextField
                                        name="sort"
                                        label="Sort"
                                        value={values.sort}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.sort)}
                                    />
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <Button style={{ margin: "0 0.5em" }} type="submit" kind={"add"}>
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    );
};

export const CreateForm = ({ onDone, data }: { data?: any; onDone: (data: IPurchasePOComplete) => void }) => {
    const schema = Yup.object().shape({
        // requester: Yup.string().required(),
        // VendorId: Yup.string().required(),
        // ContactId: Yup.string().required(),
    });

    const handleSubmit = (d: any) => {
        onDone(d);
    };
    const [activeMoreTab, setActiveMoreTab] = useState(0);

    return (
        <Formik initialValues={data ? data : ({} as any)} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
                <Form>
                    <Box display="flex">
                        <BasePaper
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                                height: "100%",
                                flex: "2",
                            }}
                        >
                            <Box
                                display="grid"
                                gridTemplateColumns="1fr 1fr"
                                gridRowGap={10}
                                gridColumnGap={10}
                                flex={2}
                            >
                                <FieldSelect
                                    request={getPPOTypes}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    name="PurchasePOTypeId"
                                    label="PO Type"
                                    fullWidth
                                    onChange={handleChange}
                                    value={
                                        typeof values.PurchasePOTypeId === "string"
                                            ? values.PurchasePOTypeId
                                            : values.PurchasePOTypeId?.id
                                    }
                                    error={Boolean(errors.PurchasePOTypeId)}
                                />
                                <FieldSelect
                                    itemValueField="id"
                                    itemTitleField="number"
                                    request={getSO}
                                    name="SOId"
                                    value={typeof values.SOId === "string" ? values.SOId : values.SOId?.id}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.SOId)}
                                    label="SO ID"
                                />
                                <FieldSelect
                                    style={{ width: "100%" }}
                                    request={getVendors}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    name="VendorId"
                                    label="Vendor"
                                    value={values.VendorId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.VendorId)}
                                />
                                <TextField label="Approved By" value={values.approvedBy?.username} fullWidth disabled />

                                <ArraySelect
                                    items={[
                                        "Quoted",
                                        "Pending",
                                        "Printed",
                                        "Closed",
                                        "Acknowledged",
                                        "Shipped",
                                        "Received",
                                        "Canceled",
                                        "On Hold",
                                    ]}
                                    name="status"
                                    label="PO Status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.status)}
                                    fullWidth
                                />
                                <TextField
                                    name="terms"
                                    label="Terms"
                                    value={values.terms}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.terms)}
                                    fullWidth
                                />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    name="note"
                                    value={values.note}
                                    label="PO note"
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                        </BasePaper>
                        <Box flex={3}>
                            <BasePaper
                                style={{
                                    boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                                    margin: "0 1em",
                                    height: "100%",
                                }}
                            >
                                <Tabs
                                    textColor="primary"
                                    value={activeMoreTab}
                                    onChange={(e, nv) => setActiveMoreTab(nv)}
                                    variant="scrollable"
                                    style={{ maxWidth: 700 }}
                                >
                                    <Tab label="More Info" />
                                    <Tab label="Addresses" />
                                </Tabs>
                                <Box>
                                    {activeMoreTab === 0 && (
                                        <MoreInfoForm
                                            errors={errors}
                                            values={values}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                            addForm={true}
                                        />
                                    )}
                                    {activeMoreTab === 1 && (
                                        <AddressesForm
                                            values={values}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />
                                    )}
                                </Box>
                            </BasePaper>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                        <Button type="submit" kind="add" style={{ margin: "0.5em auto" }}>
                            Next
                        </Button>
                    </Box>
                    {/* <Box display="grid" gridTemplateColumns="auto" gridGap={8}>
                        <FieldSelect
                        style={{ width: "100%" }}
                        request={getAllEmployees}
                        itemTitleField="username"
                        itemValueField="id"
                        name="requester"
                        label="Requester"
                        value={values.requester}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.requester)}
                        />
                        {errors.requester && <Typography variant="caption">{errors.requester}</Typography>}
                        <FieldSelect
                        style={{ width: "100%" }}
                        request={getVendors}
                            itemTitleField="name"
                            itemValueField="id"
                            name="VendorId"
                            label="Vendor"
                            value={values.VendorId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.VendorId)}
                        />
                        {errors.VendorId && <Typography variant="caption">{errors.VendorId}</Typography>}
                        <FieldSelect
                            style={{ width: "100%" }}
                            request={getContacts}
                            itemTitleField="lastName"
                            itemValueField="id"
                            name="ContactId"
                            label="Contact"
                            value={values.ContactId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.ContactId)}
                        />
                        {errors.ContactId && <Typography variant="caption">{errors.ContactId}</Typography>}
                        <ArraySelect
                            items={["completed", "shipped", "pending"]}
                            name="status"
                            label="status"
                            value={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.status)}
                            fullWidth
                        />
                        
                    </Box> */}
                </Form>
            )}
        </Formik>
    );
};

export const UpdateForm = ({
    values,
    errors,
    handleBlur,
    handleChange,
}: {
    values: any;
    handleChange: any;
    handleBlur: any;
    errors: any;
}) => {
    const phone = useMediaQuery("(max-width:600px)");

    return (
        <>
            <Box
                display="grid"
                gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}
                gridRowGap={7}
                gridColumnGap={7}
            >
                <TextField name="number" label="PO ID" value={values.number} disabled />
                <FieldSelect
                    request={getPPOTypes}
                    itemTitleField="name"
                    itemValueField="id"
                    name="PurchasePOTypeId"
                    label="PO Type"
                    fullWidth
                    onChange={handleChange}
                    value={
                        typeof values.PurchasePOTypeId === "string"
                            ? values.PurchasePOTypeId
                            : values.PurchasePOTypeId?.id
                    }
                    error={Boolean(errors.PurchasePOTypeId)}
                />
                <TextField label="So Number" value={values.SOId?.number} fullWidth disabled />
                <TextField label="Vendor" value={values.VendorId?.name} fullWidth disabled />
                <TextField label="Approved By" value={values.approvedBy?.username} fullWidth disabled />

                <ArraySelect
                    items={[
                        "Quoted",
                        "Pending",
                        "Printed",
                        "Closed",
                        "Acknowledged",
                        "Shipped",
                        "Received",
                        "Canceled",
                        "On Hold",
                    ]}
                    name="status"
                    label="PO Status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.status)}
                    fullWidth
                />
                <TextField
                    name="terms"
                    label="Terms"
                    value={values.terms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.terms)}
                    fullWidth
                />
                <Paper
                    style={
                        phone
                            ? {
                                  paddingLeft: "0.5em",
                                  backgroundColor: "#eee",
                              }
                            : {
                                  paddingLeft: "0.5em",
                                  backgroundColor: "#eee",
                                  gridColumnEnd: "span 2",
                              }
                    }
                >
                    <FormControlLabel
                        style={{ width: "100%" }}
                        checked={values.approved}
                        label="Approved"
                        name="approved"
                        onChange={handleChange}
                        control={<CheckBox size="small" />}
                    />
                </Paper>
                <TextField
                    style={phone ? { gridColumnEnd: "span 2" } : { gridColumnEnd: "span 3" }}
                    value={values.publicNote}
                    name="publicNote"
                    label="Note"
                    multiline
                    rows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    style={phone ? { gridColumnEnd: "span 2" } : { gridColumnEnd: "span 3" }}
                    value={values.description}
                    name="description"
                    label="Description"
                    multiline
                    rows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Box>
        </>
    );
};

export const MoreInfoForm = ({
    values,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    addForm,
}: {
    values: any;
    handleChange: any;
    handleBlur: any;
    errors: any;
    setFieldValue: any;
    addForm?: boolean;
}) => {
    return (
        <>
            <Box my={2} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridColumnGap={10}>
                {!addForm && <TextField label="PO Date" value={formatTimestampToDate(values.date)} disabled />}
                <DateTimePicker
                    size="small"
                    value={values.acknowledgeDate}
                    name="acknowledgeDate"
                    label="َAck. Date"
                    onChange={(date) => setFieldValue(" acknowledgeDate", date)}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    size="small"
                    value={values.estShipDate}
                    name="estShipDate"
                    label="Estimated ship date"
                    onChange={(date) => setFieldValue("estShipDate", date)}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    size="small"
                    value={values.actShipDate}
                    name="actShipDate"
                    label="Actual ship date"
                    onChange={(date) => setFieldValue("actShipDate", date)}
                    onBlur={handleBlur}
                />
                {!addForm && (
                    <TextField
                        label="Approved Date"
                        value={formatTimestampToDate(values.approvedDate)}
                        fullWidth
                        disabled
                    />
                )}
                <DateTimePicker
                    size="small"
                    value={values.requiredBy}
                    name="requiredBy"
                    label="Required By"
                    onChange={(date) => setFieldValue("requiredBy", date)}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    size="small"
                    value={values.sentDate}
                    name="sentDate"
                    label="Date Sent"
                    onChange={(date) => setFieldValue("sentDate", date)}
                    onBlur={handleBlur}
                />
            </Box>
        </>
    );
};

export const AddressesForm = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const phone = useMediaQuery("(max-width:600px)");

    return (
        <>
            <Tabs
                textColor="primary"
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
                variant="scrollable"
                style={{ maxWidth: 600 }}
            >
                <Tab label="Billing Address" />
                <Tab label="Shipping Address" />
            </Tabs>
            {activeTab === 0 && (
                <Box
                    my={1}
                    display="grid"
                    gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}
                    gridGap={10}
                    gridRowGap={10}
                >
                    <TextField
                        value={values.billingCompany}
                        name="billingCompany"
                        label="Company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAttn}
                        name="billingAttn"
                        label="Attn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <TextField
                        value={values.billingAddress}
                        name="billingAddress"
                        label="Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingCity}
                        name="billingCity"
                        label="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingState}
                        name="billingState"
                        label="State"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingZipcode}
                        name="billingZipcode"
                        label="Zip Code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingCountry}
                        name="billingCountry"
                        label="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingPhone}
                        name="billingPhone"
                        label="Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingEmail}
                        name="billingEmail"
                        label="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // style={{ gridColumnEnd: "span 2" }}
                    />
                </Box>
            )}
            {activeTab === 1 && (
                <Box
                    my={1}
                    display="grid"
                    gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}
                    gridGap={10}
                    gridRowGap={10}
                    gridColumnGap={10}
                >
                    <TextField
                        value={values.shippingCompany}
                        name="shippingCompany"
                        label="Company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAttn}
                        name="shippingAttn"
                        label="Attn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddress}
                        label="Address"
                        name="shippingAddress"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingCity}
                        name="shippingCity"
                        label="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingState}
                        name="shippingState"
                        label="State"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingZipcode}
                        name="shippingZipcode"
                        label="Zip Code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingCountry}
                        name="shippingCountry"
                        label="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingPhone}
                        name="shippingPhone"
                        label="Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingEmail}
                        name="shippingEmail"
                        label="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // style={{ gridColumnEnd: "span 2" }}
                    />
                </Box>
            )}
        </>
    );
};

export const VendorForm = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <>
            <Box my={1} display="grid" gridTemplateColumns=" 1fr 1fr" gridGap={10} gridRowGap={10}>
                <TextField label="Vendor ID" value={values.VendorId?.number} fullWidth disabled />
                <TextField label="Vendor Name" value={values.VendorId?.name} fullWidth disabled />
                <TextField value={values.VendorId?.address} name="Address" label="Address" disabled />
                <TextField value={values.VendorId?.state} name="State" label="State" disabled />
                <TextField value={values.VendorId?.zipcode} name="ZipCode" label="Zip Code" disabled />
                <TextField value={values.VendorId?.website} name="website" label="website" disabled />
                <TextField value={values.contact?.lastName} name="contactPerson" label="Contact Person" disabled />
                <TextField value={values.contact?.email} name="email" label="Email" disabled />
                <TextField value={values.contact?.phone} name="phone" label="Phone" disabled />
            </Box>
        </>
    );
};
