import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "../../../app/Dialog";
import { FieldSelect } from "../../../app/Inputs";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { fetcher } from "../../../api";

interface IData {
    cluster: string;
    level: string;
    partnumbers: number;
}

function BOMModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: (data: IData) => void }) {
    return (
        <Dialog open={open} onClose={onClose} title="Select Cluster, Levels and Parts">
            <Formik onSubmit={(data) => onDone(data)} initialValues={{} as IData}>
                {({ values, errors, handleChange, handleBlur }) => (
                    <Form>
                        <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                            <FieldSelect
                                name="cluster"
                                label="Cluster"
                                request={() => fetcher("/filter")}
                                itemTitleField="name"
                                itemValueField="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FieldSelect
                                name="level"
                                label="Level"
                                request={() => fetcher("/field")}
                                itemTitleField="name"
                                itemValueField="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                name="partnumbers"
                                label="Number of parts"
                                type="number"
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
