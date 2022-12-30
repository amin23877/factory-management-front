import React from "react";
import { Dialog, Box, TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { useFormik } from "formik";

import Button from "app/Button";
import { ArraySelect } from "app/Inputs";
import { IPhone } from "api/phone";
import { updateAModelContact } from "api/contact";
import { mutate } from "swr";
// import DeleteButton from "common/DeleteButton";

export default function PhoneModal({
  list,
  contactId,
  phone,
  open,
  onClose,
}: {
  contactId: string;
  list: IPhone[];
  phone?: IPhone;
  open: boolean;
  onClose: () => void;
}) {
  const { values, errors, touched, getFieldProps, handleChange, isValid, isSubmitting, setSubmitting, handleSubmit } =
    useFormik({
      initialValues: {
        phoneType: phone?.phoneType || "mobile",
        phone: phone?.phone || "",
        ext: phone?.ext || "",
        main: phone?.main || false,
      },
      enableReinitialize: true,
      async onSubmit(data, { setSubmitting, resetForm }) {
        try {
          setSubmitting(true);
          let temp = list.concat();

          if (data.main) {
            temp = temp.map((p) => ({ ...p, main: false }));
          }

          if (phone?._id) {
            const index = list.findIndex((p) => p._id === phone._id);
            if (index !== -1) {
              temp[index] = data;
            }

            await updateAModelContact(contactId, { phones: temp });
            mutate(`/contact/${contactId}`);
          } else {
            await updateAModelContact(contactId, { phones: temp.concat([data]) });
            mutate(`/contact/${contactId}`);
          }

          resetForm({ values: { phoneType: "mobile", phone: "", ext: "", main: false } });
          onClose();
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      },
    });

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      if (!phone?._id) {
        throw new Error("Please select a phone");
      }
      const temp = list.concat();
      const index = list.findIndex((p) => p._id === phone._id);
      if (index !== -1) {
        temp.splice(index, 1);
      }

      await updateAModelContact(contactId, { phones: temp });
      mutate(`/contact/${contactId}`);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth title="Add Phone To A Contact">
      <form onSubmit={handleSubmit}>
        <Box display={"grid"} gridTemplateColumns="1fr" style={{ gap: "10px" }} p={2}>
          <ArraySelect items={["mobile", "landline"]} label="Phone Type" {...getFieldProps("phoneType")} />
          <TextField
            label="Phone"
            {...getFieldProps("phone")}
            error={Boolean(errors.phone && touched.phone)}
            helperText={errors.phone && touched.phone}
          />
          {values.phoneType === "landline" && (
            <TextField
              label="EXT"
              {...getFieldProps("ext")}
              error={Boolean(errors.ext && touched.ext)}
              helperText={errors.ext && touched.ext}
            />
          )}
          <FormControlLabel
            name="main"
            checked={values.main}
            onChange={handleChange}
            label="Main"
            control={<Checkbox />}
          />
          {!phone && (
            <Button kind={"add"} style={{ marginLeft: "5px" }} type="submit" disabled={!isValid || isSubmitting}>
              Add Phone
            </Button>
          )}
          {phone && (
            <Box display={"flex"} mt={1} justifyContent="space-around" gridGap={2}>
              <Button kind={"edit"} type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
              <Button kind="delete" disabled={!isValid || isSubmitting} onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </Dialog>
  );
}
