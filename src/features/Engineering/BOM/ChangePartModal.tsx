import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { IPart } from "../../../api/matrice";
import { FieldSelect } from "../../../app/Inputs";
import { getItems } from "../../../api/items";

const schema = Yup.object().shape({
    partNumber: Yup.string().required(),
});

function ChangePartModal({
    open,
    row,
    partName,
    onClose,
    onDone,
}: {
    row: any;
    partName: string;
    open: boolean;
    onClose: () => void;
    onDone: (data: any) => void;
}) {
    const handleSubmit = (d: any) => {
        const res = { row, data: [{ ...d, name: partName }] };
        onDone(res);
    };

    return (
        <Dialog open={open} onClose={onClose} title="Add part">
            <Formik
                initialValues={
                    {
                        partNumber: row && row[partName] ? row[partName] : "",
                        usage: row && row.usages && row.usages[partName],
                    } as IPart
                }
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange, handleBlur }) => (
                    <Form>
                        <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                            <TextField disabled label="name" value={partName} />
                            <FieldSelect
                                request={getItems}
                                getOptionList={(list) => list.items}
                                itemTitleField="name"
                                itemValueField="no"
                                name="partNumber"
                                placeholder="partNumber"
                                label="Part number"
                                value={values.partNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.partNumber)}
                            />
                            <TextField
                                type="number"
                                name="usage"
                                placeholder="usage"
                                label="usage"
                                value={values.usage}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.usage)}
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

export default ChangePartModal;
