import React, { Fragment } from "react";
import { Box, FormControlLabel, FormLabel, RadioGroup, Radio, Checkbox, FormControl, Paper } from "@material-ui/core";

import { FieldSelect } from "../../../app/Inputs";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";

import { editCustomer, getCustomers, ICustomer } from "../../../api/customer";
import { getCustomerTypes } from "../../../api/customerType";
import { getAllEmployees } from "../../../api/employee";
import Toast from "../../../app/Toast";
// import CustomerTypeAutocomplete from "./ClientTypeAutocomplete";

export const GeneralForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    req,
    cId,
    changeTab,
}: {
    values: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
    req?: any;
    cId: string;
    changeTab: (a: number) => void;
}) => {
    const handleApprove = async () => {
        const resp = await editCustomer(cId, { approved: true } as ICustomer);
        if (resp) {
            Toast("Approved", "success");
            changeTab(0);
        }
    };
    const handleReject = async () => {
        const resp = await editCustomer(cId, { approved: false } as ICustomer);
        if (resp) {
            Toast("Rejected", "success");
            changeTab(2);
        }
    };

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
                    name="active"
                    value={values.active}
                    control={<Checkbox checked={Boolean(values.active)} />}
                    label="Active"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {req ? (
                    <Fragment>
                        <Button kind="add" onClick={handleApprove}>
                            Approve
                        </Button>
                        <Button kind="delete" onClick={handleReject}>
                            Reject
                        </Button>
                    </Fragment>
                ) : (
                    <FormControlLabel
                        name="approved"
                        value={values.approved}
                        control={<Checkbox checked={Boolean(values.approved)} />}
                        label="Approved"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                )}
            </Paper>
            <Box mb={1} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr 1fr 1fr">
                {/* TODO: Add customer type autocomplete later with good props */}
                {/* <CustomerTypeAutocomplete /> */}
                <FieldSelect
                    request={getCustomerTypes}
                    itemTitleField="name"
                    itemValueField="id"
                    name="CustomerTypeId"
                    label="Customer Type"
                    fullWidth
                    onChange={handleChange}
                    value={
                        typeof values.CustomerTypeId === "string" ? values.CustomerTypeId : values.CustomerTypeId?.id
                    }
                    error={Boolean(errors.CustomerTypeId)}
                />
                <TextField
                    name="number"
                    value={values.number}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.number && touched.number)}
                    helperText={touched.number && errors.number && String(errors.number)}
                    label="Customer ID"
                    disabled
                />
                <TextField
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.name && touched.name)}
                    helperText={touched.name && errors.name && String(errors.name)}
                    label="Name"
                />
                <TextField
                    name="address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.address && touched.address)}
                    helperText={touched.address && errors.address && String(errors.address)}
                    label="Address"
                />
                <TextField
                    name="state"
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.state && touched.state)}
                    helperText={touched.state && errors.state && String(errors.state)}
                    label="State"
                />
                <TextField
                    name="city"
                    value={values.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.city && touched.city)}
                    helperText={touched.city && errors.city && String(errors.city)}
                    label="City"
                />
                <TextField
                    name="zipcode"
                    value={values.zipcode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.zipcode && touched.zipcode)}
                    helperText={touched.zipcode && errors.zipcode && String(errors.zipcode)}
                    label="Zip Code"
                />
                <TextField
                    name="country"
                    value={values.country}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.country && touched.country)}
                    helperText={touched.country && errors.country && String(errors.country)}
                    label="Country"
                />
                <TextField
                    name="phone"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.phone && touched.phone)}
                    helperText={touched.phone && errors.phone && String(errors.phone)}
                    label="Main Phone"
                />
                <TextField
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.email && touched.email)}
                    helperText={touched.email && errors.email && String(errors.email)}
                    label="Main Email"
                />
                <FieldSelect
                    value={typeof values.supportStaff === "string" ? values.supportStaff : values.supportStaff?.id}
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    keyField="id"
                    name="supportStaff"
                    label="Sales person"
                    onChange={handleChange}
                />
                <TextField
                    name="productLine"
                    value={values.productLine}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.productLine && touched.productLine)}
                    helperText={touched.productLine && errors.productLine && String(errors.productLine)}
                    label="Product Line"
                />
                <FormControl style={{ display: "flex", gridColumnEnd: "span 2" }}>
                    <FormLabel style={{ display: "inline" }}>Size</FormLabel>
                    <RadioGroup row name="size" value={values.size} onChange={handleChange}>
                        <FormControlLabel value="small" control={<Radio />} label="Small" />
                        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                        <FormControlLabel value="large" control={<Radio />} label="Large" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </>
    );
};
export const MoreInfoForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
}: {
    values: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
}) => {
    return (
        <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr 1fr">
            <TextField
                name="website"
                value={values.website}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.website && touched.website)}
                helperText={touched.website && errors.website && String(errors.website)}
                label="website"
            />
            <TextField
                name="linkedIn"
                value={values.linkedIn}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.linkedIn && touched.linkedIn)}
                helperText={touched.linkedIn && errors.linkedIn && String(errors.linkedIn)}
                label="linkedIn"
            />
            <TextField
                name="facebook"
                value={values.facebook}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.facebook && touched.facebook)}
                helperText={touched.facebook && errors.facebook && String(errors.facebook)}
                label="facebook"
            />
            <TextField
                name="instagram"
                value={values.instagram}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.instagram && touched.instagram)}
                helperText={touched.instagram && errors.instagram && String(errors.instagram)}
                label="instagram"
            />
            <TextField
                name="fax"
                value={values.fax}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.fax && touched.fax)}
                helperText={touched.fax && errors.fax && String(errors.fax)}
                label="fax"
            />
            <FieldSelect
                getOptionList={(resp) => resp.result}
                request={getCustomers}
                itemTitleField="name"
                itemValueField="id"
                name="parent"
                label="Parent"
                fullWidth
                onChange={handleChange}
                value={typeof values.parent === "string" ? values.parent : values.parent?.id}
                error={Boolean(errors.parent)}
            />
            <TextField
                name="refferedBy"
                value={values.refferedBy}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.refferedBy && touched.refferedBy)}
                helperText={touched.refferedBy && errors.refferedBy && String(errors.refferedBy)}
                label="referred By"
            />
        </Box>
    );
};
export const MainContactForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
}: {
    values: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
}) => {
    return (
        <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr">
            {/* // مقادیرش باید تصحیح شه */}
            <TextField
                value={`${values.contact?.firstName} ${values.contact?.lastName}`}
                label=" Main Contact Name"
                disabled
            />
            <TextField value={values.contact?.phone} label="Main Contact Phone" disabled />
            <TextField value={values.contact?.email} label="Main Contact Email" disabled />
        </Box>
    );
};
export const CommissionForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
}: {
    values: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
}) => {
    return (
        <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr">
            <TextField
                name="regularCommisionPercentage"
                value={values.regularCommisionPercentage}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.regularCommisionPercentage && touched.regularCommisionPercentage)}
                helperText={
                    touched.regularCommisionPercentage &&
                    errors.regularCommisionPercentage &&
                    String(errors.regularCommisionPercentage)
                }
                label=" Regular Commision Percentage"
                type="number"
            />
            <TextField
                name="overageCommissionPercentage"
                value={values.overageCommissionPercentage}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.overageCommissionPercentage && touched.overageCommissionPercentage)}
                helperText={
                    touched.overageCommissionPercentage &&
                    errors.overageCommissionPercentage &&
                    String(errors.overageCommissionPercentage)
                }
                label="Overage Commission Percentage"
                type="number"
            />
        </Box>
    );
};
