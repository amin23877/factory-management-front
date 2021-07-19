import React, { ChangeEvent, useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { addFileToManufacturingStep, deleteAManStep } from "../../../api/steps";
import FileUploader from "../../../app/FileUploader";
import { BaseUrl } from "../../../api/config";

function RowModal({
    initialValues,
    open,
    onClose,
    handleChangeRow,
    handleAddRow,
    columns,
    taskId,
}: {
    open: boolean;
    onClose: () => void;
    handleChangeRow: (row: any) => void;
    handleAddRow: (row: any) => void;
    initialValues?: any;
    columns: any[];
    taskId: string;
}) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = (d: any) => {
        if (initialValues) {
            handleChangeRow(d);
        } else {
            handleAddRow(d);
        }
    };

    const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.files) {
                await addFileToManufacturingStep(taskId, initialValues.number, e.target.files[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAManStep(taskId, initialValues.number);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog title="Add/Change step" open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box m={1} height={500}>
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} style={{ marginBottom: "1em" }}>
                    <Tab label="General" />
                    <Tab label="Files" disabled={!initialValues?.number} />
                </Tabs>

                {activeTab === 0 && (
                    <Formik initialValues={initialValues || ({} as any)} onSubmit={handleSubmit}>
                        {({ values, errors, handleChange, handleBlur }) => (
                            <Form>
                                <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                                    {columns.map(
                                        (column) =>
                                            column.field !== "files" && (
                                                <TextField
                                                    key={column.field}
                                                    name={column.field}
                                                    label={column.field}
                                                    value={values[column.field]}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={Boolean(errors[column.field])}
                                                    helperText={errors[column.field]}
                                                    required={column.field === "number"}
                                                />
                                            )
                                    )}
                                    <Button kind="add" type="submit">
                                        Save
                                    </Button>
                                    {initialValues?.number && (
                                        <Button kind="delete" onClick={handleDelete}>
                                            Delete
                                        </Button>
                                    )}
                                </Box>
                            </Form>
                        )}
                    </Formik>
                )}
                {activeTab === 1 && (
                    <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                        <FileUploader onChange={handleUploadFile} multiple={false} />
                        <Box height="370px" overflow="auto">
                            {initialValues?.files?.map((f: any) => (
                                <img
                                    alt={initialValues?.number}
                                    src={"http://digitalphocus.ir" + f}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </Dialog>
    );
}

export default RowModal;
