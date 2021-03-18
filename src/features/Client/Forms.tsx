import React from "react";
import { Box, FormControlLabel, FormLabel, RadioGroup, Radio, FormControl } from "@material-ui/core";

import TextField from "../../app/TextField";

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
        <Box display="grid" gridColumnGap={5} gridTemplateColumns="auto auto auto">
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
                name="abbr"
                value={values.abbr}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.abbr && touched.abbr)}
                helperText={touched.abbr && errors.abbr && String(errors.abbr)}
                label="Abbrivation"
            />
            <TextField
                name="location"
                value={values.location}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.location && touched.location)}
                helperText={touched.location && errors.location && String(errors.location)}
                label="Location"
            />
            <TextField
                name="refferedBy"
                value={values.refferedBy}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.refferedBy && touched.refferedBy)}
                helperText={touched.refferedBy && errors.refferedBy && String(errors.refferedBy)}
                label="refferedBy"
            />
            <TextField
                name="defaultBillingContact"
                value={values.defaultBillingContact}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.defaultBillingContact && touched.defaultBillingContact)}
                helperText={touched.defaultBillingContact && errors.defaultBillingContact && String(errors.defaultBillingContact)}
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
                helperText={touched.specialInstructions && errors.specialInstructions && String(errors.specialInstructions)}
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
                name="website"
                value={values.website}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.website && touched.website)}
                helperText={touched.website && errors.website && String(errors.website)}
                label="website"
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
        </Box>
    );
};
