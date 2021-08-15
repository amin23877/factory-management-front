import React, { Fragment } from "react";
import { Box, FormControlLabel, FormLabel, RadioGroup, Radio, Checkbox, FormControl, Paper } from "@material-ui/core";

import { FieldSelect } from "../../app/Inputs";
import TextField from "../../app/TextField";

import { getClients } from "../../api/client";
import { getClientTypes } from "../../api/clientType";
import { getAllEmployees } from "../../api/employee";

export const GeneralForm = ({
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
        <Fragment>
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
            </Paper>
            <Box mb={1} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr 1fr 1fr">
                <FieldSelect
                    request={getClientTypes}
                    itemTitleField="name"
                    itemValueField="id"
                    name="ClientTypeId"
                    label="Customer Type"
                    fullWidth
                    onChange={handleChange}
                    value={values.ClientTypeId}
                    error={Boolean(errors.ClientTypeId)}
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
                    name="zipCode"
                    value={values.zipCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.zipCode && touched.zipCode)}
                    helperText={touched.zipCode && errors.zipCode && String(errors.zipCode)}
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
                    name="mainPhone"
                    value={values.mainPhone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.mainPhone && touched.mainPhone)}
                    helperText={touched.mainPhone && errors.mainPhone && String(errors.mainPhone)}
                    label="Main Phone"
                />
                <TextField
                    name="mainEmail"
                    value={values.mainEmail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.mainEmail && touched.mainEmail)}
                    helperText={touched.mainEmail && errors.mainEmail && String(errors.mainEmail)}
                    label="Main Email"
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
                <TextField
                    name="productLine"
                    value={values.productLine}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.productLine && touched.productLine)}
                    helperText={touched.productLine && errors.productLine && String(errors.productLine)}
                    label="Product Line"
                />
                {/* <TextField
                name="location"
                value={values.location}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.location && touched.location)}
                helperText={touched.location && errors.location && String(errors.location)}
                label="Location"
            />

            <TextField
                name="defaultBillingContact"
                value={values.defaultBillingContact}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.defaultBillingContact && touched.defaultBillingContact)}
                helperText={
                    touched.defaultBillingContact &&
                    errors.defaultBillingContact &&
                    String(errors.defaultBillingContact)
                }
                label="Default billing contact"
            />
            <TextField
                name="preferredCompany"
                value={values.preferredCompany}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.preferredCompany && touched.preferredCompany)}
                helperText={touched.preferredCompany && errors.preferredCompany && String(errors.preferredCompany)}
                label="Preferred company"
            />
            <TextField
                name="preferredService"
                value={values.preferredService}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.preferredService && touched.preferredService)}
                helperText={touched.preferredService && errors.preferredService && String(errors.preferredService)}
                label="Preferred service"
            />
            <TextField
                name="account"
                value={values.account}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.account && touched.account)}
                helperText={touched.account && errors.account && String(errors.account)}
                label="Account"
            />
            <TextField
                name="specialInstructions"
                value={values.specialInstructions}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.specialInstructions && touched.specialInstructions)}
                helperText={
                    touched.specialInstructions && errors.specialInstructions && String(errors.specialInstructions)
                }
                label="special instructions"
            />
            <TextField
                name="allowedShippingPercentOverUnder"
                value={values.allowedShippingPercentOverUnder}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.allowedShippingPercentOverUnder && touched.allowedShippingPercentOverUnder)}
                helperText={
                    touched.allowedShippingPercentOverUnder &&
                    errors.allowedShippingPercentOverUnder &&
                    String(errors.allowedShippingPercentOverUnder)
                }
                label="Shipping percent"
            /> */}

                <FormControl style={{ display: "flex", gridColumnEnd: "span 2" }}>
                    <FormLabel style={{ display: "inline" }}>Size</FormLabel>
                    <RadioGroup row name="size" value={values.size} onChange={handleChange}>
                        <FormControlLabel value="small" control={<Radio />} label="Small" />
                        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                        <FormControlLabel value="large" control={<Radio />} label="Large" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Fragment>
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
                request={getClients}
                itemTitleField="name"
                itemValueField="id"
                name="parent"
                label="Parent"
                fullWidth
                onChange={handleChange}
                value={values.parent}
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
                name="website"
                value={values.website}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.website && touched.website)}
                helperText={touched.website && errors.website && String(errors.website)}
                label=" Main Contact Name"
                disabled
            />
            <TextField
                name="website"
                value={values.website}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.website && touched.website)}
                helperText={touched.website && errors.website && String(errors.website)}
                label="Main Contact Phone"
                disabled
            />
            <TextField
                name="website"
                value={values.website}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.website && touched.website)}
                helperText={touched.website && errors.website && String(errors.website)}
                label="Main Contact Email"
                disabled
            />
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
                name="website"
                value={values.website}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.website && touched.website)}
                helperText={touched.website && errors.website && String(errors.website)}
                label=" Regular Commision Percentage"
            />
            <TextField
                name="website"
                value={values.website}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.website && touched.website)}
                helperText={touched.website && errors.website && String(errors.website)}
                label="Overage Commission Percentage"
            />
        </Box>
    );
};
