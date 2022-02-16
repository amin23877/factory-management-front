import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";

import { addBom, IBom } from "api/bom";
import { mutate } from "swr";
import { IItem } from "api/items";

export default function BOMModal({
  open,
  onClose,
  item,
  initialValues,
}: {
  item: IItem;
  open: boolean;
  onClose: () => void;
  initialValues?: IBom;
}) {
  const handleSubmit = async (data: any) => {
    try {
      if (!initialValues) {
        await addBom({ ...data, ItemId: item.id });
        mutate(`/bom?ItemId=${item.id}`);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="BOM" maxWidth="xs" fullWidth>
      <Box>
        <Formik initialValues={initialValues || ({ name: item.no } as IBom)} onSubmit={handleSubmit}>
          {({ getFieldProps }) => (
            <Form>
              <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
                <TextField label="NO" {...getFieldProps("no")} />
                <TextField label="Name" {...getFieldProps("name")} />
                <TextField label="Notes" {...getFieldProps("notes")} />
                <FormControlLabel control={<Checkbox />} label="Current" {...getFieldProps("current")} />
                <Button kind="add" type="submit">
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
