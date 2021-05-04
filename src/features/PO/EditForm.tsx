import React, { useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import Snack from "../../app/Snack";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { IPO, updatePO } from "../../api/po";
import { getContacts } from "../../api/contact";
import { getClients } from "../../api/client";
import { getAllEmployees } from "../../api/employee";
import { getProjects } from "../../api/project";
import "../../styles/main.css";
import uploadpng from "../../assets/bx-cloud-upload.png";
import downloadpng from "../../assets/bx-cloud-download.png";

export default function EditForm({ poData, onDone }: { poData: IPO; onDone: () => void }) {
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const uploader = useRef<HTMLInputElement | null>();
    const schema = Yup.object().shape({
        // name: Yup.string().required(),
    });
    const { number, file, ContactId, ClientId, EmployeeId, ProjectId, reciever, senderNumber } = poData;

    return (
        <div>
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>
            <Box>
                <Formik
                    validationSchema={schema}
                    initialValues={{ number, file, ContactId, ClientId, EmployeeId, ProjectId, reciever, senderNumber }}
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
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ width: "79%" }}>
                                    <Box display="flex" justifyContent="space-between">
                                        <TextField
                                            disabled
                                            name="senderNumber"
                                            label="senderNumber"
                                            value={values.senderNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.senderNumber && touched.senderNumber)}
                                            helperText={errors.senderNumber}
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
                                            style={{ flex: 1, marginRight: "0.5em", marginLeft: "0.5em" }}
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
                                    <Box display="flex" mt={1} justifyContent="space-between" alignItems="center">
                                        <FieldSelect
                                            label="Contact"
                                            name="ContactId"
                                            request={getContacts}
                                            itemTitleField="name"
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
                                            style={{ flex: 1, marginRight: "0.5em", marginLeft: "0.5em" }}
                                        />
                                        <FieldSelect
                                            style={{ flex: 1 }}
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
                                    </Box>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                        <Button type="submit" kind="edit" style={{ marginTop: "1em", width: "20%" }}>
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: "19%",
                                        height: "150px",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        paddingBottom: "20px",
                                    }}
                                >
                                    <div style={{}} className="UpDownPNG"></div>
                                    <Box display="flex" style={{ width: "100%" }} justifyContent="space-evenly" alignItems="center" mr={2}>
                                        <input
                                            hidden
                                            type="file"
                                            name="file"
                                            ref={(e) => (uploader.current = e)}
                                            onChange={(e: any) => e.target.files && setFieldValue("file", e.target.files[0])}
                                        />
                                        <Link
                                            onClick={() => uploader.current?.click()}
                                            style={{
                                                margin: "0.5em 0",
                                                backgroundColor: "#fff",
                                                color: " #486cff ",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <img src={uploadpng} style={{ width: "14px", height: "12px" }} />
                                            upload
                                        </Link>
                                        <Link download href={poData.path} style={{}}>
                                            <img src={downloadpng} style={{ width: "14px", height: "12px", display: "inline" }} />
                                            Download
                                        </Link>
                                    </Box>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Box>
        </div>
    );
}
