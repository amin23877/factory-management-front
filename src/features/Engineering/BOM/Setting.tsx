import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR from "swr";

import Dialog from "../../../app/Dialog";
import { ArraySelect } from "../../../app/Inputs";
import Button from "../../../app/Button";

function BOMModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: (data: string) => void }) {
    const { data: filters } = useSWR("/filter");
    const validValues = filters ? filters.find((f: any) => f.name === "Product Family").valid : [];

    return (
        <Dialog open={open} onClose={onClose} title="Select Product family">
            <Formik onSubmit={(data) => onDone(data["Product family"])} initialValues={{} as any}>
                {({ values, errors, handleChange, handleBlur }) => (
                    <Form>
                        <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                            <ArraySelect
                                name="Product family"
                                label="Product family"
                                items={validValues}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Button kind="add" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default BOMModal;
