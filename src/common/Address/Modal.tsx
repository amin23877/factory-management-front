import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "app/TextField";
import Dialog from "app/Dialog";
import Button from "app/Button";

import { createAModelAddress, deleteAModelAddress, updateAModelAddress, IAddress } from "api/address";
import { mutate } from "swr";

const schema = Yup.object().shape({
  //   AddressTypeId: Yup.number().required().notOneOf([0]),
});

type addressModalProps = {
  open: boolean;
  onClose: () => void;
  model: string;
  itemId: string;
  data?: IAddress;
  onDone?: () => void;
};

export default function AddressModal({ open, onClose, model, itemId, data, onDone }: addressModalProps) {
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    if (data?.id) {
      updateAModelAddress(data?.id, values)
        .then((d) => {
          onDone && onDone();
          setSubmitting(false);
          onClose();
          mutate(`/address/${model}/${itemId}`);
        })
        .catch((e) => console.log(e));
    } else {
      createAModelAddress(model, itemId, values)
        .then((d) => {
          onDone && onDone();
          setSubmitting(false);
          onClose();
          mutate(`/address/${model}/${itemId}`);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleDelete = () => {
    if (data?.id) {
      deleteAModelAddress(data.id)
        .then((d) => {
          onClose();
          onDone && onDone();
          mutate(`/address/${model}/${itemId}`);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title={`${data?.id ? "Edit" : "Add"} an Address to ${model}`}>
      <Box m={3}>
        <Formik initialValues={data?.id ? data : ({} as IAddress)} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={8} gridColumnGap={8}>
                <TextField
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.address && touched.address)}
                  helperText={errors.address && touched.address}
                  value={values.address}
                  label="address"
                />
                <TextField
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.city && touched.city)}
                  helperText={errors.city && touched.city}
                  value={values.city}
                  label="city"
                />
                <TextField
                  name="state"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.state && touched.state)}
                  helperText={errors.state && touched.state}
                  value={values.state}
                  label="state"
                />
                <TextField
                  name="zip"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.zip && touched.zip)}
                  helperText={errors.zip && touched.zip}
                  value={values.zip}
                  label="zip"
                />
                <TextField
                  name="country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.country && touched.country)}
                  helperText={errors.country && touched.country}
                  value={values.country}
                  label="country"
                />
                {/* <FormControl fullWidth style={{ gridColumnEnd: "span 2" }}>
                  <FormLabel>Main</FormLabel>
                  <RadioGroup row name="main" value={values.main} onChange={handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl> */}
                <Button type="submit" disabled={isSubmitting} kind={data ? "edit" : "add"}>
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
}
