import React, { useEffect, useState } from "react";
import { Box, MenuItem } from "@material-ui/core";
import { mutate } from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "../../app/Button";
import TextField from "../../app/TextField";
import { IFilter } from "../../api/filter";
import { basePost } from "../../api";
import { BaseSelect } from "../../app/Inputs/index";
import { getItemsByQuery } from "../../api/items";

export default function FilterForm() {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        valid: Yup.string().required(),
    });

    const handleSubmit = async (d: any) => {
        try {
            await basePost("/filter", d);
            mutate("/filter");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Formik initialValues={{} as IFilter} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, handleChange, handleBlur }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                        <TextField
                            name="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />
                        <TextField
                            name="valid"
                            label="Valid values"
                            value={values.valid}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.valid)}
                            helperText={errors.valid ? errors.valid : "Comma seprated valid values"}
                        />
                        <Button type="submit" kind="add">
                            Add
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}


export const ApplyFilterForm = ({ filter, applyFilter }: { filter: any; applyFilter: (a: any) => void }) => {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        valid: Yup.string().required(),
    });

    const [name, setName] = useState<any>();
    const [value, setValue] = useState<any>();

    const handleSubmit = async (d: any) => {
        console.log(name.name, value)
        const n = name.name;
        const params = { [n]: value }
        console.log(params)
        try {
            // const resp = await getItemsByQuery(params);
            // console.log(resp);
            applyFilter((prev: any) => ({ ...prev, params }))
        } catch (e) {
            console.log(e);
        }
        // try {
        //     await basePost("/filter", d);
        //     mutate("/filter");
        // } catch (error) {
        //     console.log(error);
        // }
    };


    return (
        <Formik initialValues={{ name: '', valid: '' }} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                <Form style={{ width: '250px' }} >
                    <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} >
                        <BaseSelect
                            name="name"
                            id="name"
                            displayEmpty={true}
                            fullWidth
                            value={values.name}
                            onChange={(e) => {
                                handleChange(e);
                                setName(e.target.value)
                            }}
                        // (e: any) => setName(e.target.value)
                        >
                            {filter.map((i: any) => (
                                <MenuItem key={i.id} value={i}>
                                    {i.name}
                                </MenuItem>
                            ))}
                        </BaseSelect>
                        {name && <BaseSelect
                            id="valid"
                            name="valid"
                            displayEmpty={true}
                            fullWidth
                            value={values.valid}
                            onChange={(e) => {
                                handleChange(e);
                                setValue(e.target.value)
                            }}
                        // (e: any) => setValue(e.target.value)
                        >
                            {name?.valid.map((i: any) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </BaseSelect>}
                        <Button type="submit" kind="add" >
                            Apply
                        </Button>
                    </Box>
                </Form>
            )
            }
        </Formik >
    );
}