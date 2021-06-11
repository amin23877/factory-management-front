import React, { useRef } from "react";
import {
    Typography,
    Box,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    LinearProgress,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect, ArraySelect } from "../../app/Inputs";

import { getAllEmployees } from "../../api/employee";
import { getContacts } from "../../api/contact";
import { getClients } from "../../api/client";
import { getProjects } from "../../api/project";
import { getItems } from "../../api/items";
import { exportPdf } from "../../logic/pdf";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '7px',
    },
    pfe: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    headContain: {
        width: '40%',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        width: '30',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    info: {
        width: '65%',
    },
    gray: {
        backgroundColor: 'lightgray',
        textAlign: 'center',
        fontSize: 'large',
        fontWeight: 'bold',
        padding: '5px 20px 20px 20px'
    },
    Qty: {
        width: '30%',
        display: 'flex',
        justifyContent: 'space-between',

    },
    lineItemName: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    item: {
        padding: '0px 3px 5px 3px',
        borderBottom: '2px solid black',
        fontWeight: 'bold',
        marginBottom: '5px',
    }
});

export const DocumentForm = ({ onDone }: { onDone: () => void }) => {
    const divToPrint = useRef<HTMLElement | null>(null);
    const classes = useStyles();
    const handleSaveDocument = async () => {
        if (divToPrint.current) {
            await exportPdf(divToPrint.current);
        }
    };

    return (
        <Box>
            <Typography>We made a pdf from your Quote, now you can save it</Typography>
            <div style={{ height: 400, overflowY: "auto" }}>
                <div id="myMm" style={{ height: "1mm" }} />
                <div
                    id="divToPrint"
                    ref={(e) => (divToPrint.current = e)}
                    style={{
                        backgroundColor: "#f1f4f9",
                        padding: '7px',
                        color: "black",
                        width: "835px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minHeight: "1200px",
                    }}
                >
                    <div className={classes.header} style={{ marginBottom: '15px' }}>
                        <div>LOGO</div>
                        <div>
                            <div>
                                Quoted By :
                            </div>
                            <div>
                                felani
                            </div>
                        </div>
                        <div className={classes.pfe}>
                            <div style={{ fontSize: 'x-large', fontWeight: 'bold', color: 'teal' }}>Quote</div>
                            <div>
                                <span>phone: </span>
                                <span> +989906055809</span>
                            </div>
                            <div>
                                <span>fax: </span>
                                <span> +989906055809</span>
                            </div>
                            <div>
                                <span>email: </span>
                                <span> akdjakhdkjhHA@GMAIL.com</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.header}>
                        <div className={classes.headContain} style={{ marginTop: 'auto' }}>
                            <div className={classes.header}>
                                <span className={classes.title}>Agency: </span>
                                <span className={classes.info}> Qui pariatur cupidatat elit pariatur nisi nisi pariatur incididunt minim sint. </span>
                            </div>
                            <div className={classes.header}>
                                <span className={classes.title}>Requested By: </span>
                                <span className={classes.info}>Aute id sit consequat ipsum est excepteur. Qui qui mollit non fugiat laboris tempor in. </span>
                            </div>
                            <div className={classes.header}>
                                <span className={classes.title}>Project: </span>
                                <span className={classes.info}> </span>
                            </div>
                        </div>
                        <div className={classes.headContain}>
                            <div className={classes.header}>
                                <span className={classes.title}>Quote # : </span>
                                <span className={classes.info}></span>
                            </div>
                            <div className={classes.header}>
                                <span className={classes.title}>Prepaired On : </span>
                                <span className={classes.info}></span>
                            </div>
                            <div className={classes.header}>
                                <span className={classes.title}>Expires : </span>
                                <span className={classes.info}></span>
                            </div>
                            <div className={classes.header}>
                                <span className={classes.title}>Lead Time :</span>
                                <span className={classes.info}></span>
                            </div>
                            <div className={classes.header} style={{ marginTop: '15px' }}>
                                <span className={classes.title}>Ship Via: </span>
                                <span className={classes.info}></span>
                            </div>
                            <div className={classes.header}>
                                <span className={classes.title}>Freight Terms: </span>
                                <span className={classes.info}></span>
                            </div>
                            <div className={classes.header}>
                                <span className={classes.title}>Payment Terms:</span>
                                <span className={classes.info}></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={classes.gray} style={{ marginBottom: '15px' }}>Item Name maybe i dont know </div>
                    {/* inja mire too lineItems.map() */}
                    <div className={classes.header} style={{ marginBottom: '15px' }}>
                        <div className={classes.lineItemName}>
                            <div className={classes.Qty} style={{ width: '50%' }}>
                                <div>
                                    <div className={classes.item}>Line[group]</div>
                                    <div style={{ textAlign: 'center' }}> 11 </div>
                                </div>
                                <div>
                                    <div className={classes.item}>Item No./Description</div>
                                    <div style={{ textAlign: 'center' }}> 11 </div>
                                </div>
                            </div>
                            <ul style={{ paddingRight: '10px' }}>
                                <li>Proident proident et sunt ipsum duis commodo magna esse minim.</li>
                                <li>Sint voluptate enim reprehenderit fugiat.</li>
                                <li>Do cillum ut irure nostrud commodo eiusmod labore adipisicing sint proident qui non.</li>
                                <li>Aliquip reprehenderit nisi anim do sint in enim aliqua officia pariatur id excepteur.</li>
                                <li>Commodo aliqua do excepteur nulla eiusmod do sit ullamco ullamco qui laboris anim ea.</li>
                                <li>Consectetur sint aute amet do eiusmod do consequat.</li>
                                <li>Elit officia sit velit aliquip et non in ut exercitation enim.</li>
                            </ul>
                        </div>
                        <div className={classes.Qty}>
                            <div>
                                <div className={classes.item}>QTY</div>
                                <div style={{ textAlign: 'center' }}> 11 </div>
                            </div>
                            <div>
                                <div className={classes.item}>Unit Price</div>
                                <div style={{ textAlign: 'center' }}> 11 </div>
                            </div>
                            <div>
                                <div className={classes.item}>Unit Total</div>
                                <div style={{ textAlign: 'center' }}> 11 </div>
                            </div>
                        </div>
                    </div>
                    {/* ta inja */}
                    <div className={classes.header} style={{ marginBottom: '15px' }}>
                        <div className={classes.lineItemName}>
                            <div className={classes.Qty} style={{ width: '50%' }}>
                                <div>
                                    <div className={classes.item}>Line[group]</div>
                                    <div style={{ textAlign: 'center' }}> 11 </div>
                                </div>
                                <div>
                                    <div className={classes.item}>Item No./Description</div>
                                    <div style={{ textAlign: 'center' }}> 11 </div>
                                </div>
                            </div>
                            <ul style={{ paddingRight: '10px' }}>
                                <li>Proident proident et sunt ipsum duis commodo magna esse minim.</li>
                                <li>Sint voluptate enim reprehenderit fugiat.</li>
                                <li>Do cillum ut irure nostrud commodo eiusmod labore adipisicing sint proident qui non.</li>
                                <li>Aliquip reprehenderit nisi anim do sint in enim aliqua officia pariatur id excepteur.</li>
                                <li>Commodo aliqua do excepteur nulla eiusmod do sit ullamco ullamco qui laboris anim ea.</li>
                                <li>Consectetur sint aute amet do eiusmod do consequat.</li>
                                <li>Elit officia sit velit aliquip et non in ut exercitation enim.</li>
                            </ul>
                        </div>
                        <div className={classes.Qty}>
                            <div>
                                <div className={classes.item}>QTY</div>
                                <div style={{ textAlign: 'center' }}> 11 </div>
                            </div>
                            <div>
                                <div className={classes.item}>Unit Price</div>
                                <div style={{ textAlign: 'center' }}> 11 </div>
                            </div>
                            <div>
                                <div className={classes.item}>Unit Total</div>
                                <div style={{ textAlign: 'center' }}> 11 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Box textAlign="right">
                <Button kind="add" onClick={handleSaveDocument}>
                    Save
                </Button>
                {/* {isUploading && <LinearProgress />} */}
            </Box>
        </Box>
    );
};

