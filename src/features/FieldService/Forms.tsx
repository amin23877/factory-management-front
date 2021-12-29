import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import TextField from "../../app/TextField";
import { FieldSelect } from "../../app/Inputs";
import Button from "../../app/Button";
import Snack from "../../app/Snack";

import { ILineItem, getALineItem } from "../../api/lineItem";
import {
    addServiceToLineitem,
    getFieldServices,
    IFieldService,
    removeServiceFromLineitem,
    // updateFieldService,
} from "../../api/fieldService";
import { getServiceClasses } from "../../api/serviceClass";
import { getServiceCategories } from "../../api/serviceCategories";

export const LineItemFSForm = ({ LineItem }: { LineItem: ILineItem }) => {
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [services, setServices] = useState([]);

    const schema = Yup.object().shape({
        serviceId: Yup.string().required(),
    });

    const refreshServices = async () => {
        try {
            if (LineItem.id) {
                const resp = await getALineItem(LineItem.id);
                if (resp) {
                    setServices(resp.services);
                    console.log(resp);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshServices();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            if (LineItem.id) {
                const resp = await removeServiceFromLineitem(LineItem.id, id);
                if (resp) {
                    setSnack(true);
                    setMsg("Level service deleted from line item");
                    refreshServices();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (d: any) => {
        try {
            if (LineItem.id) {
                const resp = await addServiceToLineitem(LineItem.id, d.serviceId, d.count);
                if (resp) {
                    setSnack(true);
                    setMsg("Level service added to line item");
                    refreshServices();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>

            <Formik initialValues={{} as any} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, handleChange, handleBlur, errors }) => (
                    <Form>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <FieldSelect
                                request={getFieldServices}
                                itemTitleField="name"
                                itemValueField="id"
                                name="serviceId"
                                value={values.serviceId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Field service"
                                error={Boolean(errors.serviceId)}
                            />
                            <TextField
                                name="count"
                                label="Count"
                                value={values.count}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.count)}
                            />
                            <Button type="submit" kind="add">
                                Add
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Period</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((s: any) => (
                            <TableRow key={s.id}>
                                <TableCell>{s.service.name}</TableCell>
                                <TableCell>{s.service.period}</TableCell>
                                <TableCell>{s.service.price}</TableCell>
                                <TableCell onClick={() => handleDelete(s.ServiceId)} style={{ textAlign: "center" }}>
                                    <IconButton>
                                        <DeleteRounded />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default function FieldServiceForm({
    errors,
    handleBlur,
    handleChange,
    values,
    device,
}: {
    values: IFieldService;
    handleChange: any;
    handleBlur: any;
    errors: any;
    device?: string;
}) {
    return (
        <>
            <TextField
                label="Number"
                name="no"
                value={values.no}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.no)}
                fullWidth
            />
            <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name)}
                fullWidth
            />
            <FieldSelect
                request={getServiceClasses}
                itemTitleField="name"
                itemValueField="id"
                label="Class"
                name="ServiceClassId"
                value={typeof values.ServiceClassId == "string" ? values.ServiceClassId : values.ServiceClassId?.id}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.ServiceClassId)}
                fullWidth
            />
            <FieldSelect
                request={getServiceCategories}
                itemTitleField="name"
                itemValueField="id"
                label="Category"
                name="ServiceCategoryId"
                value={
                    typeof values.ServiceCategoryId == "string"
                        ? values.ServiceCategoryId
                        : values.ServiceCategoryId?.id
                }
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.ServiceCategoryId)}
                fullWidth
            />
            <TextField
                label="Price"
                name="retailPrice"
                type="number"
                value={values.retailPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.retailPrice)}
                fullWidth
            />
            <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.description)}
                fullWidth
            />
        </>
    );
}
