import React from "react";
import { Box, IconButton, InputBase } from "@material-ui/core";
import SendRounded from "@material-ui/icons/SendRounded";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { colors } from "./Drawer";

const schema = Yup.object().shape({
    content: Yup.string().required(),
});

export default function ChatForm({ onPrivateMessage }: { onPrivateMessage: (content: string) => void }) {
    return (
        <Box style={{ backgroundColor: "#f9fafc" }} p="7px">
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
                        <Box
                            borderRadius={25}
                            style={{ background: colors.main, color: colors.textColor, border: "2px solid #eaedf1" }}
                            display="flex"
                            alignItems="center"
                        >
                            <InputBase
                                style={{
                                    paddingLeft: 10,
                                    flexGrow: 1,
                                    marginRight: 10,
                                }}
                                inputProps={{
                                    style: {
                                        color: colors.textColor,
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
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
