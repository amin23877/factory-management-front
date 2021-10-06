import React, { useMemo, useState, Fragment } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// import {} from "./Forms";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";

const schema = Yup.object().shape({});

function Details({ ship }: { ship: any }) {
    const handleSubmit = async (data: any) => {};

    const [infoActiveTab, setInfoActiveTab] = useState(0);
    const [gridActiveTab, setGridActiveTab] = useState(0);

    return (
        <>
            <Formik initialValues={ship} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
                    <Form>
                        <Box mb={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                            <BasePaper>
                                <Box textAlign="center" my={1}>
                                    <Button disabled={isSubmitting} kind="add" type="submit">
                                        Save
                                    </Button>
                                </Box>
                            </BasePaper>
                            <BasePaper>
                                <Tabs
                                    value={infoActiveTab}
                                    onChange={(e, nv) => setInfoActiveTab(nv)}
                                    style={{ marginBottom: "0.5em" }}
                                >
                                    <Tab label="Approvals" />
                                    <Tab label="Accounting" />
                                    <Tab label="Shipping" />
                                    <Tab label="Entities" />
                                    <Tab label="Addresses" />
                                </Tabs>
                            </BasePaper>
                        </Box>

                        <BasePaper>
                            <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
                                <Tab label="Line Item" /> 0
                                <Tab label="Units" /> 1
                                <Tab label="Documents" /> 2
                                <Tab label="Activities" /> 3
                                <Tab label="Shipments" /> 4
                                <Tab label="Filed Service" /> 5
                                <Tab label="Unit Pictures" /> 6
                                <Tab label="Note" /> 7
                                <Tab label="Auditing" /> 8
                            </Tabs>
                        </BasePaper>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Details;
