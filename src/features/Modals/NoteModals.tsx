import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import TextField from "../../app/TextField";

import { createAModelNote, updateAModelNote, deleteAModelNote, INote } from "../../api/note";
import { mutate } from "swr";

const AddModelNoteSchema = Yup.object().shape({
    subject: Yup.string().min(1, "Too short!").required(),
    note: Yup.string().required(),
});

interface INoteModal {
    open: boolean;
    onClose: () => void;
    model: string;
    itemId: any;
    noteData?: INote;
    onDone?: () => void;
}

const mutateNotes = (type: string, id: string) => {
    return mutate(`/note/${type}/${id}`);
};

export default function NoteModal({ open, onClose, model, itemId, noteData, onDone }: INoteModal) {
    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            if (noteData && noteData?.id) {
                await updateAModelNote(noteData?.id, values);

                onDone && onDone();
                mutateNotes(model, itemId);
                onClose();
            } else {
                await createAModelNote(model, itemId as any, values);

                onDone && onDone();
                mutateNotes(model, itemId);
                onClose();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            if (noteData && noteData.id) {
                await deleteAModelNote(noteData.id);

                onDone && onDone();
                mutateNotes(model, itemId);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title={`${noteData?.id ? "Edit" : "Add"} a note to ${model}`}>
            <Box m={3}>
                <Formik
                    initialValues={noteData ? noteData : ({} as INote)}
                    validationSchema={AddModelNoteSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
                                <TextField
                                    name="subject"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.subject && touched.subject)}
                                    helperText={errors.subject && touched.subject}
                                    value={values.subject}
                                    label="subject"
                                />
                                <TextField
                                    name="url"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.url}
                                    error={Boolean(errors.url && touched.url)}
                                    helperText={errors.url && touched.url}
                                    label="url"
                                />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    name="note"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.note}
                                    error={Boolean(errors.note && touched.note)}
                                    helperText={errors.note && touched.note}
                                    label="note"
                                    multiline
                                    rows={4}
                                />
                            </Box>
                            <Box my={2} textAlign="center" display="flex" alignItems="center">
                                <Button
                                    type="submit"
                                    style={{ flex: 1 }}
                                    disabled={isSubmitting}
                                    kind={noteData ? "edit" : "add"}
                                >
                                    Save
                                </Button>
                                {noteData && (
                                    <Button kind="delete" style={{ margin: "0 1em" }} onClick={handleDelete}>
                                        Delete
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
