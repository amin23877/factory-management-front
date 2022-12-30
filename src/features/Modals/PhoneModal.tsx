import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { getPhoneTypes } from "../../api/phoneType";
import { createAModelPhone, deleteAModelPhone, updateAModelPhone, IPhone } from "../../api/phone";
import { mutate } from "swr";

const schema = Yup.object().shape({
  ext: Yup.string().required(),
  phone: Yup.string().required(),
  PhoneTypeId: Yup.number().required().notOneOf([0]),
});

export const PhoneModal = ({
  open,
  onClose,
  model,
  itemId,
  data,
  onDone,
}: {
  open: boolean;
  onClose: () => void;
  model: string;
  itemId: string;
  data?: IPhone;
  onDone?: () => void;
}) => {
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    if (data?.id) {
      updateAModelPhone(data?.id, values)
        .then((d: any) => {
          onDone && onDone();
          setSubmitting(false);
          onClose();
          mutate(`/phone/vendor/${itemId}`);
        })
        .catch((e) => console.log(e));
    } else {
      createAModelPhone(model, itemId, values)
        .then((d: any) => {
          onDone && onDone();
          setSubmitting(false);
          onClose();
          mutate(`/phone/vendor/${itemId}`);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleDelete = () => {
    if (data?.id) {
      deleteAModelPhone(data.id)
        .then(() => {
          onClose();
          onDone && onDone();
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title={`${data?.id ? "Edit" : "Add"} a Phone to ${model}`}>
      <Box m={3}>
        <Formik initialValues={data?.id ? data : ({} as IPhone)} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={8} gridColumnGap={8}>
                <TextField
                  name="ext"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.ext && touched.ext)}
                  helperText={errors.ext && touched.ext}
                  value={values.ext}
                  label="extension"
                  fullWidth
                />
                <TextField
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.phone && touched.phone)}
                  helperText={errors.phone && touched.phone}
                  value={values.phone}
                  label="phone"
                  fullWidth
                />

                {/* <FieldSelect
                                    style={{ gridColumnEnd: "span 2" }}
                                    request={getPhoneTypes}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    fullWidth
                                    name="PhoneTypeId"
                                    label="Phone Type"
                                    value={values.PhoneTypeId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.PhoneTypeId && touched.PhoneTypeId)}
                                /> */}

                <FormControlLabel
                  style={{ gridColumnEnd: "span 2" }}
                  name="main"
                  onChange={handleChange}
                  label="Main phone number"
                  control={<Checkbox />}
                />

                <Button type="submit" style={{ flex: 1 }} disabled={isSubmitting} kind={data ? "edit" : "add"}>
                  Save
                </Button>
                {data?.id && (
                  <Button kind="delete" onClick={handleDelete}>
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
};
