import React, { useState, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

import BootstrapTextField from "../../app/TextField";

import { getContacts, IContact } from "../../api/contact";
import { getAllEmployees, IEmployee } from "../../api/employee";
import { IPurchasePOLine, IPurchasePOComplete, createPurchasePOComplete, IPurchasePO } from "../../api/purchasePO";
import { getVendors, IVendor } from "../../api/vendor";
import { getItems } from "../../api/items";
import { createAModelDocument } from "../../api/document";

import { FieldSelect, ArraySelect } from "../../app/Inputs";
import Button from "../../app/Button";
import { LinearProgress } from "@material-ui/core";

import { exportPdf } from "../../logic/pdf";

export const DocumentForm = ({ createdPO, data, onDone }: { onDone: () => void; data: IPurchasePOComplete; createdPO: IPurchasePO }) => {
    const divToPrint = useRef<HTMLElement | null>();
    const [contact, setContact] = useState<IContact>();
    const [vendor, setVendor] = useState<IVendor>();
    const [requester, setRequester] = useState<IEmployee>();

    const [canSave, setCanSave] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

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
                const { blobPDF, blobUrl } = await exportPdf(divToPrint.current);
                // console.log({ blobPDF, blobUrl });
                const resp = await createAModelDocument(
                    "purchasePO",
                    createdPO.id,
                    blobPDF,
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

    console.log({ createdPO, data });

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
                        width: "550px",
                        minHeight: "910px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <h3>Date: {new Date().toJSON().slice(0, 19)}</h3>
                    <h3>Contact: {`${contact?.firstName} ${contact?.lastName} - ${contact?.department}`}</h3>
                    <h3>Vendor: {vendor?.name}</h3>
                    <h3>Requester: {requester?.username}</h3>
                    <h3>Status: {data.status}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Tax</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.lines.map((l: any, i: number) => (
                                <tr key={i}>
                                    <td>{l.ItemId}</td>
                                    <td>{l.description}</td>
                                    <td>{l.price}</td>
                                    <td>{l.quantity}</td>
                                    <td>{l.tax ? "Yes" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export const FinalForm = ({ onDone, onBack, data }: { onDone: (a: any) => void; onBack: () => void; data: IPurchasePOComplete }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const { ContactId, requester, status, VendorId, lines } = data;
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
                ContactId,
                requester,
                status,
                VendorId,
                lines: newLines,
            } as IPurchasePOComplete);
            if (resp) {
                console.log(resp);
                onDone(resp);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box height="85%" display="flex" flexDirection="column">
            <Typography variant="h5">Are you sure?</Typography>
            <Typography variant="subtitle1" style={{ margin: "1em 0" }}>
                If you finilize your Purchase order, You can't update it, So if you want to update it you should make new version or add new
                one
            </Typography>
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
}: {
    data?: IPurchasePOComplete;
    onDone: (items: IPurchasePOLine[]) => void;
    onBack: () => void;
}) => {
    const [items, setItems] = useState([]);
    const [createdItems, setCreatedItems] = useState<IPurchasePOLine[]>(data && data.lines ? data.lines : []);

    const schema = Yup.object().shape({
        ItemId: Yup.number().required(),
        quantity: Yup.number().required().min(1),
        price: Yup.number().required().min(0.1),
    });

    useEffect(() => {
        getItems()
            .then((d) => d && setItems(d))
            .catch((e) => console.log(e));
    }, []);

    const handleSubmit = (d: IPurchasePOLine) => {
        if (d) {
            setCreatedItems((prev) => prev.concat(d));
        }
    };

    const handleDelete = async (index: number) => {
        setCreatedItems((prev) => prev.filter((item: any, ind) => ind !== index));
    };

    return (
        <Box display="flex">
            <Box flex={1} mr={2}>
                <Formik initialValues={{} as IPurchasePOLine} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, handleChange, setFieldValue, handleBlur, errors }) => (
                        <Form>
                            <Autocomplete
                                options={items}
                                getOptionLabel={(item: any) => item.name}
                                onChange={(e, nv) => setFieldValue("ItemId", nv.id)}
                                onBlur={handleBlur}
                                renderInput={(params) => <TextField {...params} label="Item" name="ItemId" variant="outlined" />}
                                fullWidth
                            />
                            {errors.ItemId && <Typography variant="caption">{errors.ItemId}</Typography>}
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
                                <Button startIcon={<ChevronLeft />} onClick={onBack} variant="contained" color="primary">
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
                        </Form>
                    )}
                </Formik>
            </Box>
            <Box flex={1}>
                <TableContainer component={Paper}>
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

export const CreateForm = ({ onDone, data }: { data?: IPurchasePOComplete; onDone: (data: IPurchasePOComplete) => void }) => {
    const schema = Yup.object().shape({
        requester: Yup.number().required(),
        VendorId: Yup.number().required(),
        ContactId: Yup.number().required(),
    });

    const handleSubmit = (d: IPurchasePOComplete) => {
        onDone(d);
    };

    return (
        <Formik initialValues={data ? data : ({} as IPurchasePOComplete)} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, handleChange, handleBlur, isValid }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns="auto" gridGap={8}>
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
                        <Button type="submit" disabled={!isValid} kind="add" style={{ margin: "0.5em 0" }}>
                            Next
                        </Button>
                    </Box>
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
            <FieldSelect
                disabled
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
            <FieldSelect
                disabled
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
            <FieldSelect
                disabled
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
            <ArraySelect
                items={["completed", "shipped", "pending"]}
                name="status"
                label="Status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.status)}
                fullWidth
            />
        </>
    );
};
