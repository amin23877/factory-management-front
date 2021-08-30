import React, { useState, useRef } from "react";
import { Box, IconButton, InputBase, Paper, Typography } from "@material-ui/core";
import SendRounded from "@material-ui/icons/SendRounded";
import { AttachFileRounded, CloseRounded } from "@material-ui/icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { colors } from "./Drawer";

const schema = Yup.object().shape({
    content: Yup.string().required(),
});

export default function ChatForm({ onPrivateMessage }: { onPrivateMessage: (content: string, file?: any) => void }) {
    const fileUploader = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<any>();

    return (
        <Box style={{ backgroundColor: "#f9fafc" }} p="7px">
            {file && (
                <Paper style={{ marginBottom: 5 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography style={{ marginLeft: 8 }}>"{String(file.name)}" attached</Typography>
                        <IconButton onClick={() => setFile(undefined)}>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                </Paper>
            )}
            <Formik
                initialValues={{ content: "" }}
                validationSchema={schema}
                onSubmit={(d, { resetForm }) => {
                    onPrivateMessage(d.content, file);
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
                            <div>
                                <input
                                    hidden
                                    type="file"
                                    name="file"
                                    onChange={(e) => e.target.files && setFile(e.target.files[0])}
                                    ref={(e) => (fileUploader.current = e)}
                                />
                                <IconButton onClick={() => (fileUploader.current ? fileUploader.current.click() : {})}>
                                    <AttachFileRounded htmlColor={colors.light} />
                                </IconButton>
                            </div>
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
