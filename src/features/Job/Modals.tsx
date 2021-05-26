import { Formik } from "formik";
import React from "react";
import { deleteJob, IJob, schema, updateJob } from "../../api/job";

import Dialog from "../../app/Dialog";
import { JobDetails } from "./Forms";

export default function JobModal({
    open,
    onClose,
    onDone,
    selectedJob,
    services,
    setSelectedSO,
}: {
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    selectedJob: IJob;
    services: any;
    setSelectedSO: (a: any) => void;
}) {
    const handleSubmit = async (d: any) => {
        // console.log(selectedJob.id, d);
        try {
            const resp = await updateJob(selectedJob.id, d);
            if (resp) {
                onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const resp = await deleteJob(selectedJob.id);
            if (resp) {
                onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title="Job details">
            <Formik initialValues={selectedJob ? selectedJob : ({} as IJob)} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
                    <JobDetails
                        errors={errors}
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleDelete={handleDelete}
                        setFieldValue={setFieldValue}
                        services={services}
                        setSelectedSO={setSelectedSO}
                    />
                )}
            </Formik>
        </Dialog>
    );
}
