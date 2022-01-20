import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { FieldSelect } from "../../../app/Inputs";
import { getItems } from "../../../api/items";

const schema = Yup.object().shape({
    ItemId: Yup.string().required(),
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
        for (const key in d) {
            if (!d[key]) {
                delete d[key];
            }
        }
        const prevCells = row.parts.map((p: any) => ({ ItemId: p.id, usage: p.usage }));
        const res = { device: row.DeviceId, cells: [...prevCells, d] };
        console.log(res);

        onDone(res);
    };

    return (
        <Dialog open={open} onClose={onClose} title="Add part">
            <Formik
                initialValues={{
                    ItemId: undefined,
                    usage: 1,
                    location: undefined,
                    uom: undefined,
                    // fixedQty: false,
                }}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange, handleBlur }) => (
                    <Form>
                        <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                            <TextField disabled label="name" value={partName} />
                            <FieldSelect
                                request={getItems}
                                getOptionList={(list) => list.result}
                                itemTitleField="name"
                                itemValueField="id"
                                name="ItemId"
                                placeholder="Part Number"
                                label="Part number"
                                value={values.ItemId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.ItemId)}
                            />
                            <TextField
                                type="number"
                                name="usage"
                                placeholder="usage"
                                label="Usage"
                                value={values.usage}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.usage)}
                            />
                            <TextField
                                name="location"
                                placeholder="Location"
                                label="Location"
                                value={values.location}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.location)}
                            />
                            <TextField
                                name="uom"
                                placeholder="Unit Of Measure"
                                label="Unit Of Measure"
                                value={values.uom}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.uom)}
                            />
                            {/* <FormControlLabel
                                style={{ margin: 0 }}
                                name="fixedQty"
                                placeholder="Fixed QTY"
                                label="Fixed QTY"
                                checked={values.fixedQty}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                control={<CheckBox />}
                            /> */}
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
