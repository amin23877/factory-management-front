import React from "react";
import { Box, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";

import { IUnit, updateUnit } from "../../api/units";
import { useEffect } from "react";
import { useState } from "react";


import { DateTimePicker } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";

import { ArraySelect } from "../../app/Inputs";



export const ChangeUnitModal = ({ open, onClose, unit, openBom }: { open: boolean; onClose: () => void; unit: IUnit; openBom: (unitId: string) => void }) => {

    const [refresh, setRefresh] = useState<IUnit>();
    const [activeTab, setActiveTab] = useState(0);


    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        try {
            if (unit?.id) {
                const resp = await updateUnit(unit.id, data);
                if (resp) {
                    console.log(resp)
                    onClose();
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setRefresh(unit);
    }, [unit])
    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="lg" title="Change Unit Details">
                <Box p={1}>
                    <Formik initialValues={unit as IUnit} onSubmit={handleSubmit}>
                        {({ values, errors, handleChange, handleBlur, touched, isSubmitting, setFieldValue }) => (
                            <Form>
                                <Box>
                                    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 10 }}>
                                        <Button onClick={() => openBom(unit.id)} style={{ gridColumnEnd: 'span 2', border: '1px solid black', borderRadius: '5px', marginBottom: '10px' }}>
                                            Add UBOM
                                        </Button>
                                        <TextField
                                            name="laborCost"
                                            value={values.laborCost}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.laborCost)}
                                            helperText={errors.laborCost}
                                            size="small"
                                            placeholder="Labor Cost"
                                            label="Labor Cost"
                                        />
                                        <ArraySelect
                                            fullWidth
                                            label="Status"
                                            items={["new", "done"]}
                                            name="status"
                                            value={values.status}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.status)}
                                        />
                                        <DateTimePicker
                                            name="dueDate"
                                            value={values.dueDate || null}
                                            onChange={(d) => setFieldValue("dueDate", d?.toString())}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.dueDate)}
                                            helperText={errors.dueDate}
                                            size="small"
                                            placeholder="dueDate"
                                            label="Due Date"
                                        />
                                        <Autocomplete
                                            value={values.assignee}
                                            options={[]}
                                            getOptionLabel={(option: any) => option.description}
                                            onChange={(e, nv) => {
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Employee" placeholder="Employee" size="small" variant="outlined" />
                                            )}
                                        />
                                    </Box>
                                    <Box >
                                        <Button disabled={isSubmitting} style={{ width: '50%', margin: '1.3em 25% 20px 25%' }} kind="add" type="submit">
                                            Save
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Dialog>
        </>
    );
};
