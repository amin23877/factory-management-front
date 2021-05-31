import { Formik } from "formik";
import React from "react";
import { mutate } from "swr";
import { createJob, IJob, schema } from "../../api/job";

import Dialog from "../../app/Dialog";
import JobForm from "./Forms";

export default function JobModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const handleSubmit = async (d: any) => {
        // console.log(selectedJob.id, d);
        try {
            const resp = await createJob(d);
            if (resp) {
                mutate("/job");
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title="Job details">
            <Formik initialValues={{} as IJob} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
                    <JobForm
                        errors={errors}
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                    />
                )}
            </Formik>
        </Dialog>
    );
}
