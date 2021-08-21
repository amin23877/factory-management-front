import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "../../../app/Button";
import { CommissionTab, EntitiesTab, GeneralForm } from "./Forms";

import { IQuote } from "../../../api/quote";
import { BasePaper } from "../../../app/Paper";

const schema = Yup.object().shape({
    requester: Yup.string().required(),
    CustomerId: Yup.string().required(),
    salesperson: Yup.string().required(),
});

export default function GeneralQuote({ onDone, data }: { data?: any; onDone: (data: any) => void }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: IQuote) => {
        onDone(data);
    };

    return (
        <Box style={{ overflowY: "auto", width: "100%" }}>
            <Formik initialValues={{} as IQuote} validationSchema={schema} onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, values, isSubmitting, setFieldValue }) => (
                    <Form>
                        <Box display="flex" m={1}>
                            <Box flex={1} mx={2}>
                                <BasePaper>
                                    <GeneralForm
                                        setFieldValue={setFieldValue}
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                </BasePaper>
                            </Box>
                            <Box flex={1}>
                                <BasePaper>
                                    <Tabs
                                        value={activeTab}
                                        onChange={(e, nv) => setActiveTab(nv)}
                                        variant="scrollable"
                                        style={{ maxWidth: 500 }}
                                        textColor="primary"
                                    >
                                        {/* <Tab label="Terms" /> */}
                                        <Tab label="Entities" />
                                        <Tab label="Commission" />
                                    </Tabs>
                                    {/* {activeTab === 0 && (
                                    <TermsTab values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                )} */}
                                    {activeTab === 0 && (
                                        <EntitiesTab
                                            values={values}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />
                                    )}
                                    {activeTab === 1 && (
                                        <CommissionTab
                                            values={values}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />
                                    )}
                                </BasePaper>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="center" my={2} py={2}>
                            <Button disabled={isSubmitting} type="submit" kind="add" style={{ padding: "1em 2em" }}>
                                Add
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
