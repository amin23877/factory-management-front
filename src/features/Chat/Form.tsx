import React from "react";
import { Box, IconButton, Paper } from "@material-ui/core";
import SendRounded from "@material-ui/icons/SendRounded";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import { colors } from "./Modal";

const schema = Yup.object().shape({
    content: Yup.string().required(),
});

export default function ChatForm({ onPrivateMessage }: { onPrivateMessage: (content: string) => void }) {
    return (
        <Box>
            <Formik
                initialValues={{ content: "" }}
                validationSchema={schema}
                onSubmit={(d, { resetForm }) => {
                    onPrivateMessage(d.content);
                    resetForm();
                }}
            >
                {({ getFieldProps, errors, touched }) => (
                    <Form>
                        <Paper style={{ background: colors.secondary, color: "white" }}>
                            <Box p={2} display="flex" alignItems="center">
                                <TextField
                                    style={{
                                        flexGrow: 1,
                                        marginRight: 10,
                                    }}
                                    inputProps={{
                                        style: {
                                            color: "#ddd",
                                        },
                                    }}
                                    {...getFieldProps("content")}
                                    error={Boolean(errors.content && touched.content)}
                                    placeholder="Text..."
                                />
                                <IconButton type="submit">
                                    <SendRounded htmlColor={colors.light} />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
