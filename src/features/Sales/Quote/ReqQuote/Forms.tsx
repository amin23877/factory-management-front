import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import { GeneralForm, CommissionTab } from "../Forms";

import { BasePaper } from "../../../../app/Paper";

// import { IQuoteRequest } from "../../../../api/reqQuote";
import LineItemsTable from "../../../LineItem/Table";

export default function AddForms({ requestedQuote }: { requestedQuote: any }) {
    // TODO: Complete later, last changes stashed
    return (
        <Formik initialValues={requestedQuote} onSubmit={(d) => console.log(d)}>
            {({ handleBlur, handleChange, values, setFieldValue }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns="1fr 1fr 2fr" gridGap={10}>
                        <BasePaper>
                            <GeneralForm
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                values={values}
                            />
                        </BasePaper>
                        <BasePaper>
                            <CommissionTab handleBlur={handleBlur} handleChange={handleChange} values={values} />
                        </BasePaper>
                        <BasePaper>
                            {/* TODO: price tax desc must entered in table */}
                            <LineItemsTable
                                items={requestedQuote.devices.map((item: any, index: number) => ({
                                    index: index + 1,
                                    name: item.number.name,
                                    quantity: item.quantity,
                                    description: item.number.description,
                                    price: 0,
                                    tax: false,
                                }))}
                                onDescriptionChange={(index, value) => {}}
                                onPriceChange={(index, value) => {}}
                                onTaxChange={(index, value) => {}}
                            />
                        </BasePaper>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
