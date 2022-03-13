import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useSWR, { mutate } from "swr";

import Button from "app/Button";
import TextField from "app/TextField";
import Dialog from "app/Dialog";

import { ArraySelect } from "app/Inputs";
import { updateAnItem } from "api/items";

const schema = Yup.object().shape({
  type: Yup.string().required(),
  class: Yup.string().required(),
});

export default function AddServiceModal({
  open,
  onClose,
  onDone,
  device,
  initialValues,
}: {
  open: boolean;
  onClose: () => void;
  onDone: () => void;
  device: any;
  initialValues?: any;
}) {
  const { data } = useSWR("/constants");

  const handleSubmit = async (data: any) => {
    try {
      if (initialValues) {
      } else {
        console.log(data);
        const newServices = [...data.serviceClasses, data];
        await updateAnItem(device.id, { serviceClasses: newServices });

        onDone();
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      mutate(`/item/${device.id}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Add Service" fullWidth maxWidth="sm">
      <Box p={2}>
        <Formik initialValues={{} as any} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                <ArraySelect
                  label="Type"
                  name="type"
                  value={values.type}
                  items={data?.serviceTypes || []}
                  onChange={(e) => setFieldValue("type", e.target.value)}
                />
                <TextField
                  label="Class"
                  name="class"
                  value={values.class}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* <FieldSelect
                  request={getServiceCategories}
                  itemTitleField="name"
                  itemValueField="id"
                  label="Category"
                  name="ServiceCategoryId"
                  value={
                    typeof values.ServiceCategoryId == "string"
                      ? values.ServiceCategoryId
                      : values.ServiceCategoryId?.id
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.ServiceCategoryId)}
                  fullWidth
                /> */}
                {/* <FieldSelect
                  request={getServiceClasses}
                  itemTitleField="name"
                  itemValueField="id"
                  label="Class"
                  name="ServiceClassId"
                  value={typeof values.ServiceClassId == "string" ? values.ServiceClassId : values.ServiceClassId?.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.ServiceClassId)}
                  fullWidth
                /> */}
                <Button style={{ margin: "0.5em 0" }} type="submit" kind="add">
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
