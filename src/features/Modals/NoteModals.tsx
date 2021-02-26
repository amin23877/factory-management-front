import React from "react";
import { Box, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";

import { createAModelNote, updateAModelNote, deleteAModelNote, INote } from "../../api/note";

const AddModelNoteSchema = Yup.object().shape({
    subject: Yup.string().min(1, "Too short!").required(),
    note: Yup.string().required(),
});

interface INoteModal {
    open: boolean;
    onClose: () => void;
    model: string;
    itemId: number;
    noteData?: INote;
    onDone?: () => void;
}

export default function NoteModal({ open, onClose, model, itemId, noteData, onDone }: INoteModal) {
    return (
        <Dialog open={open} onClose={onClose} title={`${noteData?.id ? "Edit" : "Add"} a note to ${model}`}>
            <Box m={3}>
                <Formik
                    initialValues={{ subject: noteData?.subject || "", url: noteData?.url || "", note: noteData?.note || "" }}
                    validationSchema={AddModelNoteSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (noteData && noteData?.id) {
                            updateAModelNote(noteData?.id, values)
                                .then((d) => {
                                    console.log(d);
                                    onClose();
                                    onDone && onDone();
                                })
                                .catch((e) => console.log(e))
                                .finally(() => setSubmitting(false));
                        } else {
                            // console.log(values);
                            createAModelNote(model, itemId, values)
                                .then((d) => {
                                    console.log(d);
                                    onDone && onDone();
                                    onClose();
                                })
                                .catch((e) => console.log(e))
                                .finally(() => setSubmitting(false));
                        }
                    }}
                >
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <TextField
                                name="subject"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.subject && touched.subject)}
                                helperText={errors.subject && touched.subject}
                                value={values.subject}
                                label="subject"
                                fullWidth
                            />
                            <TextField
                                name="url"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.url}
                                error={Boolean(errors.url && touched.url)}
                                helperText={errors.url && touched.url}
                                label="url"
                                fullWidth
                            />
                            <TextField
                                name="note"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.note}
                                error={Boolean(errors.note && touched.note)}
                                helperText={errors.note && touched.note}
                                label="note"
                                fullWidth
                                multiline
                                rows={4}
                            />
                            <Box my={2} textAlign="center">
                                <Button type="submit" disabled={isSubmitting} kind={noteData ? "edit" : "add"}>
                                    Save Note
                                </Button>
                                {noteData?.subject && (
                                    <Button
                                        kind="delete"
                                        style={{ margin: "0 1em" }}
                                        onClick={() => {
                                            if (noteData.id) {
                                                deleteAModelNote(noteData?.id)
                                                    .then((d) => console.log(d))
                                                    .catch((e) => console.log(e))
                                                    .finally(() => {
                                                        onDone && onDone();
                                                        onClose();
                                                    });
                                            }
                                        }}
                                    >
                                        Delete this note
                                    </Button>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
