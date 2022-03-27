import { Formik } from "formik";
import React from "react";
import { mutate } from "swr";
import { createTicket, ITicket, schema } from "../../../api/ticket";

import Dialog from "../../../app/Dialog";
import TicketForm from "./Forms";

export default function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const handleSubmit = async (d: any) => {
    // console.log(d);
    try {
      const resp = await createTicket(d);
      if (resp) {
        mutate("/job");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Add ticket">
      <Formik initialValues={{} as ITicket} validationSchema={schema} onSubmit={handleSubmit}>
        {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
          <TicketForm
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
