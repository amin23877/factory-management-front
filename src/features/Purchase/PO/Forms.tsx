import React, { useState, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useSWR from "swr";

import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "../../../app/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Tabs, Tab } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { BasePaper } from "../../../app/Paper";

import { getPPOTypes } from "../../../api/purchasePoType";

import BootstrapTextField from "../../../app/TextField";

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
import { getSO, ISOComplete } from "../../../api/so";
import { IQuoteComplete } from "../../../api/quote";

import PurchasePO from "../../../PDFTemplates/PurchasePO";
import { getFieldServices } from "../../../api/fieldService";
import { ILineService } from "../../../api/lineService";
import { formatTimestampToDate } from "../../../logic/date";
import { DateTimePicker } from "@material-ui/pickers";
import { IItem } from "../../../api/items";

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
                delete v.createdAt;
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
        } catch (error) {
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
                If you finilize your Purchase order, You can't update it, So if you want to update it you should make
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
                    Finilize
                </Button>
            </Box>
        </Box>
    );
};

export const LinesForm = ({
    onDone,
    onBack,
    data,
    devices,
}: {
    data?: IPurchasePOComplete | ISOComplete | IQuoteComplete;
    onDone: (items: ILineItem[]) => void;
    onBack: () => void;
    devices?: IItem[];
}) => {
    const [createdItems, setCreatedItems] = useState<ILineItem[]>(data && data.lines ? data.lines : []);
    const [selectedItem, setSelectedItem] = useState<IItem>();
    const { data: items } = useSWR<{ total: number; result: any[] }>("/item");
    const { data: services } = useSWR(selectedItem ? `/service?ItemId=${selectedItem.id}` : "/service");

    const schema = Yup.object().shape({
        ItemId: Yup.string().required(),
        quantity: Yup.number().required().min(1),
        price: Yup.number().required().min(0.0001),
    });

    const handleSubmit = (d: ILineItem) => {
        if (d) {
            setCreatedItems((prev) => prev.concat(d));
        }
    };

    const handleDelete = async (index: number) => {
        setCreatedItems((prev) => prev.filter((item: any, ind) => ind !== index));
    };

    const handleNext = () => {
        const res = [...createdItems];
        res.forEach((_line, index) => {
            res[index].services = res[index].services?.map((s) => ({
                ServiceId: s.id,
                price: s.price,
                quantity: 1,
            }));
        });
        onDone(res);
    };

    return (
        <Box display="flex">
            <Box flex={1} mr={2}>
                <Formik initialValues={{} as ILineItem} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, handleChange, setFieldValue, handleBlur, errors }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                <Autocomplete
                                    options={devices ? devices : items ? items.result : []}
                                    getOptionLabel={(item: any) => item.name}
                                    onChange={(e, nv) => setFieldValue("ItemId", nv.id)}
                                    onBlur={handleBlur}
                                    renderInput={(params) => <TextField {...params} label="Item" name="ItemId" />}
                                    fullWidth
                                />
                                {errors.ItemId && <Typography variant="caption">{errors.ItemId}</Typography>}
                                <Autocomplete
                                    options={services || []}
                                    getOptionLabel={(item: any) => item.name}
                                    onChange={(e, nv) => {
                                        setFieldValue("services", nv);
                                        setSelectedItem(nv.length > 0 ? nv[nv.length - 1] : undefined);
                                    }}
                                    onBlur={handleBlur}
                                    renderInput={(params) => <TextField {...params} label="Services" name="services" />}
                                    fullWidth
                                    freeSolo
                                    multiple
                                />
                                {errors.services && <Typography variant="caption">{errors.services}</Typography>}
                                <BootstrapTextField
                                    style={{ width: "100%" }}
                                    name="description"
                                    label="Description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.description)}
                                />
                                <BootstrapTextField
                                    style={{ width: "100%" }}
                                    name="quantity"
                                    label="Quantity"
                                    value={values.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.quantity)}
                                />
                                <BootstrapTextField
                                    style={{ width: "100%" }}
                                    name="price"
                                    label="Price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.price)}
                                />
                                <BootstrapTextField
                                    style={{ width: "100%" }}
                                    name="index"
                                    label="Index"
                                    value={values.index}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.index)}
                                />
                                <FormControlLabel
                                    style={{ width: "100%" }}
                                    checked={values.tax}
                                    label="Tax"
                                    name="tax"
                                    onChange={handleChange}
                                    control={<CheckBox />}
                                />
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Button
                                        startIcon={<ChevronLeft />}
                                        onClick={onBack}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Back
                                    </Button>
                                    <Button style={{ margin: "0 0.5em" }} type="submit" kind={"add"}>
                                        Submit
                                    </Button>
                                    <Button
                                        endIcon={<ChevronRight />}
                                        onClick={handleNext}
                                        disabled={createdItems.length === 0}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Next
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Box flex={1}>
                <TableContainer component={Paper} style={{ maxHeight: 500, overflowY: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Index</TableCell>
                                {/* <TableCell>Item Name</TableCell> */}
                                <TableCell>Description</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Tax</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {createdItems.map((item: any, i: number) => (
                                <TableRow>
                                    <TableCell>{item.id}</TableCell>
                                    {/* <TableCell>{item.name}</TableCell> */}
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.tax}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(i)}>
                                            <DeleteRounded htmlColor="red" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export const LineServicesForm = ({
    onDone,
    onBack,
    data,
}: {
    data?: IPurchasePOComplete | ISOComplete | IQuoteComplete;
    onDone: (items: ILineService[]) => void;
    onBack: () => void;
}) => {
    const { data: lineItems } = useSWR(data && data.id ? `/lineitem?QuoteId=${data.id}` : null);
    const [createdItems, setCreatedItems] = useState<ILineService[]>(
        data && data.lineServices ? data.lineServices : []
    );

    const schema = Yup.object().shape({
        ServiceId: Yup.string().required(),
        quantity: Yup.number().required().min(1),
        price: Yup.number().required().min(0.1),
    });

    const handleSubmit = (d: ILineService) => {
        if (d) {
            setCreatedItems((prev) => prev.concat(d));
        }
    };

    const handleDelete = async (index: number) => {
        setCreatedItems((prev) => prev.filter((item: any, ind) => ind !== index));
    };

    return (
        <Box>
            <Box display="flex">
                <Box flex={1} mr={2}>
                    <Formik initialValues={{} as ILineService} validationSchema={schema} onSubmit={handleSubmit}>
                        {({ values, handleChange, setFieldValue, handleBlur, errors }) => (
                            <Form>
                                <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                    <FieldSelect
                                        request={getFieldServices}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        value={values?.ServiceId as any}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.ServiceId)}
                                        name="ServiceId"
                                        label="Service"
                                        fullWidth
                                        // renderInput={(params) => (
                                        //     <TextField
                                        //         {...params}
                                        //         size="small"
                                        //         label="Line Item"
                                        //         name="LineItemRecordId"
                                        //     />
                                        // )}
                                    />
                                    {lineItems && (
                                        <Autocomplete
                                            disabled={!lineItems}
                                            // value={values?.LineItemRecordId}
                                            options={lineItems ? lineItems : []}
                                            getOptionLabel={(item: any) => item.ItemId.name}
                                            onChange={(e, nv: any) => setFieldValue("LineItemRecordId", nv?.id)}
                                            onBlur={handleBlur}
                                            fullWidth
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    label="Line Item"
                                                    name="LineItemRecordId"
                                                />
                                            )}
                                        />
                                    )}
                                    <TextField
                                        size="small"
                                        name="description"
                                        label="Description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.description)}
                                    />
                                    <TextField
                                        size="small"
                                        name="quantity"
                                        label="Quantity"
                                        value={values.quantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.quantity)}
                                    />
                                    <TextField
                                        size="small"
                                        name="price"
                                        label="Price"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.price)}
                                    />
                                    <FormControlLabel
                                        checked={values.tax}
                                        label="Tax"
                                        name="tax"
                                        onChange={handleChange}
                                        control={<CheckBox />}
                                    />
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Button
                                            startIcon={<ChevronLeft />}
                                            onClick={onBack}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Back
                                        </Button>
                                        <Button style={{ margin: "0 0.5em" }} type="submit" kind={"add"}>
                                            Submit
                                        </Button>
                                        <Button
                                            endIcon={<ChevronRight />}
                                            onClick={() => {
                                                onDone(createdItems);
                                            }}
                                            disabled={createdItems.length === 0}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Next
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <Box flex={1}>
                    <TableContainer component={Paper} style={{ maxHeight: 500, overflowY: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Index</TableCell>
                                    <TableCell>Service Name</TableCell>
                                    <TableCell>Line Item</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Tax</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {createdItems.map((item: any, i: number) => (
                                    <TableRow>
                                        <TableCell>{i}</TableCell>
                                        <TableCell>{item.ServiceId}</TableCell>
                                        <TableCell>{item.LineItemRecordId}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.tax}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDelete(i)}>
                                                <DeleteRounded htmlColor="red" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                                    name="purchasePOTypeId"
                                    label="PO Type"
                                    fullWidth
                                    onChange={handleChange}
                                    value={
                                        typeof values.purchasePOTypeId === "string"
                                            ? values.purchasePOTypeId
                                            : values.purchasePOTypeId?.id
                                    }
                                    error={Boolean(errors.purchasePOTypeId)}
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
    return (
        <>
            <Paper
                style={{
                    margin: "0.5em 0 2em 0",
                    padding: "0.5em",
                    backgroundColor: "#eee",
                    gridColumnEnd: "span 3",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    columnGap: "15px",
                }}
            >
                <FormControlLabel
                    style={{ width: "100%" }}
                    checked={values.approved}
                    label="Approved"
                    name="approved"
                    onChange={handleChange}
                    control={<CheckBox />}
                />
            </Paper>
            <Box my={2} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridColumnGap={10}>
                <TextField
                    name="number"
                    label="PO ID"
                    value={values.number}
                    style={{ gridColumnEnd: "span 2" }}
                    disabled
                />
                <FieldSelect
                    request={getPPOTypes}
                    itemTitleField="name"
                    itemValueField="id"
                    name="purchasePOTypeId"
                    label="PO Type"
                    fullWidth
                    onChange={handleChange}
                    value={
                        typeof values.purchasePOTypeId === "string"
                            ? values.purchasePOTypeId
                            : values.purchasePOTypeId?.id
                    }
                    error={Boolean(errors.purchasePOTypeId)}
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
                <TextField
                    style={{ gridColumnEnd: "span 2" }}
                    value={values.note}
                    name="note"
                    label="PO note"
                    multiline
                    rows={4}
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
                {!addForm && <TextField label="PO Date" value={formatTimestampToDate(values.createdAt)} disabled />}
                <DateTimePicker
                    size="small"
                    value={values.acknowledgeDate}
                    name="acknowledgeDate"
                    label="Vendor Acknowledged Date"
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

                <TextField
                    name="requiredBy"
                    label="Required By"
                    value={values.requiredBy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.requiredBy)}
                    fullWidth
                    type="number"
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
                <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridRowGap={10}>
                    <TextField
                        value={values.billingAddressCompany}
                        name="billingAddressCompany"
                        label="Company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressAttn}
                        name="billingAddressAttn"
                        label="Attn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <TextField
                        value={values.billingAddressAddress}
                        name="billingAddressAddress"
                        label="Billing Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressCity}
                        name="billingAddressCity"
                        label="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressState}
                        name="billingAddressState"
                        label="State"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressZipcode}
                        name="billingAddressZipcode"
                        label="Zip Code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressCountry}
                        name="billingAddressCountry"
                        label="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressPhone}
                        name="billingAddressPhone"
                        label="Billing Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressEmail}
                        name="billingAddressEmail"
                        label="Billing Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ gridColumnEnd: "span 2" }}
                    />
                </Box>
            )}
            {activeTab === 1 && (
                <Box
                    my={1}
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gridGap={10}
                    gridRowGap={10}
                    gridColumnGap={10}
                >
                    <TextField
                        value={values.shippingAddressCompany}
                        name="shippingAddressCompany"
                        label="Company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressAttn}
                        name="shippingAddressAttn"
                        label="Attn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressAddress}
                        label="Shipping Address"
                        name="shippingAddressAddress"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressCity}
                        name="shippingAddressCity"
                        label="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressState}
                        name="shippingAddressState"
                        label="State"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressZipcode}
                        name="shippingAddressZipcode"
                        label="Zip Code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressCountry}
                        name="shippingAddressCountry"
                        label="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressPhone}
                        name="shippingAddressPhone"
                        label="Shipping Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressEmail}
                        name="shippingAddressEmail"
                        label="Shipping Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ gridColumnEnd: "span 2" }}
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
