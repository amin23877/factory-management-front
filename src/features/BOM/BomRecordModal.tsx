import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";

import { addBomRecord, IBom, IBomRecord, IBomRecordForm } from "api/bom";
import { mutate } from "swr";
import ItemComboBox from "common/ItemComboBox";

export default function BomRecordModal({
  open,
  bom,
  initialValues,
  onClose,
}: {
  bom: IBom;
  open: boolean;
  onClose: () => void;
  initialValues?: IBomRecord;
}) {
  const handleSubmit = async (data: any) => {
    try {
      if (!initialValues) {
        await addBomRecord({ ...data, BOMId: bom.id });
        mutate(`/bomrecord?BOMId=${bom.id}`);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="BOM" maxWidth="xs" fullWidth>
      <Box>
        <Formik
          initialValues={initialValues || ({ ItemId: "6209538cb62c6a399fcce6b8" } as IBomRecordForm)}
          onSubmit={handleSubmit}
        >
          {({ getFieldProps, setFieldValue, values }) => (
            <Form>
              <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
                <ItemComboBox onChange={(v) => setFieldValue("ItemId", v?.id)} value={values.ItemId as any} />
                <TextField label="Usage" {...getFieldProps("usage")} />
                <FormControlLabel control={<Checkbox />} label="Fixed Quantity" {...getFieldProps("fixedQty")} />
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
