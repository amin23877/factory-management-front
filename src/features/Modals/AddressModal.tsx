import React, { useState, useEffect } from "react";
import { useTheme, Box, TextField, CircularProgress, FormControlLabel, FormLabel, RadioGroup, Radio, FormControl } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { createAModelAddress, deleteAModelAddress, updateAModelAddress, IAddress } from "../../api/address";
import { getAddressTypes } from "../../api/addressType";

const schema = Yup.object().shape({
    AddressTypeId: Yup.number().required(),
});

export const AddressModal = ({
    open,
    onClose,
    model,
    itemId,
    data,
    onDone,
}: {
    open: boolean;
    onClose: () => void;
    model: string;
    itemId: string;
    data?: IAddress;
    onDone?: () => void;
}) => {
    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose} title={`${data?.id ? "Edit" : "Add"} an Address to ${model}`}>
            <Box m={3}>
                <Formik
                    initialValues={
                        data?.id
                            ? {
                                  address: data.address,
                                  address2: data.address2,
                                  city: data.city,
                                  state: data.state,
                                  zip: data.zip,
                                  country: data.country,
                                  main: data.main,
                                  AddressTypeId: data?.AddressTypeId,
                              }
                            : { address: "", address2: "", city: "", state: "", zip: "", country: "", main: false, AddressTypeId: 0 }
                    }
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (data?.id) {
                            updateAModelAddress(data?.id, values)
                                .then((d) => {
                                    console.log(d);
                                    onDone && onDone();
                                    setSubmitting(false);
                                    onClose();
                                })
                                .catch((e) => console.log(e));
                        } else {
                            createAModelAddress("client", itemId, values)
                                .then((d) => {
                                    console.log(d);
                                    onDone && onDone();
                                    setSubmitting(false);
                                    onClose();
                                })
                                .catch((e) => console.log(e));
                        }
                    }}
                >
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <TextField
                                name="address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.address && touched.address)}
                                helperText={errors.address && touched.address}
                                value={values.address}
                                label="address"
                                fullWidth
                            />
                            <TextField
                                name="address2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.address2 && touched.address2)}
                                helperText={errors.address2 && touched.address2}
                                value={values.address2}
                                label="address2"
                                fullWidth
                            />
                            <TextField
                                name="city"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.city && touched.city)}
                                helperText={errors.city && touched.city}
                                value={values.city}
                                label="city"
                                fullWidth
                            />
                            <TextField
                                name="state"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.state && touched.state)}
                                helperText={errors.state && touched.state}
                                value={values.state}
                                label="state"
                                fullWidth
                            />
                            <TextField
                                name="zip"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.zip && touched.zip)}
                                helperText={errors.zip && touched.zip}
                                value={values.zip}
                                label="zip"
                                fullWidth
                            />
                            <TextField
                                name="country"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.country && touched.country)}
                                helperText={errors.country && touched.country}
                                value={values.country}
                                label="country"
                                fullWidth
                            />

                            <FieldSelect
                                label="Address type"
                                request={getAddressTypes}
                                itemTitleField="name"
                                itemValueField="id"
                                name="AddressTypeId"
                                value={values.AddressTypeId}
                                fullWidth
                                onChange={handleChange}
                            />

                            <FormControl fullWidth style={{ margin: "0.5em" }}>
                                <FormLabel>Main</FormLabel>
                                <RadioGroup name="main" value={values.main} onChange={handleChange}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>

                            <Box my={2} textAlign="center">
                                <Button type="submit" disabled={isSubmitting} kind={data ? "edit" : "add"}>
                                    Save
                                </Button>
                                {data?.id && (
                                    <Button
                                        kind="delete"
                                        style={{ margin: "0 1em" }}
                                        onClick={() => {
                                            if (data?.id) {
                                                deleteAModelAddress(data.id)
                                                    .then((d) => {
                                                        onClose();
                                                        onDone && onDone();
                                                    })
                                                    .catch((e) => console.log(e));
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
