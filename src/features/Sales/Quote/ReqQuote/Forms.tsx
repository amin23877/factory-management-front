import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import { GeneralForm, CommissionTab, EntitiesTab } from "../Forms";

import Button from "../../../../app/Button";
import { BasePaper } from "../../../../app/Paper";

// import { IQuoteRequest } from "../../../../api/reqQuote";
import LineItemsTable from "../../../LineItem/Table";

import { createQuote, IQuoteComplete } from "../../../../api/quote";
import Toast from "../../../../app/Toast";
import { mutate } from "swr";

export default function AddForms({ requestedQuote, onDone }: { requestedQuote: any; onDone: () => void }) {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        setItems(
            requestedQuote.devices.map((item: any, index: number) => ({
                ItemId: item.number.id,

                index: index + 1,
                name: item.number.name,
                quantity: item.quantity,
                description: item.number.description,
                price: 0,
                tax: false,
            }))
        );
    }, [requestedQuote]);

    const handleTableChange = (
        field: "description" | "price" | "tax",
        index: number,
        value: string | number | boolean
    ) => {
        setItems((prev) => {
            let res = prev.slice();
            res[index][field] = value;

            return res;
        });
    };

    const handleSubmit = async (d: IQuoteComplete) => {
        try {
            const data = JSON.parse(JSON.stringify(d));
            delete data.createdAt;
            delete data.updatedAt;
            delete data.__v;
            delete data.id;
            delete data.devices;

            // console.log({ ...data, lines: items });
            await createQuote({ ...data, lines: items });
            mutate("/quote");

            Toast("Record added", "success");
            onDone();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={requestedQuote} onSubmit={handleSubmit}>
            {({ handleBlur, handleChange, values, setFieldValue }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns="1fr 2fr 1fr" gridGap={10}>
                        <BasePaper>
                            <GeneralForm
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                values={values}
                            />
                            <Button kind="add" type="submit">
                                Add
                            </Button>
                        </BasePaper>
                        <BasePaper>
                            <EntitiesTab handleBlur={handleBlur} handleChange={handleChange} values={values} />
                        </BasePaper>
                        <BasePaper>
                            <CommissionTab handleBlur={handleBlur} handleChange={handleChange} values={values} />
                        </BasePaper>
                        <div style={{ gridColumnEnd: "span 3" }}>
                            <LineItemsTable
                                items={items}
                                onDescriptionChange={(index, value) => handleTableChange("description", index, value)}
                                onPriceChange={(index, value) => handleTableChange("price", index, value)}
                                onTaxChange={(index, value) => handleTableChange("tax", index, value)}
                            />
                        </div>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
