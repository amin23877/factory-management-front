import React, { ChangeEvent, useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import FileUploader from "../../../app/FileUploader";

import { addFileToStep, stepType } from "../../../api/steps";

function RowModal({
    open,
    type,
    initialValues,
    onClose,
    handleChangeRow,
    handleAddRow,
    handleDelete,
    columns,
    taskId,
}: {
    type: stepType;
    open: boolean;
    onClose: () => void;
    handleChangeRow: (row: any) => void;
    handleAddRow: (row: any) => void;
    handleDelete: (row: any) => void;
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
                await addFileToStep(type, taskId, initialValues.number, e.target.files[0]);
            }
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
                                <Box height="440px" display="flex" flexDirection="column">
                                    <Box display="flex" flexDirection="column">
                                        <Box
                                            py={1}
                                            display="grid"
                                            gridTemplateColumns="1fr 1fr"
                                            overflow="auto"
                                            gridGap={10}
                                        >
                                            {columns.map(
                                                (column) =>
                                                    column.field !== "files" && (
                                                        <TextField
                                                            style={{ alignSelf: "center" }}
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
                                        </Box>
                                        <div style={{ flex: "1 1 200px" }} />
                                    </Box>
                                    <Box mt="auto">
                                        <Button kind="add" type="submit">
                                            Save
                                        </Button>
                                        {initialValues?.number && (
                                            <Button
                                                style={{ marginLeft: 10 }}
                                                kind="delete"
                                                onClick={() => handleDelete(initialValues)}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </Box>
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
