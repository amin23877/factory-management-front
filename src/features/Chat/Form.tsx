import React from "react";
import { Form, Formik } from "formik";
import SendRounded from "@material-ui/icons/SendRounded";
import { Box, IconButton, Paper } from "@material-ui/core";

import TextField from "../../app/TextField";

export default function ChatForm() {
    return (
        <div>
            <Formik initialValues={{ text: "" }} onSubmit={(d) => console.log(d)}>
                {({ getFieldProps }) => (
                    <Form>
                        <Paper>
                            <Box p={2} display="flex" alignItems="center">
                                <TextField
                                    style={{ flexGrow: 1, marginRight: 10 }}
                                    {...getFieldProps("text")}
                                    placeholder="Text..."
                                />
                                <IconButton color="primary">
                                    <SendRounded />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
