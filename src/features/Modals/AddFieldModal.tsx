import React from "react";
import { Box, FormControlLabel, FormLabel, RadioGroup, Radio, FormControl } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { createAModelAddress, deleteAModelAddress, updateAModelAddress, IAddress } from "../../api/address";
import { getAddressTypes } from "../../api/addressType";
import { basePost } from "../../api";

const schema = Yup.object().shape({
    filterName: Yup.string().required(),
    filterValue: Yup.string().required(),
    type: Yup.string().required(),
    name: Yup.string().required(),
    required: Yup.string().required(),
    default:Yup.string(),
    valid:Yup.string()
});



export const AddFieldModal = ({ open, onClose}:{open: boolean; onClose: () => void ;}) => {
    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        console.log(values);
        try{
            const resp = await basePost('/field',values);
            if(resp){
                console.log(resp);
            }
        } catch (e){
            console.log(e);
        }

        // if (data?.id) {
        //     updateAModelAddress(data?.id, values)
        //         .then((d) => {
        //             console.log(d);
        //             onDone && onDone();
        //             setSubmitting(false);
        //             onClose();
        //         })
        //         .catch((e) => console.log(e));
        // } else {
        //     createAModelAddress(model, itemId, values)
        //         .then((d) => {
        //             console.log(d);
        //             onDone && onDone();
        //             setSubmitting(false);
        //             onClose();
        //         })
        //         .catch((e) => console.log(e));
        // }
    };

    // const initialValues = data?.id
    //     ? {
    //         address: data.address,
    //         address2: data.address2,
    //         city: data.city,
    //         state: data.state,
    //         zip: data.zip,
    //         country: data.country,
    //         main: data.main,
    //         AddressTypeId: data?.AddressTypeId,
    //     }
    //     : ({} as IAddress);

    const handleDelete = () => {
        // if (data?.id) {
        //     deleteAModelAddress(data.id)
        //         .then((d) => {
        //             onClose();
        //             onDone && onDone();
        //         })
        //         .catch((e) => console.log(e));
        // }
    };

    return (
        <Dialog open={open} onClose={onClose} title={"Add Field Modal"}>
            <Box m={3}>
            {/* initialValues={initialValues} */}
                <Formik initialValues={{filterName : '' , filterValue : '' , type:'',name:'',required:'',default:'',valid:''}} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={8} gridColumnGap={8}>
                                <TextField
                                    name="filterName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.filterName && touched.filterName)}
                                    helperText={errors.filterName && touched.filterName}
                                    value={values.filterName}
                                    label="Filter Name"
                                />
                                <TextField
                                    name="filterValue"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.filterValue && touched.filterValue)}
                                    helperText={errors.filterValue && touched.filterValue}
                                    value={values.filterValue}
                                    label="Filter Value"
                                />
                                <TextField
                                    name="type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.type && touched.type)}
                                    helperText={errors.type && touched.type}
                                    value={values.type}
                                    label="Type"
                                />
                                <TextField
                                    name="name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.name && touched.name)}
                                    helperText={errors.name && touched.name}
                                    value={values.name}
                                    label="Name"
                                />
                                <TextField
                                    name="required"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.required && touched.required)}
                                    helperText={errors.required && touched.required}
                                    value={values.required}
                                    label="Required"
                                />
                                <TextField
                                    name="default"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.default && touched.default)}
                                    helperText={errors.default && touched.default}
                                    value={values.default}
                                    label="Default"
                                />
                                <TextField
                                    name="valid"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.valid && touched.valid)}
                                    helperText={errors.valid && touched.valid}
                                    value={values.valid}
                                    label="Valid"
                                />
                                {/* <TextField
                                    name="filterName2"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.address2 && touched.address2)}
                                    helperText={errors.address2 && touched.address2}
                                    value={values.address2}
                                    label="address2"
                                />
                                <TextField
                                    name="city"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.city && touched.city)}
                                    helperText={errors.city && touched.city}
                                    value={values.city}
                                    label="city"
                                />
                                <TextField
                                    name="state"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.state && touched.state)}
                                    helperText={errors.state && touched.state}
                                    value={values.state}
                                    label="state"
                                />
                                <TextField
                                    name="zip"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.zip && touched.zip)}
                                    helperText={errors.zip && touched.zip}
                                    value={values.zip}
                                    label="zip"
                                />
                                <TextField
                                    name="country"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.country && touched.country)}
                                    helperText={errors.country && touched.country}
                                    value={values.country}
                                    label="country"
                                />
                                <FieldSelect
                                    style={{ gridColumnEnd: "span 2" }}
                                    label="Address type"
                                    request={getAddressTypes}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    name="AddressTypeId"
                                    value={values.AddressTypeId}
                                    onChange={handleChange}
                                /> */}

                                {/* <FormControl fullWidth style={{ gridColumnEnd: "span 2" }}>
                                    <FormLabel>Main</FormLabel>
                                    <RadioGroup row name="main" value={values.main} onChange={handleChange}>
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl> */}

                                <Button type="submit" disabled={isSubmitting} kind= "add">
                                    Save
                                </Button>
                                {/* {data?.id && (
                                    <Button kind="delete" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                )} */}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
