import React from "react";
import { Form, Formik } from "formik";
import SendRounded from "@material-ui/icons/SendRounded";
import { Box, IconButton } from "@material-ui/core";

import TextField from "../../app/TextField";
import Button from "../../app/Button";

export default function ChatForm() {
    return (
        <div>
            <Formik initialValues={{ text: "" }} onSubmit={(d) => console.log(d)}>
                {({ getFieldProps }) => (
                    <Form>
                        <Box display="flex" alignItems="center">
                            <TextField
                                style={{ flexGrow: 1, marginRight: 10 }}
                                {...getFieldProps("text")}
                                placeholder="Text..."
                            />
                            <IconButton color="primary">
                                <SendRounded />
                            </IconButton>
                        </Box>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
