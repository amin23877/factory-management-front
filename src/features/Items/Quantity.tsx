import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { Formik, Form } from "formik";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import Snack from "../../app/Snack";

import { updateItemQuantity } from "../../api/items";

export default function UpdateQuantityModal({
    itemId,
    open,
    onClose,
}: {
    itemId: string;
    open: boolean;
    onClose: () => void;
}) {
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmitQty = async (data: any) => {
        try {
            await updateItemQuantity(itemId, data);
            setMsg("New quantity details added");
            setSnack(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog title="Update quantity" open={open} onClose={onClose}>
            <Box>
                <Snack open={snack} onClose={() => setSnack(false)}>
                    {msg}
                </Snack>
                <Formik initialValues={{} as any} onSubmit={handleSubmitQty}>
                    {({ values, errors, handleChange, handleBlur }) => (
                        <Form>
                            <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridColumnGap={10}>
                                <TextField
                                    label="Quantity on hand"
                                    placeholder="Quantity on hand"
                                    name="qtyOnHand"
                                    value={values.qtyOnHand}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Quantity availabe"
                                    placeholder="Quantity availabe"
                                    name="qtyAvailable"
                                    value={values.qtyAvailable}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Quantity on order"
                                    placeholder="Quantity on order"
                                    name="qtyOnOrder"
                                    value={values.qtyOnOrder}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Quantity allocated"
                                    placeholder="Quantity allocated"
                                    name="qtyAllocated"
                                    value={values.qtyAllocated}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Quantity remain"
                                    placeholder="Quantity remain"
                                    name="qtyRemain"
                                    value={values.qtyRemain}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    style={{ gridColumnEnd: "span 2" }}
                                />
                                <TextField
                                    label="Description"
                                    placeholder="Description"
                                    name="description"
                                    value={values.description}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    style={{ gridColumnEnd: "span 2" }}
                                    multiline
                                    rows={3}
                                />
                                <Button kind="edit" type="submit" style={{ gridColumnEnd: "span 2" }}>
                                    Update quantity
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
