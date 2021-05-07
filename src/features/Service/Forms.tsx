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
import { BasePaper } from "../../app/Paper";
import Snack from "../../app/Snack";

import { getItems } from "../../api/items";
import { ILineItem, getALineItem } from "../../api/lineItem";
import { addServiceToLineitem, getFieldServices, IFieldService, updateFieldService } from "../../api/fieldService";
import { getServiceFamilies } from "../../api/serviceFamily";

export const LineItemFSForm = ({ LineItem }: { LineItem: ILineItem }) => {
    const [snack, setSnack] = useState(false);
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

    const handleSubmit = async (d: any) => {
        try {
            if (LineItem.id) {
                const resp = await addServiceToLineitem(LineItem.id, d.serviceId, d.count);
                if (resp) {
                    setSnack(true);
                    refreshServices();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
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
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                                <IconButton>
                                    <DeleteRounded />
                                </IconButton>
                            </TableCell>
                        </TableRow>
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
}: {
    values: IFieldService;
    handleChange: any;
    handleBlur: any;
    errors: any;
}) {
    return (
        <>
            <FieldSelect
                request={getItems}
                itemTitleField="name"
                itemValueField="id"
                label="Item"
                name="ItemId"
                value={values.ItemId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.ItemId)}
                fullWidth
            />
            <FieldSelect
                request={getServiceFamilies}
                itemTitleField="name"
                itemValueField="id"
                label="Service family"
                name="ServiceFamilyId"
                value={values.ServiceFamilyId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.ServiceFamilyId)}
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
            <TextField
                label="Period"
                name="period"
                value={values.period}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.period)}
                fullWidth
            />
            <TextField
                label="Price"
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.price)}
                fullWidth
            />
            <TextField
                label="description"
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

export const EditForm = ({ initialValues, onDone }: { initialValues: IFieldService; onDone: () => void }) => {
    const [snack, setSnack] = useState(false);

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.string().required(),
        length: Yup.string().required(),
        ItemId: Yup.string().required(),
    });

    const handleSubmit = async (d: any) => {
        try {
            if (initialValues.id) {
                const resp = await updateFieldService(initialValues.id, d);
                if (resp) {
                    setSnack(true);
                    onDone();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BasePaper>
            <Snack open={snack} onClose={() => setSnack(false)}>
                Record updated.
            </Snack>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                {({ values, handleBlur, handleChange, errors }) => (
                    <Form>
                        <Box display="flex" flexDirection="column">
                            <FieldServiceForm values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
                            <Button type="submit" kind="edit">
                                Save
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </BasePaper>
    );
};
