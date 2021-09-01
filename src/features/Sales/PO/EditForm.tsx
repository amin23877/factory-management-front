import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { AddressesForm, EntitiesForm, GeneralForm } from "./Forms";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";
import Toast from "../../../app/Toast";

import { IPO, updatePO } from "../../../api/po";
import { getModifiedValues } from "../../../logic/utils";

const schema = Yup.object().shape({
    // name: Yup.string().required(),
});

export default function EditForm({ poData, onDone }: { poData: IPO; onDone: () => void }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        try {
            if (poData.id) {
                await updatePO(poData.id, getModifiedValues(data, poData));
                onDone();

                Toast("Record updated successfully", "success");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box>
            <Formik validationSchema={schema} initialValues={poData} onSubmit={handleSubmit}>
                {({ values, handleChange, handleBlur, setValues, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Box display="flex" style={{ justifyContent: "space-evenly" }}>
                            <Box flex={1}>
                                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "0 1em " }}>
                                    <GeneralForm
                                        onChangeInit={setValues}
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                    <Box display="flex" justifyContent="center" my={2}>
                                        <Button disabled={isSubmitting} type="submit" kind="edit">
                                            Save
                                        </Button>
                                    </Box>
                                </BasePaper>
                            </Box>
                            <Box flex={3}>
                                <BasePaper
                                    style={{
                                        boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                                        margin: "0 1em",
                                        height: "100%",
                                    }}
                                >
                                    <Tabs
                                        textColor="primary"
                                        value={activeTab}
                                        onChange={(e, nv) => setActiveTab(nv)}
                                        variant="scrollable"
                                        style={{ maxWidth: 700 }}
                                    >
                                        <Tab label="Entities" />
                                        <Tab label="Addresses" />
                                    </Tabs>
                                    <Box>
                                        {activeTab === 0 && (
                                            <EntitiesForm
                                                setFieldValue={setFieldValue}
                                                values={values}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                            />
                                        )}
                                        {activeTab === 1 && (
                                            <AddressesForm
                                                setFieldValue={setFieldValue}
                                                values={values}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                            />
                                        )}
                                    </Box>
                                </BasePaper>
                            </Box>
                        </Box>
                        {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ width: "79%" }}>
                                <Box display="flex" justifyContent="space-between">
                                    <TextField
                                        disabled
                                        name="senderNumber"
                                        label="Sender Number"
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
                                <div className="UpDownPNG"></div>
                                <Box
                                    display="flex"
                                    style={{ width: "100%" }}
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    mr={2}
                                >
                                    <input
                                        hidden
                                        type="file"
                                        name="file"
                                        ref={(e) => (uploader.current = e)}
                                        onChange={(e: any) =>
                                            e.target.files && setFieldValue("file", e.target.files[0])
                                        }
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
                                        <img alt="upload" src={uploadpng} style={{ width: "14px", height: "12px" }} />
                                        upload
                                    </Link>
                                    <Link download href={poData.path} style={{}}>
                                        <img
                                            src={downloadpng}
                                            alt="download"
                                            style={{ width: "14px", height: "12px", display: "inline" }}
                                        />
                                        Download
                                    </Link>
                                </Box>
                            </div>
                        </div> */}
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
