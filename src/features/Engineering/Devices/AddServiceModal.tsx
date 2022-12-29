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

function validateService({ deviceServices, service }: { deviceServices: any[]; service: any }) {
  const stats = [...deviceServices, { type: service.type }].reduce((prev, cur) => {
    if (prev[cur.type]) {
      return { ...prev, [cur.type]: prev[cur.type] + 1 };
    }
    return { ...prev, [cur.type]: 1 };
  }, []);

  for (const type in stats) {
    if (stats[type] > 1) {
      return false;
    }
  }

  return true;
}

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
  const { data } = useSWR("/constants/serviceTypes");

  const handleSubmit = async (data: any) => {
    try {
      if (initialValues && initialValues.id) {
        const index = device?.serviceClassses?.findIndex(
          (sc: any) => sc.type === initialValues.type && sc.class === initialValues.class
        );

        if (index > -1) {
          const newServices = device.serviceClassses.concat();
          newServices[index] = data;
          await updateAnItem(device.id, { serviceClasses: newServices });

          onDone();
          onClose();
        }
      } else {
        if (validateService({ deviceServices: device.serviceClassses || [], service: data })) {
          const newServices = data?.serviceClasses?.concat() || [];
          newServices.push(data);
          await updateAnItem(device.id, { serviceClassses: newServices });

          onDone();
          onClose();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      mutate(`/item/${device.id}`);
    }
  };

  const handleDelete = async () => {
    try {
      const newServices = device?.serviceClassses?.filter(
        (sv: any) => sv.type !== initialValues.type && sv.class !== initialValues.class
      );
      await updateAnItem(device.id, { serviceClassses: newServices });

      onDone();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      mutate(`/item/${device.id}`);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={initialValues && initialValues.id ? "" : "Add Service"}
      fullWidth
      maxWidth="sm"
    >
      <Box p={2}>
        <Formik initialValues={initialValues || ({} as any)} validationSchema={schema} onSubmit={handleSubmit}>
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
                {initialValues && initialValues.id ? (
                  <>
                    <Button style={{ margin: "0.5em 0" }} type="submit" kind="edit">
                      Edit
                    </Button>
                    <Button style={{ margin: "0.5em 0" }} kind="delete" onClick={handleDelete}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button style={{ margin: "0.5em 0" }} type="submit" kind="add">
                    Save
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
