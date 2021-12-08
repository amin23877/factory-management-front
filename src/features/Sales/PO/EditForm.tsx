import React, { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { AddressesForm, GeneralForm } from "./Forms";
import { EntitiesForm } from "../SO/Forms";
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

    const phone = useMediaQuery("(max-width:600px)");

    return (
        <Box>
            <Formik validationSchema={schema} initialValues={poData} onSubmit={handleSubmit}>
                {({ values, handleChange, handleBlur, setValues, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Box
                            display="flex"
                            flexDirection="column"
                            style={phone ? { gap: 10 } : { gap: 10, height: "72.3vh" }}
                        >
                            <Box>
                                <BasePaper>
                                    <GeneralForm
                                        onChangeInit={setValues}
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                    />
                                    <Box display="flex" justifyContent="center" style={{ width: "100%" }} my={1}>
                                        <Button
                                            disabled={isSubmitting}
                                            type="submit"
                                            kind="edit"
                                            style={{ width: "100%" }}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </BasePaper>
                            </Box>
                            <Box flex={1}>
                                <BasePaper
                                    style={{
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
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