export const LineItemForm = ({
    handleChange,
    handleBlur,
    handleDelete,
    values,
    errors,
    touched,
    LIData,
    isSubmitting,
}: {
    values: any;
    errors: any;
    touched: any;
    LIData: any;
    isSubmitting: boolean;
    handleDelete: () => void;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box>
            <Box mb={2} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
                <FieldSelect
                    style={{ gridColumnEnd: "span 2" }}
                    label="Item"
                    name="ItemId"
                    value={values.ItemId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    request={getItems}
                    itemTitleField="name"
                    itemValueField="id"
                    error={Boolean(errors.ItemId && touched.ItemId)}
                />
                <TextField
                    placeholder="description"
                    label="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    placeholder="quantity"
                    label="quantity"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.quantity && touched.quantity)}
                    helperText={errors.quantity}
                />
                <TextField
                    placeholder="price"
                    label="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.price && touched.price)}
                    helperText={errors.price}
                />
                <TextField
                    placeholder="index"
                    label="index"
                    name="index"
                    value={values.index}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.index && touched.index)}
                    helperText={errors.index}
                />
                <FormControl style={{ margin: "0.5em" }}>
                    <FormLabel>Tax?</FormLabel>
                    <RadioGroup
                        value={String(values.tax)}
                        name="tax"
                        onChange={handleChange}
                        style={{ flexDirection: "row" }}
                    >
                        <FormControlLabel control={<Radio />} label="Yes" value="true" />
                        <FormControlLabel control={<Radio />} label="No" value="false" />
                    </RadioGroup>
                </FormControl>
            </Box>

            <Box textAlign="center">
                <Button disabled={isSubmitting} type="submit" kind={LIData ? "edit" : "add"}>
                    {LIData ? "Save" : "Add"}
                </Button>
                {LIData && (
                    <Button kind="delete" style={{ margin: "0 1em" }} onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export const GeneralForm = ({
    handleChange,
    handleBlur,
    values,
    edit,
}: {
    edit?: boolean;
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <>
            <Typography variant="h6">General</Typography>
            <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
                {edit && <TextField label="number" value={values.number} style={{ width: "100%" }} disabled />}
                <DateTimePicker
                    value={values.entryDate}
                    name="entryDate"
                    label="Entry Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    value={values.expireDate}
                    name="expireDate"
                    label="Expire Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <FieldSelect
                    value={values.salesperson}
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    keyField="id"
                    name="salesperson"
                    label="Sales person"
                    onChange={handleChange}
                />
                <FieldSelect
                    value={values.requester}
                    request={getContacts}
                    itemTitleField="name"
                    itemValueField="id"
                    keyField="id"
                    name="requester"
                    label="Requester"
                    onChange={handleChange}
                />
                <FieldSelect
                    value={values.ClientId}
                    request={getClients}
                    itemTitleField="name"
                    itemValueField="id"
                    name="ClientId"
                    label="Client"
                    onChange={handleChange}
                />
                <FieldSelect
                    value={values.ProjectId}
                    request={getProjects}
                    itemTitleField="name"
                    itemValueField="id"
                    keyField="id"
                    name="ProjectId"
                    label="Project"
                    onChange={handleChange}
                />
                <DateTimePicker
                    value={values.estimatedShipDate}
                    name="estimatedShipDate"
                    label="Estimated Ship Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Box>
        </>
    );
};

export const TermsTab = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box my={1} display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
            <ArraySelect
                style={{ width: "100%" }}
                value={values.status}
                name="status"
                label="Quote Status"
                onChange={handleChange}
                onBlur={handleBlur}
                items={["New", "Pending", "Fulfiled"]}
            />
            <TextField
                style={{ width: "100%" }}
                value={values.frieghtTerms}
                name="frieghtTerms"
                label="Frieght Terms"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                style={{ width: "100%" }}
                value={values.paymentTerms}
                name="paymentTerms"
                label="Payment Terms"
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Box>
    );
};

export const DepositTab = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box my={1} display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
            <TextField
                value={values.deposit}
                name="deposit"
                label="Deposit"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.depositAmount}
                name="depositAmount"
                label="Deposit Amount"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FormControl>
                <FormLabel>Deposit</FormLabel>
                <RadioGroup
                    name="depositRequired"
                    value={String(values.depositRequired)}
                    onChange={handleChange}
                    style={{ flexDirection: "row" }}
                >
                    <FormControlLabel control={<Radio />} label="Yes" value="true" />
                    <FormControlLabel control={<Radio />} label="No" value="false" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export const CommissionTab = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box my={1} display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
            <TextField
                value={values.commissionLabel}
                name="commissionLabel"
                label="Commission Label"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.regularCommission}
                name="regularCommission"
                label="Regular Commission"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.overageCommission}
                name="overageCommission"
                label="Overage Commission"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Box>
    );
};
