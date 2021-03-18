import React, { useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Box from "@material-ui/core/Box";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";

import Dialog from "../../app/Dialog";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { createPO } from "../../api/po";
import { getContacts } from "../../api/contact";
import { getClients } from "../../api/client";
import { getAllEmployees } from "../../api/employee";
import { getProjects } from "../../api/project";
import { Typography } from "@material-ui/core";

export default function AddPOModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    const [fileName, setFileName] = useState("");
    const uploader = useRef<HTMLInputElement | null>();
    const schema = Yup.object().shape({
        // name: Yup.string().required(),
    });

    return (
        <Dialog open={open} onClose={onClose} title={"Add new Purchase Order"}>
            <Box>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        number: "",
                        file: undefined,
                        ContactId: undefined,
                        ClientId: undefined,
                        EmployeeId: undefined,
                        ProjectId: undefined,
                        reciever: undefined,
                    }}
                    onSubmit={async (data, { setSubmitting }) => {
                        try {
                            const resp = await createPO(data);
                            if (resp) {
                                onClose();
                            }
                        } catch (error) {
                            console.log(error);
                        } finally {
                            onDone();
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                        <Form>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
                                <input
                                    hidden
                                    type="file"
                                    name="file"
                                    ref={(e) => (uploader.current = e)}
                                    onChange={(e: any) => {
                                        if (e.target.files) {
                                            setFieldValue("file", e.target.files[0]);
                                            console.log(e.target.files[0]);

                                            setFileName(e.target.files[0].name);
                                        }
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => uploader.current?.click()}
                                    style={{
                                        margin: "0.5em 0",
                                        backgroundColor: "#fff",
                                        color: " rgb(43,140,255) ",
                                        border: "1px solid rgb(43,140,255) ",
                                        width: "80%",
                                    }}
                                >
                                    <PhotoSizeSelectActualOutlinedIcon style={{ marginRight: "7px" }} />
                                    upload
                                </Button>
                                {fileName && <Typography variant="caption">{fileName}</Typography>}

                                <div
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "center",
                                        padding: "0px 10%",
                                    }}
                                >
                                    <TextField
                                        style={{ marginBottom: "8px", flex: 1 }}
                                        name="number"
                                        label="number"
                                        value={values.number}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.number && touched.number)}
                                        helperText={errors.number}
                                    />
                                </div>
                                <div style={{ marginBottom: "5px", width: "80%", marginRight: "auto", marginLeft: "auto", display: "flex",justifyContent:"center" }}>

                                    <FieldSelect
                                        style={{flex:1}}
                                        label="Contact"
                                        name="ContactId"
                                        request={getContacts}
                                        itemTitleField="lastName"
                                        itemValueField="id"
                                        value={values.ContactId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.ContactId && touched.ContactId)}
                                    />
                                </div>
                                <div style={{ marginBottom: "5px", width: "80%", marginRight: "auto", marginLeft: "auto", display: "flex",justifyContent:"center" }}>

                                <FieldSelect
                                    style={{flex:1}}
                                    label="Client"
                                    name="ClientId"
                                    request={getClients}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    value={values.ClientId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ClientId && touched.ClientId)}
                                    />
                                    </div>
                                    <div style={{ marginBottom: "5px", width: "80%", marginRight: "auto", marginLeft: "auto", display: "flex",justifyContent:"center" }}>

                                <FieldSelect
                                    style={{flex:1}}
                                    label="Employee"
                                    name="EmployeeId"
                                    request={getAllEmployees}
                                    itemTitleField="username"
                                    itemValueField="id"
                                    value={values.EmployeeId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.EmployeeId && touched.EmployeeId)}
                                    />
                                    </div>
                                    <div style={{ marginBottom: "5px", width: "80%", marginRight: "auto", marginLeft: "auto", display: "flex",justifyContent:"center" }}>

                                <FieldSelect
                                    style={{flex:1}}
                                    label="Project"
                                    name="ProjectId"
                                    request={getProjects}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    value={values.ProjectId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ProjectId && touched.ProjectId)}
                                    />
                                    </div>
                                    <div style={{ marginBottom: "5px", width: "80%", marginRight: "auto", marginLeft: "auto", display: "flex",justifyContent:"center" }}>

                                <FieldSelect
                                    style={{flex:1}}
                                    request={getAllEmployees}
                                    itemTitleField="username"
                                    itemValueField="id"
                                    label="Reciever"
                                    name="reciever"
                                    value={values.reciever}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.reciever && touched.reciever)}
                                    />
                                    </div>

                                <Button type="submit" style={{ width: "80%", margin: "1em 0" }} kind="add">
                                    Add
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
