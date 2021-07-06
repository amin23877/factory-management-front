import React, { useCallback, useRef } from "react";
import { Box, TextField, Link } from "@material-ui/core";
import { Formik, Form } from "formik";

import Button from "../../app/Button";

import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import {
    createAManStep,
    createAEvalStep,
    createAFieldStep,
    createATestStep,
    updateAEvalStep,
    updateAFieldStep,
    updateAManStep,
    updateATestStep,
    deleteAEvalStep,
    deleteAFieldStep,
    deleteAManStep,
    deleteATestStep,
} from '../../api/steps'

interface IStepModal {
    open: boolean;
    itemId: string;
    step?: any;
    onDone?: () => void;
    onClose: () => void;
}

export const Manufacturing = ({ open, onClose, itemId, onDone, step }: IStepModal) => {


    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (step && step.id) {
                await deleteAManStep(step.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (step && step.id) {
            updateAManStep(step.id, values.name, values.file, values.description, values.number, values.hours)
                .then((d) => {
                    console.log(d);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAManStep(itemId, values.name, values.file, values.description, values.number, values.hours)
                .then((d) => {
                    console.log(d);
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);




    return (
        <Formik initialValues={step ? step : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                        <TextField
                            style={{ gridColumnEnd: 'span 2' }}
                            value={values.name}
                            name="name"
                            label="Name"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            style={{ gridColumnEnd: 'span 2' }}
                            fullWidth
                            value={values.description}
                            name="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />


                        <TextField
                            fullWidth
                            style={{ marginBottom: "10px" }}
                            value={values.number}
                            name="number"
                            label="Step Number"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <TextField
                            fullWidth
                            value={values.hours}
                            name="hours"
                            label="Hours"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <Box style={{ gridColumnEnd: 'span 2', margin: '0px 25%' }}>

                            <input
                                multiple
                                type="file"
                                ref={(e) => (fileUploader.current = e)}
                                hidden
                                onChange={(e) =>
                                    e.target.files !== null && setFieldValue("file", e.target.files)
                                }
                            />
                            <Button
                                color="primary"
                                style={{
                                    backgroundColor: "#fff",
                                    color: " rgb(43,140,255) ",
                                    border: "1px solid rgb(43,140,255) ",
                                    width: "100%",
                                }}
                                variant="contained"
                                onClick={() => fileUploader.current?.click()}
                            >
                                <PhotoSizeSelectActualOutlinedIcon style={{ marginRight: "7px" }} />
                                illustration files
                            </Button>

                            <div style={{ margin: "1em 0" }}>
                                {values.file ? (
                                    // String((values.file as any).name)
                                    <p>ads</p>
                                ) : step ? (
                                    <Link download href={step.path}>
                                        Download previous file
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </div>



                        </Box>
                    </Box>
                    <Box style={{ display: "flex", width: "50%", margin: '0px 25%' }}>
                        <Button
                            type="submit"
                            kind={step ? "edit" : "add"}
                            disabled={isSubmitting}
                            style={{ flex: 1 }}
                        >
                            Save
                        </Button>
                        {step && (
                            <Button
                                style={{ marginLeft: "1em" }}
                                onClick={deleteDocument}
                                kind="delete"
                                disabled={isSubmitting}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </Form>
            )
            }
        </Formik >
    )
}





export const Evaluation = ({ open, onClose, itemId, onDone, step }: IStepModal) => {


    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (step && step.id) {
                await deleteAEvalStep(step.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (step && step.id) {
            updateAEvalStep(step.id, values.name, values.file, values.description, values.number, values.hours)
                .then((d) => {
                    console.log(d);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAEvalStep(itemId, values.name, values.file, values.description, values.number, values.hours)
                .then((d) => {
                    console.log(d);
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);





    return (
        <Formik initialValues={step ? step : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                        <TextField
                            style={{ gridColumnEnd: 'span 2' }}
                            value={values.name}
                            name="name"
                            label="Name"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            style={{ gridColumnEnd: 'span 2' }}
                            fullWidth
                            value={values.description}
                            name="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />


                        <TextField
                            fullWidth
                            style={{ marginBottom: "10px" }}
                            value={values.number}
                            name="number"
                            label="Step Number"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <TextField
                            fullWidth
                            value={values.hours}
                            name="hours"
                            label="Hours"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <Box style={{ gridColumnEnd: 'span 2', margin: '0px 25%' }}>

                            <input
                                multiple
                                type="file"
                                ref={(e) => (fileUploader.current = e)}
                                hidden
                                onChange={(e) =>
                                    e.target.files !== null && setFieldValue("file", e.target.files[0])
                                }
                            />
                            <Button
                                color="primary"
                                style={{
                                    backgroundColor: "#fff",
                                    color: " rgb(43,140,255) ",
                                    border: "1px solid rgb(43,140,255) ",
                                    width: "100%",
                                }}
                                variant="contained"
                                onClick={() => fileUploader.current?.click()}
                            >
                                <PhotoSizeSelectActualOutlinedIcon style={{ marginRight: "7px" }} />
                                illustration files
                            </Button>

                            <div style={{ margin: "1em 0" }}>
                                {values.file ? (
                                    // String((values.file as any).name)
                                    <p>ads</p>
                                ) : step ? (
                                    <Link download href={step.path}>
                                        Download previous file
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </div>



                        </Box>
                    </Box>
                    <Box style={{ display: "flex", width: "50%", margin: '0px 25%' }}>
                        <Button
                            type="submit"
                            kind={step ? "edit" : "add"}
                            disabled={isSubmitting}
                            style={{ flex: 1 }}
                        >
                            Save
                        </Button>
                        {step && (
                            <Button
                                style={{ marginLeft: "1em" }}
                                onClick={deleteDocument}
                                kind="delete"
                                disabled={isSubmitting}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </Form>
            )
            }
        </Formik >
    )
}





export const Test = ({ open, onClose, itemId, onDone, step }: IStepModal) => {


    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (step && step.id) {
                await deleteATestStep(step.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (step && step.id) {
            updateATestStep(step.id, values.name, values.file, values.description, values.number, values.hours)
                .then((d) => {
                    console.log(d);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createATestStep(itemId, values.name, values.file, values.description, values.number, values.hours)
                .then((d) => {
                    console.log(d);
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);




    return (
        <Formik initialValues={step ? step : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                        <TextField
                            style={{ gridColumnEnd: 'span 2' }}
                            value={values.name}
                            name="name"
                            label="Name"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            style={{ gridColumnEnd: 'span 2' }}
                            fullWidth
                            value={values.description}
                            name="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />


                        <TextField
                            fullWidth
                            style={{ marginBottom: "10px" }}
                            value={values.number}
                            name="number"
                            label="Step Number"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <TextField
                            fullWidth
                            value={values.hours}
                            name="hours"
                            label="Hours"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <Box style={{ gridColumnEnd: 'span 2', margin: '0px 25%' }}>

                            <input
                                multiple
                                type="file"
                                ref={(e) => (fileUploader.current = e)}
                                hidden
                                onChange={(e) =>
                                    e.target.files !== null && setFieldValue("file", e.target.files[0])
                                }
                            />
                            <Button
                                color="primary"
                                style={{
                                    backgroundColor: "#fff",
                                    color: " rgb(43,140,255) ",
                                    border: "1px solid rgb(43,140,255) ",
                                    width: "100%",
                                }}
                                variant="contained"
                                onClick={() => fileUploader.current?.click()}
                            >
                                <PhotoSizeSelectActualOutlinedIcon style={{ marginRight: "7px" }} />
                                illustration files
                            </Button>

                            <div style={{ margin: "1em 0" }}>
                                {values.file ? (
                                    // String((values.file as any).name)
                                    <p>ads</p>
                                ) : step ? (
                                    <Link download href={step.path}>
                                        Download previous file
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </div>



                        </Box>
                    </Box>
                    <Box style={{ display: "flex", width: "50%", margin: '0px 25%' }}>
                        <Button
                            type="submit"
                            kind={step ? "edit" : "add"}
                            disabled={isSubmitting}
                            style={{ flex: 1 }}
                        >
                            Save
                        </Button>
                        {step && (
                            <Button
                                style={{ marginLeft: "1em" }}
                                onClick={deleteDocument}
                                kind="delete"
                                disabled={isSubmitting}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </Form>
            )}
        </Formik>
    )
}


export const Field = ({ open, onClose, itemId, onDone, step }: IStepModal) => {


    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (step && step.id) {
                await deleteAFieldStep(step.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (step && step.id) {
            updateAFieldStep(step.id, values.name, values.file, values.description, values.number, values.hours)
                .then((d) => {
                    console.log(d);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAFieldStep(itemId, values.name, values.file, values.description, values.number, values.hours)
                .then((d) => {
                    console.log(d);
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);




    return (
        <Formik initialValues={step ? step : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form style={{ marginBottom: '20px' }}>
                    <h3 style={{ marginLeft: '20px' }}>Field StartUp</h3>
                    <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                        <TextField
                            style={{ gridColumnEnd: 'span 2' }}
                            value={values.name}
                            name="name"
                            label="Name"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            style={{ gridColumnEnd: 'span 2' }}
                            fullWidth
                            value={values.description}
                            name="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />


                        <TextField
                            fullWidth
                            style={{ marginBottom: "10px" }}
                            value={values.number}
                            name="number"
                            label="Step Number"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <TextField
                            fullWidth
                            value={values.hours}
                            name="hours"
                            label="Hours"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <Box style={{ gridColumnEnd: 'span 2', margin: '0px 25%' }}>

                            <input
                                multiple
                                type="file"
                                ref={(e) => (fileUploader.current = e)}
                                hidden
                                onChange={(e) =>
                                    e.target.files !== null && setFieldValue("file", e.target.files[0])
                                }
                            />
                            <Button
                                color="primary"
                                style={{
                                    backgroundColor: "#fff",
                                    color: " rgb(43,140,255) ",
                                    border: "1px solid rgb(43,140,255) ",
                                    width: "100%",
                                }}
                                variant="contained"
                                onClick={() => fileUploader.current?.click()}
                            >
                                <PhotoSizeSelectActualOutlinedIcon style={{ marginRight: "7px" }} />
                                illustration files
                            </Button>

                            <div style={{ margin: "1em 0" }}>
                                {values.file ? (
                                    // String((values.file as any).name)
                                    <p>ads</p>
                                ) : step ? (
                                    <Link download href={step.path}>
                                        Download previous file
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </div>



                        </Box>
                    </Box>
                    <Box style={{ display: "flex", width: "50%", margin: '0px 25%' }}>
                        <Button
                            type="submit"
                            kind={step ? "edit" : "add"}
                            disabled={isSubmitting}
                            style={{ flex: 1 }}
                        >
                            Save
                        </Button>
                        {step && (
                            <Button
                                style={{ marginLeft: "1em" }}
                                onClick={deleteDocument}
                                kind="delete"
                                disabled={isSubmitting}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </Form>
            )
            }
        </Formik >
    )
}