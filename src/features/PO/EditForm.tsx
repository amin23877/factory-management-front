import React, { useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import PhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';

import Snack from "../../app/Snack";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { IPO, updatePO } from "../../api/po";
import { getContacts } from "../../api/contact";
import { getClients } from "../../api/client";
import { getAllEmployees } from "../../api/employee";
import { getProjects } from "../../api/project";

export default function EditForm({ poData, onDone }: { poData: IPO; onDone: () => void }) {
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const uploader = useRef<HTMLInputElement | null>();
    const schema = Yup.object().shape({
        // name: Yup.string().required(),
    });
    const { number, file, ContactId, ClientId, EmployeeId, ProjectId, reciever } = poData;

    return (
        <div>
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>
            <Box>
                <Formik
                    validationSchema={schema}
                    initialValues={{ number, file, ContactId, ClientId, EmployeeId, ProjectId, reciever }}
                    onSubmit={async (data, { setSubmitting }) => {
                        try {
                            if (poData.id) {
                                const resp = await updatePO(poData.id, data);
                                if (resp) {
                                    setSnack(true);
                                    setMsg("Record updated !");
                                    onDone();
                                }
                            }
                        } catch (error) {
                            console.log(error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                        <Form>
                            <Box display="flex" justifyContent="space-between">
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mr={2}>
                                    <input
                                        hidden
                                        type="file"
                                        name="file"
                                        ref={(e) => (uploader.current = e)}
                                        onChange={(e: any) => e.target.files && setFieldValue("file", e.target.files[0])}
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
                                        width: "80%"
                                    }}
                                >
                                    <PhotoSizeSelectActualOutlinedIcon style={{ marginRight: "7px" }} />
                                    upload
                                </Button>
                                    <Link download href={poData.path}>
                                        Download file
                                    </Link>
                                </Box>
                                <TextField
                                    disabled
                                    name="number"
                                    label="number"
                                    value={values.number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.number && touched.number)}
                                    helperText={errors.number}
                                    style={{ flex: 1 }}
                                />
                                <FieldSelect
                                    label="Client"
                                    name="ClientId"
                                    request={getClients}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    value={values.ClientId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ClientId && touched.ClientId)}
                                    style={{ flex: 1 }}
                                />
                                <FieldSelect
                                    label="Employee"
                                    name="EmployeeId"
                                    request={getAllEmployees}
                                    itemTitleField="username"
                                    itemValueField="id"
                                    value={values.EmployeeId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.EmployeeId && touched.EmployeeId)}
                                    style={{ flex: 1 }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <FieldSelect
                                    label="Contact"
                                    name="ContactId"
                                    request={getContacts}
                                    itemTitleField="lastName"
                                    itemValueField="id"
                                    value={values.ContactId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ContactId && touched.ContactId)}
                                    style={{ flex: 1 }}
                                />
                                <FieldSelect
                                    label="Project"
                                    name="ProjectId"
                                    request={getProjects}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    value={values.ProjectId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ProjectId && touched.ProjectId)}
                                    style={{ flex: 1 }}
                                />
                                <FieldSelect
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
                                <Button type="submit" kind="edit" style={{ marginTop: "1em" }}>
                                    Edit
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </div>
    );
}
