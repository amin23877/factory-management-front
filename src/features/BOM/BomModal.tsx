import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { Form, Formik } from "formik";
import { mutate } from "swr";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";

import { addBom, updateBom, IBom } from "api/bom";
import { IItem } from "api/items";
import { getModifiedValues } from "logic/utils";
import Confirm from "common/Confirm";

export default function BOMModal({
  open,
  onClose,
  item,
  setRefresh,
  initialValues,
}: {
  item: IItem;
  open: boolean;
  onClose: () => void;
  setRefresh: (a: any) => void;
  initialValues?: IBom;
}) {
  const handleSubmit = async (data: any) => {
    try {
      if (!initialValues) {
        await addBom({ ...data, ItemId: item.id });
        setRefresh((prev: any) => prev + 1);
        onClose();
      } else {
        await updateBom(initialValues.id, getModifiedValues(data, initialValues));
        setRefresh((prev: any) => prev + 1);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title={initialValues ? "Edit BOM" : "Add New BOM"} maxWidth="xs" fullWidth>
      <Box>
        <Formik initialValues={initialValues || ({ name: item.no } as IBom)} onSubmit={handleSubmit}>
          {({ getFieldProps, values }) => (
            <Form>
              <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
                <TextField label="Name" {...getFieldProps("name")} />
                <TextField label="Notes" {...getFieldProps("notes")} />
                <FormControlLabel
                  control={<Checkbox checked={values.current} />}
                  label="Current"
                  {...getFieldProps("current")}
                />
                <Button kind={initialValues?.id ? "edit" : "add"} type="submit">
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
