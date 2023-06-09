import React from "react";
import { Box, Checkbox, FormControlLabel, Paper, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useSWR, { mutate } from "swr";

import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { FieldSelect } from "../../../app/Inputs";
import { BasePaper } from "../../../app/Paper";

import { createVendor, updateVendor } from "../../../api/vendor";
import { getVendorTypes } from "../../../api/vendorType";
import { LockButton, useLock } from "common/Lock";

const schema = Yup.object().shape({
  name: Yup.string().required(),
});
export const AddVendorForm = ({ onDone, tech }: { initialValues?: any; onDone: () => void; tech: boolean }) => {
  const handleSubmit = async (d: any, { setSubmitting }: any) => {
    try {
      const resp = await createVendor({ ...d, tech });
      if (resp) {
        onDone();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={{} as any} validationSchema={schema} onSubmit={handleSubmit}>
      {({ values, errors, handleChange, handleBlur }) => (
        <Form>
          <Box display="flex" flexDirection="column" p={2}>
            <Box>
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
                  request={getVendorTypes}
                  itemTitleField="name"
                  itemValueField="id"
                  name="VendorTypeId"
                  label="Customer Type"
                  fullWidth
                  onChange={handleChange}
                  value={typeof values.VendorTypeId === "string" ? values.VendorTypeId : values.VendorTypeId?.id}
                  error={Boolean(errors.VendorTypeId)}
                />

                <TextField
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.name)}
                  style={{ gridColumnEnd: "span 2 " }}
                />
                <TextField
                  name="address"
                  label="Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.address)}
                />
                <TextField
                  name="city"
                  label="City"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.city)}
                />
                <TextField
                  name="state"
                  label="State"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.state)}
                />
                <TextField
                  name="zip"
                  label="Zip code"
                  value={values.zip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.zip)}
                />
                <TextField
                  name="website"
                  label="Website"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.website)}
                />
                <TextField
                  name="terms"
                  label="Terms"
                  value={values.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.terms)}
                />
                {/* <TextField
                                    style={{ gridColumnEnd: "span 3" }}
                                    value={values.note}
                                    name="note"
                                    label="Note"
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled
                                /> */}
              </Box>
            </Box>
            <Button type="submit" kind="add">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export const UpdateVendorForm = ({ initialValues, onDone }: { initialValues: any; onDone?: () => void }) => {
  const phone = useMediaQuery("(max-width:900px)");
  const { data: contacts } = useSWR(initialValues?.id ? `/contact/vendor/${initialValues?.id}` : null);
  const mainContact = contacts && contacts.length > 0 ? contacts.find((c: any) => c.main) : null;
  const { lock } = useLock();
  const handleSubmit = async (d: any, { setSubmitting }: any) => {
    try {
      if (initialValues.id) {
        await updateVendor(initialValues.id, d);
        onDone && onDone();
        mutate(`/vendor`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ values, errors, handleChange, handleBlur }) => (
        <Form>
          <Box display="flex" flexDirection="column" style={phone ? { gap: 10 } : { gap: 10, height: "100%" }}>
            <BasePaper>
              <Paper
                style={{
                  margin: "0.5em 0 2em 0",
                  paddingLeft: "0.5em",
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
                  control={<Checkbox checked={Boolean(values.active)} size="small" />}
                  label="Active"
                  onChange={handleChange}
                  disabled={lock}
                  onBlur={handleBlur}
                />
              </Paper>
              <Box
                mb={1}
                display="grid"
                gridColumnGap={10}
                gridRowGap={10}
                gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}
              >
                <TextField
                  label="Type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.type)}
                  disabled={lock}
                />
                <TextField
                  name="number"
                  label="Number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.number)}
                  disabled
                />
                <TextField
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.name)}
                  disabled={lock}
                />
                <TextField
                  name="address"
                  label="Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.address)}
                  disabled={lock}
                />
                <TextField
                  name="address2"
                  label="Address 2"
                  value={values.address2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.address2)}
                  disabled={lock}
                />
                <TextField
                  name="country"
                  label="Country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.country)}
                  disabled={lock}
                />
                <TextField
                  name="city"
                  label="City"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={lock}
                  error={Boolean(errors.city)}
                />
                <TextField
                  name="state"
                  label="State"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={lock}
                  error={Boolean(errors.state)}
                />
                <TextField
                  name="zip"
                  label="Zip code"
                  value={values.zip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.zip)}
                  disabled={lock}
                />
                <TextField
                  name="website"
                  label="Website"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.website)}
                  disabled={lock}
                />
                <TextField
                  name="terms"
                  label="Terms"
                  value={values.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={lock}
                  error={Boolean(errors.terms)}
                />
                <TextField
                  style={phone ? { gridColumnEnd: "span 2" } : { gridColumnEnd: "span 3" }}
                  value={values.note}
                  name="note"
                  label="Note"
                  disabled={lock}
                  multiline
                  rows={3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <LockButton />
              </Box>
            </BasePaper>
            {mainContact && (
              <BasePaper style={{ flex: 1 }}>
                <Tabs value={0} style={{ margin: "0.5em 0" }} textColor="primary">
                  <Tab label="Main Contact" />
                </Tabs>
                <Box mt={2} display="grid" gridRowGap={10} gridColumnGap={10} gridTemplateColumns="1fr 1fr">
                  <TextField label="Name" value={`${mainContact?.firstName} ${mainContact?.lastName}`} disabled />
                  <TextField label="Phone" value={mainContact?.phones[0]?.phone} disabled />
                  <TextField label="Email" value={mainContact?.emails[0]?.email} disabled />
                  <TextField label="Department" value={mainContact?.department} disabled />
                  <TextField label="Title" value={mainContact?.title} disabled style={{ gridColumnStart: "span 2" }} />
                </Box>
              </BasePaper>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};
